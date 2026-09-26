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
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { query } from '@anthropic-ai/claude-agent-sdk';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');                       // ~/crow-config
const PORT = Number(process.env.CROW_PORT || 4711);
const MEMORY = path.join(os.homedir(), '.claude/projects', REPO.replaceAll('/', '-'), 'memory');
const LAST_SESSION_FILE = path.join(HERE, '.last-session');
const MODEL_FILE = path.join(HERE, '.model');                 // the model picked in the Room, kept across restarts

// The short list the Room offers. Values are what setModel() takes; the SDK
// resolves each to the current version (supportedModels() confirmed these on 27 Sep).
const MODELS = [
  { value: 'opus', label: 'Opus 5.5', note: 'default, best all-round' },
  { value: 'claude-fable-5-1', label: 'Fable 5.1', note: 'most capable, slowest' },
  { value: 'sonnet', label: 'Sonnet 5', note: 'faster, a step down' },
  { value: 'haiku', label: 'Haiku 4.5', note: 'fastest, for quick stuff' },
];

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

let session = null;          // { inbox, q, id, busy, interrupted }
const history = [];          // UI events, replayed to a reloaded tab
const pendingPermissions = new Map();
let permissionSeq = 0;

function emit(event) {
  // Text arrives in many small deltas; fold them into one history entry so a
  // long session doesn't push the start of the conversation out of the replay.
  const last = history[history.length - 1];
  if (event.type === 'text' && last?.type === 'text') last.text += event.text;
  else history.push({ ...event });
  if (history.length > 4000) history.splice(0, history.length - 4000);
  const data = JSON.stringify(event);
  for (const ws of wss.clients) if (ws.readyState === 1) ws.send(data);
}

function startSession({ resume } = {}) {
  if (session) { session.inbox.close(); session.q.close(); }
  history.length = 0;
  for (const [, p] of pendingPermissions) p.resolve({ behavior: 'deny', message: 'Session restarted.' });
  pendingPermissions.clear();

  const inbox = new Inbox();
  const model = readSafe(MODEL_FILE).trim() || undefined;
  const q = query({
    prompt: inbox,
    options: {
      cwd: REPO,
      settingSources: ['user', 'project', 'local'],   // CLAUDE.md, hooks, output style, permissions
      systemPrompt: { type: 'preset', preset: 'claude_code' },
      includePartialMessages: true,
      permissionMode: process.env.CROW_PERMISSION_MODE || 'auto',   // override only for testing the Allow/Deny card
      // The Room has no question picker, so Crow asks in plain text instead.
      disallowedTools: ['AskUserQuestion'],
      ...(model ? { model } : {}),
      ...(resume ? { resume } : {}),
      canUseTool: askInBrowser,
    },
  });
  const s = { inbox, q, id: resume || null, busy: false, interrupted: false };
  session = s;
  emit({ type: 'session', state: resume ? 'resumed' : 'new', id: resume || null });

  // Warm the Claude Code process now, not on the first message, and learn
  // which model is live so the picker starts on the right one.
  q.initializationResult().then(init => {
    if (s !== session) return;
    s.account = init.account?.subscriptionType;
    emit(modelEvent(model || 'opus'));
  }).catch(() => {});

  // However the loop ends (crash or a clean exit), if this is still the live
  // session the next message has to start a new process on the same conversation.
  pump(s).catch(err => err).then(err => {
    if (s !== session) return;
    emit({ type: 'error', text: `Crow's process stopped${err ? `: ${err.message || err}` : ''}. Your next message restarts it where you left off.` });
    session = null;                                  // next send() resumes this conversation in a fresh process
    lastDeadSession = s.id;
    emit({ type: 'busy', busy: false });
  });
}
let lastDeadSession = null;

function modelEvent(value) {
  return { type: 'model', value, models: MODELS };
}

async function setModel(value) {
  if (!MODELS.some(m => m.value === value)) return;
  fs.writeFileSync(MODEL_FILE, value);
  if (session) await session.q.setModel(value).catch(err => emit({ type: 'error', text: `Couldn't switch model: ${err.message}` }));
  emit(modelEvent(value));
}

// The permission prompt the terminal would show, shown in the browser instead.
function askInBrowser(toolName, input, { signal }) {
  const id = String(++permissionSeq);
  return new Promise(resolve => {
    pendingPermissions.set(id, { resolve });
    signal?.addEventListener('abort', () => {
      pendingPermissions.delete(id);
      resolve({ behavior: 'deny', message: 'Aborted.' });
    });
    emit({ type: 'permission', id, tool: toolName, input: summarizeInput(toolName, input) });
  });
}

function summarizeInput(tool, input = {}) {
  if (input.command) return String(input.command);
  if (input.file_path) return String(input.file_path);
  if (input.pattern) return `${input.pattern}${input.path ? `  in ${input.path}` : ''}`;
  if (input.url) return String(input.url);
  if (input.query) return String(input.query);
  if (input.skill) return String(input.skill);
  if (input.description) return String(input.description);
  const s = JSON.stringify(input);
  return s.length > 240 ? s.slice(0, 240) + '…' : s;
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
        break;
      case 'stream_event': {
        if (msg.parent_tool_use_id) break;                        // subagent chatter stays out of the room
        const ev = msg.event;
        if (ev.type === 'content_block_start' && ev.content_block?.type === 'text') emit({ type: 'text_start' });
        if (ev.type === 'content_block_start' && ev.content_block?.type === 'thinking') emit({ type: 'thinking' });
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') emit({ type: 'text', text: ev.delta.text });
        break;
      }
      case 'assistant':
        if (msg.parent_tool_use_id) break;
        for (const block of msg.message.content || []) {
          if (block.type === 'tool_use') {
            emit({ type: 'tool', id: block.id, name: block.name, input: summarizeInput(block.name, block.input) });
          }
        }
        break;
      case 'user': {
        if (msg.parent_tool_use_id) break;
        const content = Array.isArray(msg.message?.content) ? msg.message.content : [];
        for (const block of content) {
          if (block.type === 'tool_result') emit({ type: 'tool_done', id: block.tool_use_id, error: !!block.is_error });
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

function send(text) {
  if (!session) startSession(lastDeadSession ? { resume: lastDeadSession } : {});
  session.busy = true;
  emit({ type: 'user', text, ts: Date.now() });
  emit({ type: 'busy', busy: true });
  session.inbox.push({
    type: 'user',
    message: { role: 'user', content: text },
    parent_tool_use_id: null,
  });
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
    .slice(0, 4);
}

function sitrepStatus() {
  const text = readSafe(path.join(MEMORY, 'sitrep.md'));
  const m = text.match(/## 🚪 Current status\n([\s\S]*?)(?=\n## )/);
  return m ? m[1].trim() : '';
}

function ghostCards() {
  return new Promise(resolve => {
    execFile('python3', [path.join(REPO, 'bin/ghost.py'), 'list'], { timeout: 5000 }, (err, out) => {
      if (err) return resolve({ due: 0, next: null });
      const today = bangkokToday();
      const cards = out.split('\n')
        .map(l => l.match(/^\s*(\d+)\s+(\d{4}-\d{2}-\d{2})\s+box (\d)\s+\[([^\]]+)\]\s+(.+)$/))
        .filter(Boolean)
        .map(([, line, date, box, subject, q]) => ({ line: +line, date, box: +box, subject, q }));
      const due = cards.filter(c => c.date <= today);
      const upcoming = cards.filter(c => c.date > today).sort((a, b) => a.date.localeCompare(b.date));
      resolve({ due: due.length, total: cards.length, next: due[0] || upcoming[0] || null });
    });
  });
}

let board = null;
async function refreshBoard() {
  board = { events: upcomingEvents(), status: sitrepStatus(), ghost: await ghostCards(), at: Date.now() };
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
  verifyClient: ({ origin }) => ALLOWED_ORIGINS.has(origin),
});
wss.on('connection', ws => {
  ws.send(JSON.stringify({
    type: 'replay', events: history, busy: !!session?.busy, board,
    model: modelEvent(readSafe(MODEL_FILE).trim() || 'opus'),
  }));
  ws.on('message', raw => {
    let m;
    try { m = JSON.parse(raw); } catch { return; }
    if (m.type === 'send' && typeof m.text === 'string' && m.text.trim()) send(m.text.trim());
    if (m.type === 'interrupt' && session?.busy) {
      session.interrupted = true;
      session.q.interrupt().catch(() => {});
    }
    if (m.type === 'model') setModel(m.value);
    if (m.type === 'new') startSession();
    if (m.type === 'board') refreshBoard();
    if (m.type === 'permission') {
      const p = pendingPermissions.get(m.id);
      if (!p) return;
      pendingPermissions.delete(m.id);
      p.resolve(m.allow ? { behavior: 'allow' } : { behavior: 'deny', message: 'Korn said no in the Crow Room.' });
      emit({ type: 'permission_done', id: m.id, allow: !!m.allow });
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  const resume = process.argv.includes('--resume') ? readSafe(LAST_SESSION_FILE).trim() : '';
  startSession(resume ? { resume } : {});
  refreshBoard();
  console.log(`Crow Room → http://localhost:${PORT}${resume ? `  (resuming ${resume})` : ''}`);
});
