// Crow Room client. Talks to server.mjs over one WebSocket; the server owns the
// Claude Code session, this file only draws it.

const CREW = [
  { key: 'sol',   name: 'Sol',   role: 'The long game: direction, meaning' },
  { key: 'persi', name: 'Persi', role: 'The executor: what are we doing today' },
  { key: 'artis', name: 'Artis', role: 'Taste: music, writing, content' },
  { key: 'vera',  name: 'Vera',  role: 'The mirror: what you are actually doing' },
  { key: 'vex',   name: 'Vex',   role: 'Devil’s advocate: beat the plan up' },
];
const VOICES = ['crow', ...CREW.map(c => c.key)];

const $ = id => document.getElementById(id);
const stream = $('stream'), input = $('input'), sendBtn = $('send'), stopBtn = $('stop');

let ws;
let busy = false;
let reply = null;          // { el, md } for the reply block being streamed
let thinkingEl = null;
const steps = new Map();   // tool_use id → element
let sessionCost = 0;
let sessionInfo = {};

marked.setOptions({ gfm: true, breaks: false });

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
function add(el) {
  const stick = atBottom();
  stream.querySelector('.empty')?.remove();
  stream.append(el);
  if (stick) stream.scrollTop = stream.scrollHeight;
  return el;
}
function div(cls, text) {
  const el = document.createElement('div');
  el.className = cls;
  if (text != null) el.textContent = text;
  return el;
}

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
      // "**Vera:** text": the colon may have landed outside the <strong>
      const next = block.firstChild;
      if (next?.nodeType === 3) next.textContent = next.textContent.replace(/^\s*:?\s*/, '');
    } else if (first?.nodeType === 3 && VOICE_RE.test(first.textContent)) {
      name = first.textContent.match(VOICE_RE)[1];
      first.textContent = first.textContent.replace(VOICE_RE, '');
    }
    if (!name) continue;
    const key = name.toLowerCase();
    const target = block.tagName === 'LI' ? block : block;
    target.classList.add('voice', `voice-${key}`);
    const tag = document.createElement('span');
    tag.className = 'speaker';
    tag.textContent = name;
    target.prepend(tag);
    if (live) lightUp(key);
  }
}

function paintReply(live) {
  if (!reply) return;
  reply.el.innerHTML = renderMarkdown(reply.md);
  markVoices(reply.el, live);
  reply.el.classList.toggle('cursor', live && busy);
  if (live && atBottom()) stream.scrollTop = stream.scrollHeight;
}

let paintQueued = false;
function schedulePaint() {
  if (paintQueued) return;
  paintQueued = true;
  requestAnimationFrame(() => { paintQueued = false; paintReply(true); });
}

function endReply() {
  if (!reply) return;
  reply.el.classList.remove('cursor');
  reply = null;
}

function clearThinking() { thinkingEl?.remove(); thinkingEl = null; }

const VERBS = {
  Read: 'reading', Write: 'writing', Edit: 'editing', NotebookEdit: 'editing',
  Bash: 'running', Grep: 'searching', Glob: 'looking for', WebFetch: 'fetching',
  WebSearch: 'searching the web for', Skill: 'loading skill', Agent: 'briefing',
  Task: 'briefing', ToolSearch: 'loading tools', TodoWrite: 'updating the plan',
};
function verbFor(name) {
  if (VERBS[name]) return VERBS[name];
  const mcp = name.match(/^mcp__([^_]+(?:_[^_]+)*)__(.+)$/);
  if (mcp) return `${mcp[2].replace(/_/g, ' ')} (${mcp[1].replace(/^claude_ai_/, '').replace(/_/g, ' ')})`;
  return name;
}
function shortPath(s) { return s.replace(/^\/Users\/[^/]+/, '~'); }

// ---------------------------------------------------------------- events

function handle(ev, live = true) {
  switch (ev.type) {
    case 'session':
      if (ev.state === 'new' && live) {
        stream.innerHTML = '';
        sessionCost = 0;
      }
      break;
    case 'init':
      sessionInfo = { model: ev.model, style: ev.style, id: ev.id };
      paintSessionInfo();
      break;
    case 'user':
      endReply(); clearThinking();
      add(div('you', ev.text));
      break;
    case 'busy':
      setBusy(ev.busy, live);
      break;
    case 'thinking':
      if (!thinkingEl && !reply && live) thinkingEl = add(div('thinking', 'thinking…'));
      break;
    case 'text_start':
      clearThinking();
      if (!reply) reply = { el: add(div('reply')), md: '' };
      else reply.md += '\n\n';
      break;
    case 'text':
      clearThinking();
      if (!reply) reply = { el: add(div('reply')), md: '' };
      reply.md += ev.text;
      live ? schedulePaint() : null;
      break;
    case 'tool': {
      if (reply && !live) paintReply(false);
      endReply(); clearThinking();
      const el = div('step running');
      el.innerHTML = `<span class="verb"></span><span class="what"></span>`;
      el.querySelector('.verb').textContent = verbFor(ev.name);
      el.querySelector('.what').textContent = shortPath(ev.input || '');
      el.title = ev.input || '';
      steps.set(ev.id, el);
      add(el);
      break;
    }
    case 'tool_done': {
      const el = steps.get(ev.id);
      if (el) { el.classList.remove('running'); if (ev.error) el.classList.add('failed'); }
      break;
    }
    case 'permission': {
      endReply(); clearThinking();
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
      if (el) {
        el.classList.add('done');
        el.querySelector('.ask').textContent += ev.allow ? ': allowed' : ': denied';
      }
      break;
    }
    case 'result':
      if (reply && !live) paintReply(false);
      endReply(); clearThinking();
      for (const el of stream.querySelectorAll('.step.running')) el.classList.remove('running');
      if (typeof ev.cost === 'number') sessionCost += ev.cost;
      if (!ev.ok) add(div('error', `The turn ended early (${ev.error || 'error'}).`));
      paintSessionInfo();
      break;
    case 'error':
      endReply(); clearThinking();
      add(div('error', ev.text));
      break;
    case 'board':
      paintBoard(ev.board);
      break;
  }
}

function setBusy(b, live = true) {
  busy = b;
  sendBtn.hidden = b;
  stopBtn.hidden = !b;
  if (!b) { if (reply && live) paintReply(false); clearThinking(); }
  else if (live && !reply && !thinkingEl) thinkingEl = add(div('thinking', 'thinking…'));
}

function answer(id, allow) { ws.send(JSON.stringify({ type: 'permission', id, allow })); }

// ---------------------------------------------------------------- board

const bkk = { timeZone: 'Asia/Bangkok' };
function tick() {
  const now = new Date();
  $('time').textContent = now.toLocaleTimeString('en-GB', { ...bkk, hour: '2-digit', minute: '2-digit' });
  $('date').textContent = now.toLocaleDateString('en-GB', { ...bkk, weekday: 'long', day: 'numeric', month: 'long' });
}
tick();
setInterval(tick, 15000);

function cleanTitle(t) {
  return t.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/^MIDTERM \d+:\s*/i, 'Midterm: ').trim();
}

function paintBoard(board) {
  if (!board) return;
  const events = $('events');
  events.innerHTML = '';
  for (const e of board.events) {
    const li = document.createElement('li');
    if (e.days <= 3) li.classList.add('near');
    const when = new Date(e.date + 'T00:00:00+07:00')
      .toLocaleDateString('en-GB', { ...bkk, weekday: 'short', day: 'numeric', month: 'short' });
    const days = e.days === 0 ? 'today' : e.days === 1 ? '1<small>day</small>' : `${e.days}<small>days</small>`;
    li.innerHTML = `<span class="title"></span><span class="days">${days}</span><span class="when"></span>`;
    li.querySelector('.title').textContent = cleanTitle(e.title);
    li.querySelector('.when').textContent = when;
    events.append(li);
  }
  $('status').innerHTML = board.status ? renderMarkdown(board.status) : '<p>Nothing logged.</p>';

  const g = board.ghost, ghost = $('ghost');
  if (!g?.next) { $('ghost-section').hidden = true; return; }
  $('ghost-section').hidden = false;
  const isDue = g.due > 0;
  ghost.innerHTML = `<div class="subject"></div><div class="q"></div><div class="due"></div>
    <button type="button" class="quiet">Answer it</button>`;
  ghost.querySelector('.subject').textContent = g.next.subject;
  ghost.querySelector('.q').textContent = g.next.q;
  ghost.querySelector('.due').textContent = isDue
    ? `${g.due} due now, ${g.total} in the deck`
    : `Next one due ${g.next.date}, ${g.total} in the deck`;
  ghost.querySelector('button').onclick = () => {
    input.value = `Ghost card (line ${g.next.line}), my answer: `;
    input.focus(); autosize();
  };
}

function paintSessionInfo() {
  const bits = [];
  if (sessionInfo.model) bits.push(`Model: ${sessionInfo.model}`);
  if (sessionInfo.style) bits.push(`Style: ${sessionInfo.style}`);
  if (sessionCost) bits.push(`This session: $${sessionCost.toFixed(2)}`);
  $('session-info').innerHTML = bits.map(b => `<div>${b}</div>`).join('');
}

// ---------------------------------------------------------------- composer

function autosize() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, innerHeight * 0.4) + 'px';
}
input.addEventListener('input', autosize);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); $('composer').requestSubmit(); }
  if (e.key === 'Escape' && busy) ws.send(JSON.stringify({ type: 'interrupt' }));
});
$('composer').addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text || ws?.readyState !== 1) return;
  ws.send(JSON.stringify({ type: 'send', text }));
  input.value = '';
  autosize();
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
      reply = null; thinkingEl = null; steps.clear(); sessionCost = 0;
      for (const e of ev.events) handle(e, false);
      if (reply) paintReply(false);
      endReply();
      setBusy(ev.busy, true);
      if (ev.board) paintBoard(ev.board);
      if (!stream.children.length) add(div('empty', 'The room is quiet. Say something.'));
      stream.scrollTop = stream.scrollHeight;
      return;
    }
    handle(ev, true);
  };
  ws.onclose = () => setTimeout(connect, 1500);
}
connect();
setInterval(() => ws?.readyState === 1 && ws.send(JSON.stringify({ type: 'board' })), 5 * 60000);
input.focus();
