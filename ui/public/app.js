// Crow Room client. Talks to server.mjs over one WebSocket; the server owns the
// Claude Code session, this file only draws it.

const CREW = [
  { key: 'sol',   name: 'Sol',   role: 'The long game: direction, meaning' },
  { key: 'persi', name: 'Persi', role: 'The executor: what are we doing today' },
  { key: 'artis', name: 'Artis', role: 'Taste: music, writing, content' },
  { key: 'vera',  name: 'Vera',  role: 'The mirror: what you are actually doing' },
  { key: 'vex',   name: 'Vex',   role: 'Devil’s advocate: beat the plan up' },
];

// Shown when the room is empty, so the common openers are one click away.
const STARTERS = [
  'Read the sitrep',
  'Serve me the ghost card',
  'Drill me on BA202, one question at a time',
  'What’s the one thing that matters today?',
];

const $ = id => document.getElementById(id);
const stream = $('stream'), input = $('input'), sendBtn = $('send'), stopBtn = $('stop'), jump = $('jump');

let ws;
let busy = false;
let reply = null;          // { el, md } for the reply block being streamed
let thinkingEl = null;
let stepGroup = null;      // the <details> collecting this run of tool steps
const steps = new Map();   // tool_use id → element
let models = [];

marked.setOptions({ gfm: true, breaks: false });

// Links open in a new tab; clicking one must never navigate the Room away.
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A') { node.setAttribute('target', '_blank'); node.setAttribute('rel', 'noopener noreferrer'); }
});

// ---------------------------------------------------------------- crew rail

const crewList = $('crew');
for (const c of CREW) {
  const li = document.createElement('li');
  li.dataset.voice = c.key;
  li.style.setProperty('--c', `var(--${c.key})`);
  li.innerHTML = `<button type="button" title="${c.role}"><span class="dot"></span>${c.name}</button>`;
  li.querySelector('button').onclick = () => callCrew(c.name);
  crewList.append(li);
}

function callCrew(name) {
  const text = input.value.replace(/^(Sol|Persi|Artis|Vera|Vex), /, '');
  input.value = `${name}, ${text}`;
  input.focus();
  autosize();
}

function lightUp(voice) {
  const li = crewList.querySelector(`[data-voice="${voice}"]`);
  if (!li) return;
  li.classList.add('speaking');
  clearTimeout(li._t);
  li._t = setTimeout(() => li.classList.remove('speaking'), 2400);
}

// ---------------------------------------------------------------- rendering

function atBottom() { return stream.scrollHeight - stream.scrollTop - stream.clientHeight < 80; }
function toBottom() { stream.scrollTop = stream.scrollHeight; }
function add(el) {
  const stick = atBottom();
  stream.querySelector('.empty')?.remove();
  stream.append(el);
  if (stick) toBottom();
  else jump.hidden = false;
  return el;
}
function div(cls, text) {
  const el = document.createElement('div');
  el.className = cls;
  if (text != null) el.textContent = text;
  return el;
}

stream.addEventListener('scroll', () => { if (atBottom()) jump.hidden = true; });
jump.onclick = () => { toBottom(); jump.hidden = true; };

function renderMarkdown(md) {
  return DOMPurify.sanitize(marked.parse(md.replace(/\[\[([^\]]+)\]\]/g, '$1')));
}

// Paragraphs that open with "Name:" become voices. Handles **Vera:** and plain Vera:.
const VOICE_RE = /^(Crow|Sol|Persi|Artis|Vera|Vex)\s*:\s*/;
function markVoices(root, live) {
  for (const block of root.querySelectorAll(':scope > p, :scope > blockquote > p, :scope > ul > li, :scope > ol > li')) {
    const first = block.firstChild;
    let name = null;
    if (first?.nodeType === 1 && first.tagName === 'STRONG' && VOICE_RE.test(first.textContent + ' ')) {
      name = first.textContent.match(VOICE_RE)[1];
      const rest = first.textContent.replace(VOICE_RE, '');
      first.replaceWith(...(rest ? [document.createTextNode(rest)] : []));
      // "**Vera**: text": the colon may have landed outside the <strong>
      const next = block.firstChild;
      if (next?.nodeType === 3) next.textContent = next.textContent.replace(/^\s*:?\s*/, '');
    } else if (first?.nodeType === 3 && VOICE_RE.test(first.textContent)) {
      name = first.textContent.match(VOICE_RE)[1];
      first.textContent = first.textContent.replace(VOICE_RE, '');
    }
    if (!name) continue;
    const key = name.toLowerCase();
    block.classList.add('voice', `voice-${key}`);
    const tag = document.createElement('span');
    tag.className = 'speaker';
    tag.textContent = name;
    block.prepend(tag);
    if (live) lightUp(key);
  }
}

function paintReply(live) {
  if (!reply) return;
  reply.el.innerHTML = renderMarkdown(reply.md);
  markVoices(reply.el, live);
  reply.el.classList.toggle('cursor', live && busy);
  if (live && atBottom()) toBottom();
}

let paintQueued = false;
function schedulePaint() {
  if (paintQueued) return;
  paintQueued = true;
  requestAnimationFrame(() => { paintQueued = false; paintReply(true); });
}

function endReply() {
  if (!reply) return;
  paintReply(false);          // a pending animation-frame paint may not have run yet
  reply = null;
}

function clearThinking() { thinkingEl?.remove(); thinkingEl = null; }
function showThinking() {
  if (!thinkingEl && !reply) thinkingEl = add(div('thinking', 'thinking…'));
}

// A run of tool steps is one group. While Crow works every step shows; once the
// turn moves on, a run of more than three folds into one line you can open.
function endSteps() {
  if (!stepGroup) return;
  const n = stepGroup.querySelectorAll('.step').length;
  if (n > 3) {
    stepGroup.classList.add('folded');
    stepGroup.open = false;
    stepGroup.querySelector('summary').textContent = `${n} steps`;
  }
  stepGroup = null;
}

const VERBS = {
  Read: 'reading', Write: 'writing', Edit: 'editing', NotebookEdit: 'editing',
  Bash: 'running', Grep: 'searching', Glob: 'looking for', WebFetch: 'fetching',
  WebSearch: 'searching the web for', Skill: 'loading skill', Agent: 'briefing',
  Task: 'briefing', ToolSearch: 'loading tools', TodoWrite: 'updating the plan',
};
function verbFor(name) {
  if (VERBS[name]) return VERBS[name];
  const mcp = name.match(/^mcp__(.+?)__(.+)$/);
  if (mcp) return `${mcp[2].replace(/_/g, ' ')} (${mcp[1].replace(/^claude_ai_/, '').replace(/_/g, ' ')})`;
  return name;
}
function shortPath(s) { return s.replace(/\/Users\/[^/\s]+/g, '~'); }
const bkk = { timeZone: 'Asia/Bangkok' };
function clockTime(ts) { return new Date(ts).toLocaleTimeString('en-GB', { ...bkk, hour: '2-digit', minute: '2-digit' }); }

// ---------------------------------------------------------------- events

function handle(ev, live = true) {
  switch (ev.type) {
    case 'session':
      if (ev.state === 'new' && live) { stream.innerHTML = ''; showEmpty(); }
      break;
    case 'user': {
      endReply(); endSteps(); clearThinking();
      const el = div('you');
      if (ev.ts) el.append(Object.assign(div('ts'), { textContent: clockTime(ev.ts) }));
      el.append(document.createTextNode(ev.text));
      add(el);
      if (live) toBottom();
      break;
    }
    case 'busy':
      setBusy(ev.busy, live);
      break;
    case 'thinking':
      if (live) showThinking();
      break;
    case 'text_start':
      clearThinking(); endSteps();
      if (!reply) reply = { el: add(div('reply')), md: '' };
      else reply.md += '\n\n';
      break;
    case 'text':
      clearThinking(); endSteps();
      if (!reply) reply = { el: add(div('reply')), md: '' };
      reply.md += ev.text;
      if (live) schedulePaint();
      break;
    case 'tool': {
      endReply(); clearThinking();
      if (!stepGroup) {
        stepGroup = document.createElement('details');
        stepGroup.className = 'steps';
        stepGroup.open = true;
        stepGroup.append(document.createElement('summary'));
        add(stepGroup);
      }
      const el = div('step running');
      el.innerHTML = `<span class="verb"></span><span class="what"></span>`;
      el.querySelector('.verb').textContent = verbFor(ev.name);
      el.querySelector('.what').textContent = shortPath(ev.input || '');
      el.title = ev.input || '';
      steps.set(ev.id, el);
      const stick = atBottom();
      stepGroup.append(el);
      if (stick) toBottom();
      break;
    }
    case 'tool_done': {
      const el = steps.get(ev.id);
      if (el) { el.classList.remove('running'); if (ev.error) el.classList.add('failed'); }
      if (live && busy && !stream.querySelector('.step.running')) showThinking();
      break;
    }
    case 'permission': {
      endReply(); endSteps(); clearThinking();
      const el = div('permission');
      el.dataset.id = ev.id;
      el.innerHTML = `<div class="ask"></div><div class="what"></div>
        <div class="actions"><button class="allow" type="button">Allow</button><button class="deny" type="button">Deny</button></div>`;
      el.querySelector('.ask').textContent = `Crow wants to use ${ev.tool}`;
      el.querySelector('.what').textContent = shortPath(ev.input || '');
      el.querySelector('.allow').onclick = () => answer(ev.id, true);
      el.querySelector('.deny').onclick = () => answer(ev.id, false);
      add(el);
      if (live) el.querySelector('.allow').focus();
      break;
    }
    case 'permission_done': {
      const el = stream.querySelector(`.permission[data-id="${ev.id}"]`);
      if (el && !el.classList.contains('done')) {
        el.classList.add('done');
        el.querySelector('.ask').textContent += ev.allow ? ': allowed' : ': denied';
      }
      break;
    }
    case 'result':
      endReply(); endSteps(); clearThinking();
      for (const el of stream.querySelectorAll('.step.running')) el.classList.remove('running');
      if (ev.interrupted) add(div('meta', 'Stopped.'));
      else if (!ev.ok) add(div('error', `The turn ended early (${ev.error || 'error'}).`));
      break;
    case 'error':
      endReply(); endSteps(); clearThinking();
      add(div('error', ev.text));
      break;
    case 'board':
      paintBoard(ev.board);
      break;
    case 'model':
      paintModel(ev);
      break;
  }
}

function setBusy(b, live = true) {
  busy = b;
  sendBtn.hidden = b;
  stopBtn.hidden = !b;
  if (!b) { if (reply && live) paintReply(false); clearThinking(); }
  else if (live) showThinking();
}

function answer(id, allow) { ws.send(JSON.stringify({ type: 'permission', id, allow })); }

function showEmpty() {
  if (stream.children.length) return;
  const box = div('empty', 'The room is quiet. Say something, or start with one of these.');
  const row = div('starters');
  for (const s of STARTERS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = s;
    b.onclick = () => sendText(s);
    row.append(b);
  }
  box.append(row);
  stream.append(box);
}

// ---------------------------------------------------------------- board

function tick() {
  const now = new Date();
  $('time').textContent = clockTime(now);
  $('date').textContent = now.toLocaleDateString('en-GB', { ...bkk, weekday: 'long', day: 'numeric', month: 'long' });
}
tick();
setInterval(tick, 15000);

// "MIDTERM 5: AC311 Intermediate Accounting 09:00–12:00 (flood-postponed…)" →
// title "Midterm: AC311 Intermediate Accounting", time "09:00–12:00"
function splitEvent(t) {
  const time = t.match(/\b\d{2}:\d{2}\s*[–-]\s*\d{2}:\d{2}\b/)?.[0] || '';
  const title = t.replace(time, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+([.,])/g, '$1')
    .replace(/^MIDTERM \d+:\s*/i, 'Midterm: ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return { title, time: time.replace(/\s/g, '') };
}

function paintBoard(board) {
  if (!board) return;
  const events = $('events');
  events.innerHTML = '';
  for (const e of board.events) {
    const li = document.createElement('li');
    if (e.days <= 3) li.classList.add('near');
    const { title, time } = splitEvent(e.title);
    const day = new Date(e.date + 'T00:00:00+07:00')
      .toLocaleDateString('en-GB', { ...bkk, weekday: 'short', day: 'numeric', month: 'short' });
    const days = e.days === 0 ? 'today' : e.days === 1 ? '1<small>day</small>' : `${e.days}<small>days</small>`;
    li.innerHTML = `<span class="title"></span><span class="days">${days}</span><span class="when"></span>`;
    li.querySelector('.title').textContent = title;
    li.querySelector('.when').textContent = time ? `${day}, ${time}` : day;
    events.append(li);
  }

  const status = $('status');
  status.innerHTML = board.status ? renderMarkdown(board.status) : '<p>Nothing logged.</p>';
  requestAnimationFrame(() => {
    const clamped = status.classList.contains('clamped');
    status.classList.add('clamped');
    const overflows = status.scrollHeight > status.clientHeight + 4;
    if (!clamped) status.classList.remove('clamped');
    $('status-more').hidden = !overflows;
  });

  const g = board.ghost, ghost = $('ghost');
  if (!g?.next) { $('ghost-section').hidden = true; return; }
  $('ghost-section').hidden = false;
  const due = g.due > 0;
  const nextDay = new Date(g.next.date + 'T00:00:00+07:00')
    .toLocaleDateString('en-GB', { ...bkk, weekday: 'short', day: 'numeric', month: 'short' });
  ghost.innerHTML = `<div class="subject"></div><div class="q"></div><div class="due"></div>
    <button type="button" class="quiet">Answer it</button>`;
  ghost.querySelector('.subject').textContent = g.next.subject;
  ghost.querySelector('.q').textContent = g.next.q;
  ghost.querySelector('.due').textContent = due
    ? `${g.due} due now, ${g.total} in the deck`
    : `Next one due ${nextDay}, ${g.total} in the deck`;
  ghost.querySelector('button').onclick = () => {
    input.value = `Ghost card (line ${g.next.line}), my answer: `;
    input.focus(); autosize();
  };
}

$('status-more').onclick = () => {
  const status = $('status');
  const open = status.classList.toggle('clamped');
  $('status-more').textContent = open ? 'Show all' : 'Show less';
};

function paintModel(ev) {
  if (ev.models) models = ev.models;
  const sel = $('model');
  sel.innerHTML = '';
  for (const m of models) sel.append(new Option(m.label, m.value, false, m.value === ev.value));
  $('model-note').textContent = models.find(m => m.value === ev.value)?.note || '';
}
$('model').onchange = e => {
  ws.send(JSON.stringify({ type: 'model', value: e.target.value }));
  $('model-note').textContent = 'Switching… the next reply uses it.';
};

// ---------------------------------------------------------------- composer

function autosize() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, innerHeight * 0.4) + 'px';
}
function sendText(text) {
  if (!text.trim() || ws?.readyState !== 1) return false;
  ws.send(JSON.stringify({ type: 'send', text: text.trim() }));
  return true;
}
input.addEventListener('input', autosize);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); $('composer').requestSubmit(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && busy) ws.send(JSON.stringify({ type: 'interrupt' }));
});
$('composer').addEventListener('submit', e => {
  e.preventDefault();
  if (sendText(input.value)) { input.value = ''; autosize(); }
});
stopBtn.onclick = () => ws.send(JSON.stringify({ type: 'interrupt' }));
$('new-session').onclick = () => {
  if (confirm('Start a fresh session? This one stays saved and can be resumed from the terminal.')) {
    ws.send(JSON.stringify({ type: 'new' }));
  }
};

// ---------------------------------------------------------------- connection

function connect() {
  ws = new WebSocket(`ws://${location.host}`);
  ws.onmessage = m => {
    const ev = JSON.parse(m.data);
    if (ev.type === 'replay') {
      stream.innerHTML = '';
      reply = null; thinkingEl = null; stepGroup = null; steps.clear();
      for (const e of ev.events) handle(e, false);
      endReply();
      if (!ev.busy) endSteps();
      setBusy(ev.busy, true);
      if (ev.board) paintBoard(ev.board);
      if (ev.model) paintModel(ev.model);
      showEmpty();
      toBottom();
      return;
    }
    handle(ev, true);
  };
  ws.onclose = () => setTimeout(connect, 1500);
}
connect();
setInterval(() => ws?.readyState === 1 && ws.send(JSON.stringify({ type: 'board' })), 5 * 60000);
input.focus();
