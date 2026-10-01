// Crow Room: a local web interface for Crow, built on the Claude Agent SDK.
// One long-lived Claude Code session runs in ~/crow-config, the same way the CLI does:
// same CLAUDE.md, same hooks (session start, clock stamp, stop), same output style,
// same memory folder. The browser is just a different window onto it.
//
//   node server.mjs            → http://localhost:4711
//   node server.mjs --resume   → continue the last session instead of starting fresh

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { query, getSessionMessages } from '@anthropic-ai/claude-agent-sdk';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');                       // ~/crow-config
const HOME = os.homedir();
const PORT = Number(process.env.CROW_PORT || 4711);
const MEMORY = path.join(HOME, '.claude/projects', REPO.replaceAll('/', '-'), 'memory');
const LAST_SESSION_FILE = path.join(HERE, '.last-session');
const MODEL_FILE = path.join(HERE, '.model');                 // the model picked in the Room, kept across restarts
const DEFAULT_MODE = process.env.CROW_PERMISSION_MODE || 'auto';   // override only for testing the Allow/Deny card

// The short list the Room offers. Values are what setModel() takes; the SDK
// resolves each to the current version (supportedModels() confirmed these on 27 Sep).
const MODELS = [
  { value: 'opus', label: 'Opus 5.5', note: 'default, best all-round' },
  { value: 'claude-fable-5-1', label: 'Fable 5.1', note: 'most capable, slowest' },
  { value: 'sonnet', label: 'Sonnet 5', note: 'faster, a step down' },
  { value: 'haiku', label: 'Haiku 4.5', note: 'fastest, for quick stuff' },
];

// Appended to the system prompt so Crow knows which window he's talking through,
// and says so when a task belongs in VS Code instead (Korn's ask, 27 Sep).
const ROOM_NOTE = `
# Where this conversation is happening
You are running inside the Crow Room: Korn's own browser interface (localhost:4711), built on the Claude Agent SDK. It is not VS Code and not the terminal.

In the Room, Korn calls ghost cards "tasks": "Task #N, my answer: …" means ghost deck line N (grade it, then bin/ghost.py pass|fail N), and "Give me a task" means serve the next due ghost card.
What the Room can do: Korn can attach images, PDFs and text files; he sees each tool call and can expand its output; he sees the before and after of every file edit; he can rewind file changes to an earlier message; he can switch plan mode and the model; he can @-mention files in the repo and in memory.

What the Room cannot do, and belongs in VS Code (or the terminal):
- anything that depends on the file he has open or the text he has selected in the editor
- a long multi-file code build where he'll want to review each diff side by side in the editor's diff view
- debugging with the IDE: its diagnostics, breakpoints, a terminal he's watching
- signing in to connectors (/mcp, OAuth for Canva, Microsoft 365 and the like) and interactive settings (/config, /login, /output-style, /fast)

Multiple-choice cards: AskUserQuestion is off in the Room. When you want Korn to pick from choices (an MCQ drill question, BA202-style exam practice, or any question you'd otherwise have put to AskUserQuestion), write a fenced block with the language "mcq" holding strict JSON:
\`\`\`mcq
{"q": "The question (markdown allowed)", "options": ["first", "second", "third", "fourth"], "multi": false}
\`\`\`
The Room turns it into a card: lettered options A, B, C… (do not put letters in the option text), tick boxes, a note box for his reasoning, and a "Lock it in" button. Set "multi": true only when more than one option can be right. Rules: one card per message, never batch; put the card last and never reveal or hint at the answer in that message. His answer arrives as a message starting "[MCQ]" with "My pick:" and maybe "My reasoning:". Grade it in the first line (right or wrong, then the right answer), then say why, and read his reasoning: a right pick with wrong reasoning is a miss worth naming. A miss becomes a ghost card that turn, as usual. MCQ trains recognition, and his gap is recall ([[feedback-drill-format]]), so use cards where the exam itself is MCQ (BA202) or for quick checks, and keep open questions for everything else.

Today's goals (the plum blossom): the flower on the board has one blossom per goal he lists for the day. When the session-start hook prints 🌸 GOALS, ask "goals today?" (max 7 of his own) and record them with python3 bin/goals.py set "<goal>" … (Wake early, Bed by 23:30 and a scheduled training session are added on their own). When he says a goal is done, run goals.py done <n> that turn (it waters the flower). He can also press Done on the board. Ask "Bed by 23:30" about the previous night at the next session. When he logs off for the day the stop hook runs goals.py close and the petals fall.

When what he's asking for is clearly better done in VS Code, open your reply with one line saying so and why ("This one's better in VS Code: ..."), then still do whatever part the Room can do. Don't flag small edits, study work, drills or conversation: those belong here. Say it once per task, not on every message.`;

// ---------------------------------------------------------------- session

// Streaming-input mode: the SDK pulls user messages from this async iterable,
// so one query() stays alive across the whole conversation.
class Inbox {
  #queue = [];
  #waiting = null;
  #closed = false;
  push(msg) {
    if (this.#waiting) { this.#waiting(msg); this.#waiting = null; }
    else this.#queue.push(msg);
  }
  close() { this.#closed = true; this.#waiting?.(null); }
  async *[Symbol.asyncIterator]() {
    while (!this.#closed) {
      const msg = this.#queue.length ? this.#queue.shift()
        : await new Promise(r => { this.#waiting = r; });
      if (msg === null) return;
      yield msg;
    }
  }
}

let session = null;          // { inbox, q, id, busy, interrupted, mode, tools }
const history = [];          // UI events, replayed to a reloaded tab
const pendingPermissions = new Map();
let permissionSeq = 0;
let todos = [];              // Crow's live task list, from TodoWrite / TaskCreate / TaskUpdate
let commands = [];           // slash commands that work in the Room

function emit(event) {
  // Text arrives in many small deltas; fold them into one history entry so a
  // long session doesn't push the start of the conversation out of the replay.
  const last = history[history.length - 1];
  if (event.type === 'text' && last?.type === 'text' && last.parent === event.parent) last.text += event.text;
  else history.push({ ...event });
  if (history.length > 4000) history.splice(0, history.length - 4000);
  broadcast(event);
}
function broadcast(event) {
  const data = JSON.stringify(event);
  for (const ws of wss.clients) if (ws.readyState === 1) ws.send(data);
}

function startSession({ resume } = {}) {
  if (session) { session.inbox.close(); session.q.close(); }
  history.length = 0;
  todos = [];
  for (const [, p] of pendingPermissions) p.resolve({ behavior: 'deny', message: 'Session restarted.' });
  pendingPermissions.clear();

  const inbox = new Inbox();
  const model = readSafe(MODEL_FILE).trim() || undefined;
  const q = query({
    prompt: inbox,
    options: {
      cwd: REPO,
      settingSources: ['user', 'project', 'local'],   // CLAUDE.md, hooks, output style, permissions
      systemPrompt: { type: 'preset', preset: 'claude_code', append: ROOM_NOTE },
      includePartialMessages: true,
      permissionMode: DEFAULT_MODE,
      enableFileCheckpointing: true,                  // what makes "rewind files to here" possible
      // The Room has no question picker, so Crow asks in plain text instead.
      disallowedTools: ['AskUserQuestion'],
      ...(model ? { model } : {}),
      ...(resume ? { resume } : {}),
      canUseTool: askInBrowser,
    },
  });
  const s = { inbox, q, id: resume || null, busy: false, interrupted: false, mode: DEFAULT_MODE, tools: new Map() };
  session = s;
  emit({ type: 'session', state: resume ? 'resumed' : 'new', id: resume || null });
  emit({ type: 'todos', todos });
  if (resume) loadTranscript(resume, s);

  // Warm the Claude Code process now, not on the first message, and learn
  // what it offers so the pickers start right.
  q.initializationResult().then(async () => {
    if (s !== session) return;
    emit(modelEvent(model || 'opus'));
    emit({ type: 'mode', value: s.mode });
    const list = await q.supportedCommands().catch(() => []);
    commands = list
      .filter(c => !TERMINAL_ONLY.has(c.name))
      .map(c => ({ name: c.name, description: c.description, hint: c.argumentHint || '' }))
      .sort((a, b) => a.name.localeCompare(b.name));
    broadcast({ type: 'commands', commands });
  }).catch(() => {});

  // However the loop ends (crash or a clean exit), if this is still the live
  // session the next message has to start a new process on the same conversation.
  pump(s).catch(err => err).then(err => {
    if (s !== session) return;
    emit({ type: 'error', text: `Crow's process stopped${err ? `: ${err.message || err}` : ''}. Your next message restarts it where you left off.` });
    session = null;
    lastDeadSession = s.id;
    emit({ type: 'busy', busy: false });
  });
}
let lastDeadSession = null;

// Commands that need the terminal's own UI. The init message names some of
// these; the rest are the ones the Room has its own control for or can't show.
const TERMINAL_ONLY = new Set(['exit', 'quit', 'statusline', 'terminal-setup', 'vim', 'theme', 'login', 'logout',
  'config', 'settings', 'output-style', 'fast', 'mcp', 'ide', 'doctor', 'keybindings', 'resume', 'model', 'permissions', 'help']);

// A resumed conversation should look like one: rebuild the Room's history from
// the saved transcript, then send every open tab a fresh replay.
async function loadTranscript(id, s) {
  const msgs = await getSessionMessages(id, { dir: REPO }).catch(() => []);
  if (s !== session || !msgs.length) return;
  const past = [];
  for (const m of msgs) {
    if (m.parent_tool_use_id) continue;
    const content = m.message?.content;
    if (m.type === 'user' && typeof content === 'string' && !content.trimStart().startsWith('<')) {
      past.push({ type: 'user', text: content, uuid: m.uuid, ts: m.timestamp ? Date.parse(m.timestamp) : undefined });
    } else if (m.type === 'user' && Array.isArray(content)) {
      const text = content.filter(b => b.type === 'text').map(b => b.text).join('\n');
      const files = content.filter(b => b.type === 'image' || b.type === 'document').map(b => ({ name: b.type === 'image' ? 'image' : 'document', kind: b.type }));
      if (text && !text.trimStart().startsWith('<')) past.push({ type: 'user', text, uuid: m.uuid, files });
      for (const b of content) if (b.type === 'tool_result') past.push(toolDone(b, null));
    } else if (m.type === 'assistant' && Array.isArray(content)) {
      for (const b of content) {
        if (b.type === 'text' && b.text.trim()) past.push({ type: 'text_start' }, { type: 'text', text: b.text });
        if (b.type === 'tool_use') past.push(toolEvent(b, null));
      }
    }
  }
  past.push({ type: 'result', ok: true });
  history.unshift(...past);
  broadcast(replayEvent());
}

function replayEvent() {
  return {
    type: 'replay', events: history, busy: !!session?.busy, board, todos, commands,
    mode: session?.mode || DEFAULT_MODE,
    model: modelEvent(readSafe(MODEL_FILE).trim() || 'opus'),
  };
}

function modelEvent(value) {
  return { type: 'model', value, models: MODELS };
}

async function setModel(value) {
  if (!MODELS.some(m => m.value === value)) return;
  fs.writeFileSync(MODEL_FILE, value);
  if (session) await session.q.setModel(value).catch(err => emit({ type: 'error', text: `Couldn't switch model: ${err.message}` }));
  emit(modelEvent(value));
}

async function setMode(value) {
  if (!session) return;
  value = value === 'plan' ? 'plan' : DEFAULT_MODE;          // the Room's two modes: plan first, or normal
  await session.q.setPermissionMode(value).catch(err => emit({ type: 'error', text: `Couldn't switch mode: ${err.message}` }));
  session.mode = value;
  emit({ type: 'mode', value });
}

// The permission prompt the terminal would show, shown in the browser instead.
function askInBrowser(toolName, input, { signal, suggestions }) {
  const id = String(++permissionSeq);
  return new Promise(resolve => {
    pendingPermissions.set(id, { resolve, suggestions, toolName });
    signal?.addEventListener('abort', () => {
      pendingPermissions.delete(id);
      resolve({ behavior: 'deny', message: 'Aborted.' });
    });
    emit({
      type: 'permission', id, tool: toolName,
      input: summarizeInput(toolName, input),
      plan: toolName === 'ExitPlanMode' && typeof input.plan === 'string' ? input.plan : null,
      canAlways: Array.isArray(suggestions) && suggestions.length > 0,
    });
  });
}

async function answerPermission({ id, allow, always }) {
  const p = pendingPermissions.get(id);
  if (!p) return;
  pendingPermissions.delete(id);
  if (!allow) p.resolve({ behavior: 'deny', message: p.toolName === 'ExitPlanMode' ? 'Korn wants to keep planning.' : 'Korn said no in the Crow Room.' });
  else p.resolve({ behavior: 'allow', ...(always && p.suggestions ? { updatedPermissions: p.suggestions } : {}) });
  emit({ type: 'permission_done', id, allow: !!allow, always: !!always });
  // Approving a plan means "go build it": leave plan mode like the CLI does.
  if (allow && p.toolName === 'ExitPlanMode' && session) {
    session.mode = DEFAULT_MODE;
    await session.q.setPermissionMode(DEFAULT_MODE).catch(() => {});
    emit({ type: 'mode', value: DEFAULT_MODE });
  }
}

function summarizeInput(tool, input = {}) {
  if (input.command) return String(input.command);
  if (input.file_path) return String(input.file_path);
  if (input.pattern) return `${input.pattern}${input.path ? `  in ${input.path}` : ''}`;
  if (input.url) return String(input.url);
  if (input.query) return String(input.query);
  if (input.skill) return String(input.skill);
  if (input.subject) return String(input.subject);
  if (input.description) return String(input.description);
  if (input.prompt) return String(input.prompt).slice(0, 200);
  const s = JSON.stringify(input);
  return s.length > 240 ? s.slice(0, 240) + '…' : s;
}

const clip = (s, n) => (s.length > n ? s.slice(0, n) + `\n… (${s.length - n} more characters)` : s);

function toolEvent(block, parent) {
  const ev = { type: 'tool', id: block.id, name: block.name, input: summarizeInput(block.name, block.input), parent };
  const i = block.input || {};
  if (block.name === 'Edit' && typeof i.old_string === 'string') ev.diff = { old: clip(i.old_string, 6000), new: clip(i.new_string ?? '', 6000) };
  if (block.name === 'Write' && typeof i.content === 'string') ev.diff = { old: null, new: clip(i.content, 6000) };
  if (block.name === 'MultiEdit' && Array.isArray(i.edits)) {
    ev.diff = { old: clip(i.edits.map(e => e.old_string).join('\n⋯\n'), 6000), new: clip(i.edits.map(e => e.new_string).join('\n⋯\n'), 6000) };
  }
  return ev;
}

function resultText(block) {
  const c = block.content;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.map(x => (x.type === 'text' ? x.text : x.type === 'image' ? '[image]' : '')).join('\n');
  return '';
}
function toolDone(block, parent) {
  return { type: 'tool_done', id: block.tool_use_id, error: !!block.is_error, output: clip(resultText(block), 8000), parent };
}

// Crow's task list, however this Claude Code version keeps it.
function trackTodos(block, s) {
  const i = block.input || {};
  if (block.name === 'TodoWrite' && Array.isArray(i.todos)) {
    todos = i.todos.map(t => ({ text: t.content, status: t.status }));
  } else if (block.name === 'TaskCreate') {
    s.tools.set(block.id, { kind: 'create', subject: i.subject });
    todos.push({ text: i.subject, status: 'pending' });
  } else if (block.name === 'TaskUpdate' && i.taskId) {
    const t = todos.find(t => t.taskId === String(i.taskId));
    if (t) {
      if (i.status === 'deleted') todos = todos.filter(x => x !== t);
      else { if (i.status) t.status = i.status; if (i.subject) t.text = i.subject; }
    }
  } else return;
  emit({ type: 'todos', todos });
}
function linkTaskId(block, s) {
  const pending = s.tools.get(block.tool_use_id);
  if (pending?.kind !== 'create') return;
  const n = resultText(block).match(/#?(\d+)/)?.[1];
  const t = todos.find(t => t.text === pending.subject && !t.taskId);
  if (t && n) t.taskId = n;
}

async function pump(s) {
  for await (const msg of s.q) {
    if (s !== session) return;                                   // superseded by a new session
    switch (msg.type) {
      case 'system':
        if (msg.subtype === 'init') {
          s.id = msg.session_id;
          fs.writeFileSync(LAST_SESSION_FILE, msg.session_id);
          emit({ type: 'init', id: msg.session_id, model: msg.model, style: msg.output_style });
        }
        if (msg.subtype === 'local_command_output') emit({ type: 'command_output', text: clip(msg.content, 12000) });
        break;
      case 'stream_event': {
        if (msg.parent_tool_use_id) break;                        // a subagent's words stay inside its step
        const ev = msg.event;
        if (ev.type === 'content_block_start' && ev.content_block?.type === 'text') emit({ type: 'text_start' });
        if (ev.type === 'content_block_start' && ev.content_block?.type === 'thinking') emit({ type: 'thinking' });
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
          s.streamedText = true;
          emit({ type: 'text', text: ev.delta.text });
        }
        break;
      }
      case 'assistant':
        for (const block of msg.message.content || []) {
          // Replies stream in as deltas above. Slash commands like /context answer
          // in one whole block with no stream, so show those from here.
          if (block.type === 'text' && !msg.parent_tool_use_id) {
            if (!s.streamedText && block.text.trim()) {
              emit({ type: 'text_start' });
              emit({ type: 'text', text: block.text });
            }
            s.streamedText = false;
          }
          if (block.type === 'tool_use') {
            emit(toolEvent(block, msg.parent_tool_use_id));
            if (!msg.parent_tool_use_id) trackTodos(block, s);
          }
        }
        break;
      case 'user': {
        const content = Array.isArray(msg.message?.content) ? msg.message.content : [];
        for (const block of content) {
          if (block.type !== 'tool_result') continue;
          emit(toolDone(block, msg.parent_tool_use_id));
          if (!msg.parent_tool_use_id) linkTaskId(block, s);
        }
        break;
      }
      case 'result':
        s.busy = false;
        emit({
          type: 'result',
          ok: s.interrupted || (msg.subtype === 'success' && !msg.is_error),
          interrupted: s.interrupted,
          ms: msg.duration_ms,
          error: msg.subtype !== 'success' ? msg.subtype : null,
        });
        s.interrupted = false;
        emit({ type: 'busy', busy: false });
        refreshBoard();
        break;
    }
  }
}

// ---------------------------------------------------------------- sending

const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

// Attachments arrive as base64 from the browser and become content blocks:
// images → image, PDFs → document, anything textual → a text block with its contents.
function attachmentBlocks(files = []) {
  const blocks = [], shown = [], problems = [];
  let total = 0;
  for (const f of files) {
    const bytes = Math.floor((f.data?.length || 0) * 3 / 4);
    total += bytes;
    if (total > MAX_ATTACHMENT_BYTES) { problems.push(`${f.name}: over the 20 MB limit`); continue; }
    if (IMAGE_TYPES.has(f.type)) {
      blocks.push({ type: 'image', source: { type: 'base64', media_type: f.type, data: f.data } });
      shown.push({ name: f.name, kind: 'image', preview: bytes < 1_500_000 ? `data:${f.type};base64,${f.data}` : null });
    } else if (f.type === 'application/pdf') {
      blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: f.data }, title: f.name });
      shown.push({ name: f.name, kind: 'document' });
    } else if (f.type.startsWith('text/') || /\.(md|txt|csv|json|js|mjs|ts|py|sh|html|css|ya?ml)$/i.test(f.name)) {
      const text = Buffer.from(f.data, 'base64').toString('utf8');
      blocks.push({ type: 'text', text: `<attached file: ${f.name}>\n${text}\n</attached file>` });
      shown.push({ name: f.name, kind: 'text' });
    } else problems.push(`${f.name}: can't attach this type (${f.type || 'unknown'})`);
  }
  return { blocks, shown, problems };
}

function send({ text = '', files = [] }) {
  const { blocks, shown, problems } = attachmentBlocks(files);
  for (const p of problems) emit({ type: 'error', text: p });
  if (!text.trim() && !blocks.length) return;
  if (!session) startSession(lastDeadSession ? { resume: lastDeadSession } : {});
  const uuid = crypto.randomUUID();
  session.busy = true;
  emit({ type: 'user', text, uuid, ts: Date.now(), files: shown });
  emit({ type: 'busy', busy: true });
  const content = blocks.length ? [...blocks, ...(text.trim() ? [{ type: 'text', text }] : [])] : text;
  session.inbox.push({
    type: 'user',
    uuid,
    message: { role: 'user', content },
    parent_tool_use_id: null,
  });
}

// "Rewind files to here": first a dry run so Korn sees what would change.
// A real rewind doesn't list its files, so the confirmation reuses the preview's.
const rewindPreviews = new Map();
async function rewind({ uuid, confirm }) {
  if (!session || !uuid) return;
  try {
    const r = await session.q.rewindFiles(uuid, { dryRun: !confirm });
    let files = (r.filesChanged || []).map(f => f.replace(HOME, '~'));
    if (!confirm) rewindPreviews.set(uuid, files);
    else if (!files.length) files = rewindPreviews.get(uuid) || [];
    emit({
      type: confirm ? 'rewound' : 'rewind_preview', uuid,
      canRewind: r.canRewind, error: r.error || null,
      files, insertions: r.insertions || 0, deletions: r.deletions || 0,
    });
  } catch (err) {
    emit({ type: 'rewind_preview', uuid, canRewind: false, error: err.message, files: [] });
  }
}

// ---------------------------------------------------------------- @-mentions
// The repo's tracked files (minus its memory mirror) plus the live memory folder.

let fileIndex = { at: 0, list: [] };
function listFiles() {
  if (Date.now() - fileIndex.at < 60000) return Promise.resolve(fileIndex.list);
  return new Promise(resolve => {
    execFile('git', ['-C', REPO, 'ls-files'], { timeout: 5000, maxBuffer: 8 << 20 }, (err, out) => {
      const repoFiles = err ? [] : out.split('\n').filter(f => f && !f.startsWith('memory/'));
      let mem = [];
      try { mem = fs.readdirSync(MEMORY).filter(f => f.endsWith('.md')).map(f => path.join(MEMORY, f).replace(HOME, '~')); } catch {}
      fileIndex = { at: Date.now(), list: [...mem, ...repoFiles] };
      resolve(fileIndex.list);
    });
  });
}
async function findFiles(q) {
  const needle = (q || '').toLowerCase();
  const list = await listFiles();
  const scored = [];
  for (const f of list) {
    const lower = f.toLowerCase(), base = path.basename(lower);
    const score = !needle ? 1 : base.startsWith(needle) ? 3 : base.includes(needle) ? 2 : lower.includes(needle) ? 1 : 0;
    if (score) scored.push([score, f]);
  }
  return scored.sort((a, b) => b[0] - a[0] || a[1].length - b[1].length).slice(0, 12).map(([, f]) => ({
    path: f, label: f.startsWith('~/.claude/') ? `memory/${path.basename(f)}` : f,
  }));
}

// ---------------------------------------------------------------- the board
// Everything on the right-hand panel comes from files Crow already maintains.

function readSafe(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } }

function bangkokToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });  // YYYY-MM-DD
}

function upcomingEvents() {
  const today = bangkokToday();
  const t0 = Date.parse(today);
  return readSafe(path.join(MEMORY, 'reference_upcoming_events.md'))
    .split('\n')
    .map(l => l.match(/^(\d{4}-\d{2}-\d{2}) \| (.+)$/))
    .filter(Boolean)
    .map(([, date, title]) => ({ date, title, days: Math.round((Date.parse(date) - t0) / 86400000) }))
    .filter(e => e.days >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
}

function sitrepStatus() {
  const text = readSafe(path.join(MEMORY, 'sitrep.md'));
  const m = text.match(/## 🚪 Current status\n([\s\S]*?)(?=\n## )/);
  return m ? m[1].trim() : '';
}

function ghostCards() {
  return new Promise(resolve => {
    execFile('python3', [path.join(REPO, 'bin/ghost.py'), 'list'], { timeout: 5000 }, (err, out) => {
      if (err) return resolve({ due: 0, next: null, passed: 0, deckTotal: 0 });
      const today = bangkokToday();
      const cards = out.split('\n')
        .map(l => l.match(/^\s*(\d+)\s+(\d{4}-\d{2}-\d{2})\s+box (\d)\s+\[([^\]]+)\]\s+(.+)$/))
        .filter(Boolean)
        .map(([, line, date, box, subject, q]) => ({ line: +line, date, box: +box, subject, q }));
      const due = cards.filter(c => c.date <= today);
      const upcoming = cards.filter(c => c.date > today).sort((a, b) => a.date.localeCompare(b.date));
      // for the plum blossom: how much of the whole deck (retired cards included) has been passed at least once
      const deck = readSafe(path.join(MEMORY, 'ghost_deck.md')).split('\n').map(l => l.match(/^- \d{4}-\d{2}-\d{2} \| box (\d) \|/)).filter(Boolean);
      const passed = deck.filter(([, box]) => +box >= 2).length;
      resolve({ due: due.length, total: cards.length, next: due[0] || upcoming[0] || null, passed, deckTotal: deck.length });
    });
  });
}

// ---------------------------------------------------------------- the water log (the plum blossom)
// Every finished task waters the flower: a ghost card passed, a training session
// done, a said/did item kept. One blossom per watering this week (Mon–Sun, Bangkok).
const WATER_LOG = path.join(MEMORY, 'water_log.md');
const LEDGER = path.join(MEMORY, 'ledger_said_did.md');
const LEDGER_ROW = /^- \[(.)\] (\d{4}-\d{2}-\d{2}) → (\d{4}-\d{2}-\d{2}) \| (.+)$/;
const TRAINING_FROM = '2026-10-05';   // training tasks start the Monday after the last midterm

function waterRows() {
  return readSafe(WATER_LOG).split('\n').map(l => l.match(/^- (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) \| (\w+) \| (.+)$/)).filter(Boolean)
    .map(([, date, time, kind, what]) => ({ date, time, kind, what }));
}
function weekStart(today) {
  const d = new Date(today + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
function trainingToday(today) {
  if (today < TRAINING_FROM) return null;
  try { return JSON.parse(readSafe(path.join(HERE, 'road-plan.json'))).sessions.find(s => s.date === today) || null; } catch { return null; }
}
function ledgerDue(today) {
  return readSafe(LEDGER).split('\n').map((l, i) => ({ line: i + 1, m: l.match(LEDGER_ROW) }))
    .filter(({ m }) => m && m[1] === ' ' && m[3] <= today)
    .map(({ line, m }) => ({ kind: 'ledger', id: line, text: m[4], due: m[3] }));
}
function water(ghost) {
  const today = bangkokToday(), rows = waterRows(), from = weekStart(today);
  const tasks = [];
  if (ghost?.next && ghost.due > 0) tasks.push({ kind: 'ghost' });
  const t = trainingToday(today);
  if (t) tasks.push({ kind: 'training', id: today, text: t.title, done: rows.some(r => r.kind === 'training' && r.date === today) });
  tasks.push(...ledgerDue(today));
  return { week: rows.filter(r => r.date >= from).length, tasks, last: rows.at(-1) || null, goals: goals() };
}
// Today's goals (bin/goals.py → goals_today.md): one blossom slot per goal on the
// flower. "Bed by 23:30" is settled at the next session, so it gets no slot today.
// A day runs 05:00 → 05:00 Bangkok, like goals.py.
const GOALS_LOG = path.join(MEMORY, 'goals_today.md');
function goalDay() {
  return new Date(Date.now() + (7 - 5) * 3600e3).toISOString().slice(0, 10);
}
function goals() {
  const day = goalDay(), rows = readSafe(GOALS_LOG).split('\n')
    .map(l => l.match(/^- (\d{4}-\d{2}-\d{2}) \| (.+?) \| (open|done|missed|closed)$/)).filter(m => m && m[1] === day);
  const list = rows.filter(m => m[3] !== 'closed').map((m, i) => ({ n: i + 1, text: m[2], status: m[3], slot: m[2] !== 'Bed by 23:30' }));
  const slots = list.filter(g => g.slot);
  return { day, list, closed: rows.some(m => m[3] === 'closed'), total: slots.length, done: slots.filter(g => g.status === 'done').length };
}
function addWater(kind, what) {
  return new Promise(resolve => execFile('python3', [path.join(REPO, 'bin/water.py'), 'add', kind, what], { timeout: 5000 }, () => resolve()));
}
// A Done button on the board: training for today, or a said/did line kept.
async function markDone(m) {
  const today = bangkokToday();
  if (m.kind === 'goal' && Number.isInteger(m.id)) {
    const g = goals();
    if (g.closed || g.list[m.id - 1]?.status !== 'open') return false;
    await new Promise(resolve => execFile('python3', [path.join(REPO, 'bin/goals.py'), 'done', String(m.id)], { timeout: 5000 }, () => resolve()));
    return true;
  }
  if (m.kind === 'training') {
    const t = trainingToday(today);
    if (!t || m.id !== today || waterRows().some(r => r.kind === 'training' && r.date === today)) return false;
    await addWater('training', t.title);
    return true;
  }
  if (m.kind === 'ledger' && Number.isInteger(m.id)) {
    const lines = readSafe(LEDGER).split('\n'), row = lines[m.id - 1]?.match(LEDGER_ROW);
    if (!row || row[1] !== ' ' || row[3] > today) return false;
    lines[m.id - 1] = lines[m.id - 1].replace('- [ ]', '- [x]');
    fs.writeFileSync(LEDGER, lines.join('\n'));
    await addWater('ledger', row[4].slice(0, 80));
    return true;
  }
  return false;
}

let board = null;
async function refreshBoard() {
  const ghost = await ghostCards();
  board = { events: upcomingEvents(), status: sitrepStatus(), ghost, water: water(ghost), at: Date.now() };
  emit({ type: 'board', board });
}

// ---------------------------------------------------------------- http + ws

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
// Served from node_modules so the page works offline and skips two CDN round trips.
const VENDOR = {
  '/vendor/marked.js': 'node_modules/marked/lib/marked.umd.js',
  '/vendor/purify.js': 'node_modules/dompurify/dist/purify.min.js',
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const file = VENDOR[url.pathname] ? path.join(HERE, VENDOR[url.pathname])
    : path.join(HERE, 'public', url.pathname === '/' ? 'index.html' : url.pathname);
  if (!VENDOR[url.pathname] && !file.startsWith(path.join(HERE, 'public') + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
});

// Only this page may connect. Without the check, any website open in the
// browser could open a socket to localhost and drive Crow, tools included.
const ALLOWED_ORIGINS = new Set([`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`]);
const wss = new WebSocketServer({
  server,
  maxPayload: 32 * 1024 * 1024,                     // room for attachments
  verifyClient: ({ origin }) => ALLOWED_ORIGINS.has(origin),
});
wss.on('connection', ws => {
  ws.send(JSON.stringify(replayEvent()));
  ws.on('message', async raw => {
    let m;
    try { m = JSON.parse(raw); } catch { return; }
    switch (m.type) {
      case 'send':
        if (typeof m.text === 'string') send({ text: m.text, files: Array.isArray(m.files) ? m.files : [] });
        break;
      case 'interrupt':
        if (session?.busy) { session.interrupted = true; session.q.interrupt().catch(() => {}); }
        break;
      case 'new': startSession(); break;
      case 'board': refreshBoard(); break;
      case 'water':
        if (await markDone(m)) refreshBoard();
        break;
      case 'model': setModel(m.value); break;
      case 'mode': setMode(m.value); break;
      case 'permission': answerPermission(m); break;
      case 'rewind': rewind(m); break;
      case 'files':
        ws.send(JSON.stringify({ type: 'files', q: m.q, files: await findFiles(m.q) }));
        break;
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  const resume = process.argv.includes('--resume') ? readSafe(LAST_SESSION_FILE).trim() : '';
  startSession(resume ? { resume } : {});
  refreshBoard();
  console.log(`Crow Room → http://localhost:${PORT}${resume ? `  (resuming ${resume})` : ''}`);
});
