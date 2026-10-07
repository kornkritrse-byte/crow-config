// Crow Room client. Talks to server.mjs over one WebSocket; the server owns the
// Claude Code session, this file only draws it.

const CREW = [
  { key: 'sol',   name: 'Sol',   tag: 'long game',    role: 'The long game: direction, meaning' },
  { key: 'persi', name: 'Persi', tag: 'executor',     role: 'The executor: what are we doing today' },
  { key: 'artis', name: 'Artis', tag: 'taste',        role: 'Taste: music, writing, content' },
  { key: 'vera',  name: 'Vera',  tag: 'mirror',       role: 'The mirror: what you are actually doing' },
  { key: 'vex',   name: 'Vex',   tag: 'devil’s adv.', role: 'Devil’s advocate: beat the plan up' },
];

// Shown when the room is empty, so the common openers are one click away.
const STARTERS = [
  'Read the sitrep',
  'Give me a task',
  'Drill me on BA202, one question at a time',
  'What’s the one thing that matters today?',
];

const $ = id => document.getElementById(id);
const stream = $('stream'), input = $('input'), sendBtn = $('send'), stopBtn = $('stop'), jump = $('jump');

let ws;
let busy = false;
let reply = null;          // { el, md } for the reply block being streamed
let thinkingEl = null;
let stepGroup = null;      // the <div class="steps"> collecting this run of tool steps
const steps = new Map();   // tool_use id → step element
let models = [];
let commands = [];
let pending = [];          // attachments waiting to be sent: { name, type, data, url }
let cawed = false;         // the nest crow caws once when a reply starts

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
  li.innerHTML = `<button type="button" title="${c.role}">${c.name}<small>${c.tag}</small></button>`;
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

// ---------------------------------------------------------------- rendering helpers

function atBottom() { return stream.scrollHeight - stream.scrollTop - stream.clientHeight < 80; }
// Instant, not the stream's CSS smooth scroll: a glide in flight swallows his wheel.
function toBottom(behavior = 'instant') { follow = true; stream.scrollTo({ top: stream.scrollHeight, behavior }); }
function add(el) {
  if (stream.querySelector('.empty')) { stream.querySelector('.empty').remove(); Room.setEmpty(false); }
  stream.append(el);
  if (!follow) jump.hidden = false;
  return el;
}
function div(cls, text) {
  const el = document.createElement('div');
  el.className = cls;
  if (text != null) el.textContent = text;
  return el;
}
function button(label, cls, onclick) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = cls || '';
  b.textContent = label;
  b.onclick = onclick;
  return b;
}

// Following = the view stays pinned to the newest line. Any move UP lets go at once
// (wheel, keys, touch, scrollbar); getting back near the bottom re-pins.
let follow = true, lastTop = 0, touchY = 0;
const letGo = () => { follow = false; };
stream.addEventListener('wheel', e => { if (e.deltaY < 0) letGo(); }, { passive: true });
stream.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
stream.addEventListener('touchmove', e => { if (e.touches[0].clientY > touchY) letGo(); }, { passive: true });
stream.addEventListener('keydown', e => { if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) letGo(); });
stream.addEventListener('scroll', () => {
  const top = stream.scrollTop, gap = stream.scrollHeight - top - stream.clientHeight;
  if (top < lastTop - 2 && gap > 2) letGo();        // dragged up (a shrink that clamps at the bottom isn't)
  else if (atBottom()) follow = true;
  lastTop = top;
  if (follow) jump.hidden = true;
  else if (gap > 80) jump.hidden = false;
});
// Anything that grows the stream (text, steps, outputs, the final paint) keeps it pinned.
let pinQueued = false;
new MutationObserver(() => {
  if (pinQueued) return;
  pinQueued = true;
  requestAnimationFrame(() => { pinQueued = false; if (follow) toBottom(); });
}).observe(stream, { childList: true, subtree: true, characterData: true });
jump.onclick = () => { toBottom('smooth'); jump.hidden = true; };

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
  mountMcq(reply.el, live && busy);
  reply.el.classList.toggle('cursor', live && busy);
}

// ---------------------------------------------------------------- MCQ cards

// Crow writes a ```mcq fence holding {"q", "options", "multi"?}; it becomes a card
// he ticks, adds a note to, and locks in. The pick goes back as an ordinary message,
// so Crow grades it in the conversation. Locked picks are kept per question in
// localStorage so a reload shows them locked (Korn's ask, 29 Sep).
const LETTERS = 'ABCDEFGHIJ';
function mcqKey(data) {
  let h = 0;
  for (const ch of data.q + '|' + data.options.join('|')) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return 'mcq:' + (h >>> 0).toString(36);
}
function mcqSaved(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
function mcqSave(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }
const inlineMd = s => DOMPurify.sanitize(marked.parseInline(String(s)));

function mountMcq(root, streaming) {
  for (const code of root.querySelectorAll('pre > code.language-mcq')) {
    const pre = code.parentElement;
    let data = null;
    try { data = JSON.parse(code.textContent); } catch {}
    if (data && (typeof data.q !== 'string' || !Array.isArray(data.options) || data.options.length < 2)) data = null;
    if (!data) {
      // Half-streamed JSON: a placeholder. Broken JSON in a finished reply stays as code.
      if (streaming) pre.replaceWith(div('mcq pending', 'question coming…'));
      continue;
    }
    pre.replaceWith(streaming ? div('mcq pending', 'question coming…') : mcqCard(data));
  }
}

function mcqCard(data) {
  const key = mcqKey(data), saved = mcqSaved(key);
  const el = div('mcq');
  const q = div('q'); q.innerHTML = renderMarkdown(data.q); el.append(q);
  if (data.multi) el.append(div('hint', 'Tick every one that applies'));
  const opts = document.createElement('div');
  opts.className = 'opts';
  const picked = new Set(saved?.picks || []);
  const rows = data.options.map((text, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.innerHTML = `<span class="box"></span><span class="letter">${LETTERS[i]}</span><span class="text">${inlineMd(text)}</span>`;
    b.onclick = () => {
      if (el.classList.contains('locked')) return;
      if (!data.multi) picked.clear();
      picked.has(i) ? picked.delete(i) : picked.add(i);
      paint();
    };
    opts.append(b);
    return b;
  });
  el.append(opts);
  const note = document.createElement('textarea');
  note.className = 'note';
  note.rows = 2;
  note.placeholder = 'Why this one? (optional, but it’s where the learning is)';
  note.value = saved?.note || '';
  const submit = button('Lock it in', 'submit', () => {
    if (!picked.size || ws?.readyState !== 1) return;
    const picks = [...picked].sort((a, b) => a - b);
    const lines = picks.map(i => `${LETTERS[i]}) ${data.options[i]}`);
    let text = `[MCQ] ${data.q.replace(/\s+/g, ' ').slice(0, 90)}${data.q.length > 90 ? '…' : ''}\nMy pick: ${lines.join(' · ')}`;
    if (note.value.trim()) text += `\nMy reasoning: ${note.value.trim()}`;
    if (!sendMessage(text, [])) return;
    mcqSave(key, { picks, note: note.value.trim() });
    lock();
  });
  const foot = div('foot');
  foot.append(note, submit);
  el.append(foot);

  function paint() {
    rows.forEach((b, i) => b.classList.toggle('on', picked.has(i)));
    submit.disabled = !picked.size;
  }
  function lock() {
    el.classList.add('locked');
    note.readOnly = true;
    submit.textContent = 'Locked in';
    submit.disabled = true;
    rows.forEach(b => { b.disabled = true; });
    if (!note.value.trim()) note.hidden = true;
  }
  paint();
  if (saved) lock();
  return el;
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

// ---------------------------------------------------------------- tool steps

// A run of tool steps is one group. While Crow works every step shows; once the
// turn moves on, a run of more than three folds into one line you can open.
function endSteps() {
  if (!stepGroup) return;
  const n = stepGroup.querySelectorAll(':scope > .list > .step').length;
  if (n > 3) {
    stepGroup.classList.add('folded');
    stepGroup.querySelector('.fold').textContent = `${n} steps`;
  }
  stepGroup = null;
}

const VERBS = {
  Read: 'reading', Write: 'writing', Edit: 'editing', MultiEdit: 'editing', NotebookEdit: 'editing',
  Bash: 'running', Grep: 'searching', Glob: 'looking for', WebFetch: 'fetching',
  WebSearch: 'searching the web for', Skill: 'loading skill', Agent: 'briefing', Task: 'briefing',
  ToolSearch: 'loading tools', TodoWrite: 'updating the plan', TaskCreate: 'adding task',
  TaskUpdate: 'updating task', ExitPlanMode: 'presenting the plan',
};
function verbFor(name) {
  if (VERBS[name]) return VERBS[name];
  const mcp = name.match(/^mcp__(.+?)__(.+)$/);
  if (mcp) return `${mcp[2].replace(/_/g, ' ')} (${mcp[1].replace(/^claude_ai_/, '').replace(/_/g, ' ')})`;
  return name;
}
function shortPath(s) { return String(s).replace(/\/Users\/[^/\s]+/g, '~'); }

// Before/after for an edit: removed lines, then added lines.
function renderDiff(diff) {
  const box = div('diff');
  const lines = (text, cls, sign) => {
    for (const line of text.split('\n')) box.append(Object.assign(div(`ln ${cls}`), { textContent: `${sign} ${line}` }));
  };
  if (diff.old != null) lines(diff.old, 'del', '−');
  lines(diff.new, 'ins', '+');
  return box;
}

function makeStep(ev) {
  const el = document.createElement('details');
  el.className = 'step running';
  el.innerHTML = `<summary><span class="verb"></span><span class="what"></span></summary><div class="body"></div>`;
  el.querySelector('.verb').textContent = verbFor(ev.name);
  el.querySelector('.what').textContent = shortPath(ev.input || '');
  el.querySelector('summary').title = ev.input || '';
  if (ev.diff) {
    el.classList.add('has-diff');
    el.querySelector('.body').append(renderDiff(ev.diff));
  }
  if (ev.name === 'Agent' || ev.name === 'Task') el.querySelector('.body').append(div('sub'));
  steps.set(ev.id, el);
  return el;
}

function addStep(ev) {
  const el = makeStep(ev);
  // A subagent's own tool calls go inside the step that launched it.
  const parent = ev.parent && steps.get(ev.parent);
  if (parent) {
    (parent.querySelector(':scope > .body > .sub') || parent.querySelector(':scope > .body')).append(el);
    return;
  }
  if (!stepGroup) {
    stepGroup = div('steps');
    const group = stepGroup;
    stepGroup.append(button('', 'fold', () => group.classList.toggle('open')), div('list'));
    add(stepGroup);
  }
  stepGroup.querySelector('.list').append(el);
}

function finishStep(ev) {
  const el = steps.get(ev.id);
  if (!el) return;
  el.classList.remove('running');
  if (ev.error) el.classList.add('failed');
  const body = el.querySelector(':scope > .body');
  if (ev.output && ev.output.trim()) {
    const out = document.createElement('pre');
    out.className = 'output';
    out.textContent = shortPath(ev.output);
    // An edit's diff says it all unless it failed; a subagent's report goes after its steps.
    if (el.classList.contains('has-diff')) { if (ev.error) body.append(out); }
    else if (body.querySelector(':scope > .sub')) body.append(out);
    else body.prepend(out);
  }
  if (!body.children.length) el.classList.add('empty-body');
}

// ---------------------------------------------------------------- events

function handle(ev, live = true) {
  switch (ev.type) {
    case 'session':
      if (ev.state === 'new' && live) { stream.innerHTML = ''; Room.newSession(); showEmpty(); }
      break;
    case 'user':
      endReply(); endSteps(); clearThinking();
      add(userMessage(ev));
      if (live) { toBottom(); exitHome(); Nest.react(ev.text); cawed = false; }
      break;
    case 'busy':
      setBusy(ev.busy, live);
      break;
    case 'thinking':
      if (live) showThinking();
      break;
    case 'text_start':
      if (live && !cawed) { Nest.play('caw'); cawed = true; }
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
    case 'tool':
      endReply(); clearThinking();
      addStep(ev);
      break;
    case 'tool_done':
      finishStep(ev);
      if (live && busy && !stream.querySelector('.step.running')) showThinking();
      break;
    case 'command_output': {
      endReply(); endSteps(); clearThinking();
      const pre = document.createElement('pre');
      pre.className = 'command-output';
      pre.textContent = ev.text;
      add(pre);
      break;
    }
    case 'permission':
      endReply(); endSteps(); clearThinking();
      add(permissionCard(ev, live));
      if (live) Room.setMode('waiting');
      break;
    case 'permission_done': {
      const el = stream.querySelector(`.permission[data-id="${ev.id}"]`);
      if (el && !el.classList.contains('done')) {
        el.classList.add('done');
        el.querySelector('.ask').textContent += ev.allow ? (ev.always ? ': always allowed' : ': allowed') : ': declined';
      }
      Room.setMode(busy ? 'thinking' : 'idle');
      break;
    }
    case 'rewind_preview':
    case 'rewound':
      if (ev.type === 'rewound') stream.querySelector(`.rewind-card[data-uuid="${ev.uuid}"]:not(.done)`)?.remove();
      add(rewindCard(ev));
      break;
    case 'result':
      endReply(); endSteps(); clearThinking();
      for (const el of stream.querySelectorAll('.step.running')) el.classList.remove('running');
      if (ev.interrupted) add(div('meta', 'Stopped.'));
      else if (!ev.ok) add(div('error', `The turn ended early (${ev.error || 'error'}).`));
      break;
    case 'error':
      endReply(); endSteps(); clearThinking();
      add(div('error', ev.text));
      if (live) Nest.play('startle');
      break;
    case 'board': paintBoard(ev.board); break;
    case 'model': paintModel(ev); break;
    case 'mode': paintMode(ev.value); break;
    case 'todos': paintTodos(ev.todos); break;
    case 'commands': commands = ev.commands || []; break;
    case 'files': showFileMatches(ev); break;
  }
}

function userMessage(ev) {
  const el = div('you');
  if (ev.ts) el.append(div('ts', clockTime(ev.ts)));
  if (ev.files?.length) {
    const row = div('files');
    for (const f of ev.files) {
      if (f.preview) row.append(Object.assign(document.createElement('img'), { src: f.preview, alt: f.name, title: f.name }));
      else row.append(div(`file-chip ${f.kind}`, f.name));
    }
    el.append(row);
  }
  if (ev.text) el.append(document.createTextNode(ev.text));
  if (ev.uuid) {
    el.dataset.uuid = ev.uuid;
    el.append(button('Rewind files to here', 'rewind', () => ws.send(JSON.stringify({ type: 'rewind', uuid: ev.uuid }))));
  }
  return el;
}

function permissionCard(ev, live) {
  const el = div('permission');
  el.dataset.id = ev.id;
  if (ev.plan) {
    el.classList.add('plan');
    el.append(div('ask', 'Crow’s plan. Build it?'));
    const plan = div('plan-body');
    plan.innerHTML = renderMarkdown(ev.plan);
    el.append(plan);
  } else {
    el.append(div('ask', `Crow wants to use ${ev.tool}`), div('what', shortPath(ev.input || '')));
  }
  const actions = div('actions');
  const say = (allow, always) => ws.send(JSON.stringify({ type: 'permission', id: ev.id, allow, always }));
  actions.append(button(ev.plan ? 'Build it' : 'Allow', 'allow', () => say(true, false)));
  if (ev.canAlways && !ev.plan) actions.append(button('Always allow this', '', () => say(true, true)));
  actions.append(button(ev.plan ? 'Keep planning' : 'Deny', '', () => say(false, false)));
  el.append(actions);
  if (live) setTimeout(() => actions.querySelector('.allow')?.focus(), 0);
  return el;
}

function rewindCard(ev) {
  const el = div('permission rewind-card');
  el.dataset.uuid = ev.uuid;
  if (!ev.canRewind) {
    el.append(div('ask', ev.error ? `Can’t rewind: ${ev.error}` : 'Nothing to rewind: no files changed after that message.'));
    return el;
  }
  const files = ev.files.length ? ev.files.join('\n') : '(no files)';
  if (ev.type === 'rewound') {
    el.classList.add('done');
    el.append(div('ask', `Rewound ${ev.files.length} file${ev.files.length === 1 ? '' : 's'}.`), div('what', files));
    return el;
  }
  el.append(
    div('ask', `Rewind ${ev.files.length} file${ev.files.length === 1 ? '' : 's'} to how they were at that message? (+${ev.insertions} / −${ev.deletions} lines undone)`),
    div('what', files),
  );
  const actions = div('actions');
  actions.append(
    button('Rewind', 'allow', () => { ws.send(JSON.stringify({ type: 'rewind', uuid: ev.uuid, confirm: true })); el.remove(); }),
    button('Cancel', '', () => el.remove()),
  );
  el.append(actions);
  el.append(div('note', 'Only files change. The conversation stays as it is.'));
  return el;
}

function setBusy(b, live = true) {
  busy = b;
  sendBtn.hidden = b;
  stopBtn.hidden = !b;
  Room.setMode(b ? (stream.querySelector('.permission:not(.done)') ? 'waiting' : 'thinking') : 'idle');
  if (!b) { if (reply && live) paintReply(false); clearThinking(); }
  else if (live) showThinking();
}

// An empty room shows the room itself: Korn's desk at night, drawn in pixels.
function roomScene(before) {
  return Room.emptyScene({
    starters: STARTERS,
    onStarter: s => { before?.(); sendMessage(s, []); },
    onLamp: () => Room.toggleDim(),
    onFlower: () => {
      const sec = $('water-section');
      sec.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      sec.classList.add('flash'); setTimeout(() => sec.classList.remove('flash'), 1400);
    },
    onMonitor: () => $('new-session').click(),
    onCrew: name => { before?.(); callCrew(name); },
  });
}
function showEmpty() {
  if (stream.children.length) { Room.setEmpty(false); return; }
  stream.append(roomScene());
  Room.setEmpty(true);
}

// Home: the room over the top of the conversation, which stays where it is.
let homeEl = null;
function goHome() {
  if (homeEl) return exitHome();
  if (stream.querySelector(':scope > .empty')) return;          // already looking at the room
  homeEl = div('home-view');
  homeEl.style.height = stream.clientHeight + 'px';
  document.querySelector('.talk').append(homeEl);
  homeEl.append(roomScene(exitHome));
  Room.setEmpty(true);
  $('home').setAttribute('aria-pressed', 'true');
  $('home').title = 'Back to the conversation';
}
function exitHome() {
  if (!homeEl) return;
  homeEl.remove();
  homeEl = null;
  Room.setEmpty(!!stream.querySelector(':scope > .empty'));
  $('home').setAttribute('aria-pressed', 'false');
  $('home').title = 'Home: back to the room (the conversation stays)';
}
$('home').onclick = goHome;

// ---------------------------------------------------------------- task list

function paintTodos(list = []) {
  const box = $('todos');
  const open = list.filter(t => t.status !== 'completed');
  if (!list.length || !open.length) { box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  box.innerHTML = '';
  const done = list.length - open.length;
  box.append(div('todos-head', `Crow’s list: ${done} of ${list.length} done`));
  const ul = document.createElement('ul');
  for (const t of list) {
    const li = document.createElement('li');
    li.className = t.status;
    li.textContent = t.text;
    ul.append(li);
  }
  box.append(ul);
}

// ---------------------------------------------------------------- board

const bkk = { timeZone: 'Asia/Bangkok' };
function clockTime(ts) { return new Date(ts).toLocaleTimeString('en-GB', { ...bkk, hour: '2-digit', minute: '2-digit' }); }
function shortDay(date) {
  return new Date(date + 'T00:00:00+07:00').toLocaleDateString('en-GB', { ...bkk, weekday: 'short', day: 'numeric', month: 'short' });
}
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
    .split(/\s+[—·→]\s+|[.;,]\s+/)[0]  // heading only; the details stay in the tooltip
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
    const days = e.days === 0 ? 'today' : e.days === 1 ? '1<small>day</small>' : `${e.days}<small>days</small>`;
    li.innerHTML = `<span class="title"></span><span class="days">${days}</span><span class="when"></span>`;
    li.querySelector('.title').textContent = title;
    li.title = e.title;
    li.querySelector('.when').textContent = time ? `${shortDay(e.date)}, ${time}` : shortDay(e.date);
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

  paintWater(board);
}

// Water the flower: today's tasks. A ghost card passed, a training session done, a
// said/did kept: each one waters the plum blossom (server + bin/water.py).
function paintWater(board) {
  if (goalAnims) { heldBoard = board; return; }   // a goal card is mid-animation: repaint after
  const w = board.water || { week: 0, tasks: [] }, g = board.ghost;
  Room.setWater(w);
  const gl = w.goals;
  $('water-count').textContent = !gl ? `${w.week} this week` : gl.closed ? 'day closed' : gl.total ? `${gl.done} of ${gl.total} today` : 'no goals yet';
  const box = $('water-tasks');
  box.innerHTML = '';
  const card = (label, text, action) => {
    const el = div('task');
    el.append(div('task-label', label), div('task-text', text));
    if (action) el.append(action);
    box.append(el);
  };
  // today's goals first: one blossom each
  if (gl && !gl.closed) for (const goal of gl.list) box.append(goalCard(goal));
  for (const t of w.tasks) {
    if (t.kind === 'ghost' && g?.next) {
      card(`Task · ${g.next.subject}`, g.next.q, button('Answer it', 'quiet', () => {
        exitHome(); input.value = `Task #${g.next.line}, my answer: `; input.focus(); autosize();
      }));
    } else if (t.kind === 'training') {
      const b = button(t.done ? 'Done ✓' : 'Done', t.done ? 'quiet done' : 'quiet', () => { b.disabled = true; ws.send(JSON.stringify({ type: 'water', kind: 'training', id: t.id })); });
      b.disabled = !!t.done;
      card('Training · today', t.text, b);
    } else if (t.kind === 'ledger') {
      const b = button('Kept it', 'quiet', () => { b.disabled = true; ws.send(JSON.stringify({ type: 'water', kind: 'ledger', id: t.id })); });
      card(`Said/did · due ${shortDay(t.due)}`, t.text, b);
    }
  }
  if (!box.children.length) {
    const next = g?.next ? `Next task: ${shortDay(g.next.date)}.` : '';
    box.append(div('task-empty', `Nothing due right now. ${next}`.trim()));
  }
}

// Goal cards. Tap Done: a water ripple from the middle, then it completes.
// Drag the grip on the right edge (or hold anywhere, then swipe): left = dismissed (the card disintegrates), right = unknown (it
// fogs over). Both stay on the board for the day as a quiet remnant. Never "failed":
// his call, 7 Oct, no negative reinforcement.
let goalAnims = 0, heldBoard = null;
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const GOAL_END = { done: 'Done ✓', missed: 'Dismissed', unknown: 'Unknown' };

function goalCard(goal) {
  const wrap = div('task-swipe'), el = div('task goal');
  wrap.append(div('swipe-hint unknown', 'Unknown'), div('swipe-hint dismiss', 'Dismiss'), el);
  el.append(div('task-label', goal.slot ? 'Goal · today' : 'Goal · checked tomorrow'), div('task-text', goal.text));
  if (goal.status !== 'open') { settleLook(el, goal.status); return wrap; }
  if (!goal.slot) return wrap;   // Bed by 23:30 is settled at the next session
  const b = button('Done', 'quiet', () => {
    b.disabled = true;
    ws.send(JSON.stringify({ type: 'water', kind: 'goal', id: goal.n }));
    animateGoal(ripple(el), el, 'done');
  });
  el.append(b, Object.assign(div('grip'), { title: 'Drag: ← dismiss · unknown →' }));
  swipeable(wrap, el, status => {
    ws.send(JSON.stringify({ type: 'goal', id: goal.n, status }));
    animateGoal(status === 'missed' ? disintegrate(el) : fog(el), el, status);
  });
  return wrap;
}

function settleLook(el, status) {
  el.classList.add(`is-${status}`);
  el.style.transform = '';
  el.querySelector('.task-label').textContent = GOAL_END[status];
  el.querySelector('button')?.remove();
  el.querySelector('.grip')?.remove();
  if (status === 'done') el.append(Object.assign(button('Done ✓', 'quiet done'), { disabled: true }));
}

// Hold the board still while a card animates, then land the card and let any repaint through.
async function animateGoal(anim, el, status) {
  goalAnims++;
  try { await anim; } catch {}
  settleLook(el, status);
  el.style.visibility = '';
  if (status !== 'done' && !calm()) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: 'ease-out' });
  if (--goalAnims === 0 && heldBoard) { const b = heldBoard; heldBoard = null; paintWater(b); }
}

function swipeable(wrap, el, commit) {
  let id = null, x0 = 0, y0 = 0, dx = 0, armed = false, timer;
  const limit = () => Math.min(110, el.offsetWidth * 0.35);
  const reset = () => { clearTimeout(timer); id = null; armed = false; wrap.classList.remove('held', 'past'); delete wrap.dataset.dir; };
  el.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button') || el.classList.contains('settling')) return;
    id = e.pointerId; x0 = e.clientX; y0 = e.clientY; dx = 0;
    const arm = () => { armed = true; el.setPointerCapture(id); wrap.classList.add('held'); };
    if (e.target.closest('.grip')) arm();   // the grip drags at once; the rest of the card needs a hold
    else timer = setTimeout(arm, 220);
  });
  el.addEventListener('pointermove', e => {
    if (e.pointerId !== id) return;
    if (!armed) { if (Math.hypot(e.clientX - x0, e.clientY - y0) > 8) reset(); return; }
    dx = e.clientX - x0;
    el.style.transform = `translateX(${dx}px)`;
    wrap.dataset.dir = dx < -12 ? 'left' : dx > 12 ? 'right' : '';
    wrap.classList.toggle('past', Math.abs(dx) > limit());
  });
  const end = e => {
    if (e.pointerId !== id) return;
    const go = armed && e.type === 'pointerup' && Math.abs(dx) > limit();
    reset();
    if (go) { el.classList.add('settling'); commit(dx < 0 ? 'missed' : 'unknown'); return; }
    if (dx && !calm()) el.animate([{ transform: el.style.transform }, { transform: 'translateX(0)' }], { duration: 220, easing: 'cubic-bezier(.3,1.4,.5,1)' });
    el.style.transform = '';
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

// Water ripple: rings out from the middle of the card.
function ripple(el) {
  if (calm()) return Promise.resolve();
  const r = Math.hypot(el.offsetWidth, el.offsetHeight);
  const rings = [0, 140, 280].map((delay, i) => {
    const ring = div(i ? 'ripple ring' : 'ripple');
    Object.assign(ring.style, { width: `${r}px`, height: `${r}px`, left: `${(el.offsetWidth - r) / 2}px`, top: `${(el.offsetHeight - r) / 2}px` });
    el.append(ring);
    return ring.animate(
      [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1.05)', opacity: 0 }],
      { duration: 1000, delay, easing: 'cubic-bezier(.2,.6,.3,1)' }).finished.finally(() => ring.remove());
  });
  return Promise.all(rings);
}

// Disintegrate: the card is cut into ~3px grains spread over a stack of masked
// copies; each copy drifts off on the wind a beat after the last, left side first.
function disintegrate(el) {
  if (calm()) return Promise.resolve();
  const rect = el.getBoundingClientRect(), W = Math.ceil(rect.width), H = Math.ceil(rect.height);
  const LAYERS = 28, GRAIN = 3;
  const masks = Array.from({ length: LAYERS }, () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; });
  const ctx = masks.map(c => c.getContext('2d'));
  for (let x = 0; x < W; x += GRAIN) for (let y = 0; y < H; y += GRAIN) {
    const t = Math.min(0.999, (x / W) * 0.65 + Math.random() * 0.35);
    ctx[Math.floor(t * LAYERS)].fillRect(x, y, GRAIN, GRAIN);
  }
  const anims = masks.map((c, i) => {
    const copy = el.cloneNode(true), url = `url(${c.toDataURL()})`;
    Object.assign(copy.style, {
      position: 'fixed', left: `${rect.left}px`, top: `${rect.top}px`, width: `${W}px`, height: `${H}px`,
      margin: 0, transform: 'none', pointerEvents: 'none', zIndex: 1000,
      maskImage: url, webkitMaskImage: url, maskSize: `${W}px ${H}px`, webkitMaskSize: `${W}px ${H}px`,
    });
    document.body.append(copy);
    const a = (Math.random() - 0.3) * Math.PI / 2.5;   // mostly up and to the right
    const dist = 60 + Math.random() * 90;
    return copy.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1, filter: 'blur(0)' },
      { transform: `translate(${Math.cos(a) * dist}px, ${-Math.abs(Math.sin(a)) * dist - 20}px) rotate(${(Math.random() - 0.5) * 30}deg)`, opacity: 0, filter: 'blur(1.5px)' },
    ], { duration: 900 + Math.random() * 500, delay: i * 38, easing: 'cubic-bezier(.45,0,.75,.6)', fill: 'forwards' })
      .finished.finally(() => copy.remove());
  });
  el.style.visibility = 'hidden';
  return Promise.all(anims);
}

// Unknown: no drama, it just fogs over.
function fog(el) {
  if (calm()) return Promise.resolve();
  return el.animate([
    { transform: el.style.transform, filter: 'blur(0)', opacity: 1 },
    { transform: 'translateX(0)', filter: 'blur(4px)', opacity: 0 },
  ], { duration: 650, easing: 'ease-in' }).finished.then(() => { el.style.visibility = 'hidden'; });
}

$('status-more').onclick = () => {
  const open = $('status').classList.toggle('clamped');
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

function paintMode(value) {
  for (const b of document.querySelectorAll('.segmented button')) {
    const on = (b.dataset.mode === 'plan') === (value === 'plan');
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  }
  document.body.classList.toggle('planning', value === 'plan');
  input.placeholder = value === 'plan'
    ? 'Plan first: nothing changes until you approve'
    : 'Talk to Crow. Type / for commands, @ for files';
}
for (const b of document.querySelectorAll('.segmented button')) {
  b.onclick = () => ws.send(JSON.stringify({ type: 'mode', value: b.dataset.mode }));
}

// ---------------------------------------------------------------- attachments

const IMAGE = /^image\/(png|jpeg|gif|webp)$/;
function addFiles(fileList) {
  for (const file of fileList) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result).split(',')[1] || '';
      pending.push({ name: file.name || 'pasted image', type: file.type, data, url: IMAGE.test(file.type) ? reader.result : null });
      paintPending();
    };
    reader.readAsDataURL(file);
  }
}
function paintPending() {
  const box = $('attachments');
  box.hidden = !pending.length;
  box.innerHTML = '';
  pending.forEach((f, i) => {
    const chip = div('attached');
    if (f.url) chip.append(Object.assign(document.createElement('img'), { src: f.url, alt: '' }));
    chip.append(div('name', f.name));
    chip.append(button('×', 'remove', () => { pending.splice(i, 1); paintPending(); }));
    chip.lastChild.setAttribute('aria-label', `Remove ${f.name}`);
    box.append(chip);
  });
}
$('attach').onclick = () => $('file-input').click();
$('file-input').onchange = e => { addFiles(e.target.files); e.target.value = ''; };
input.addEventListener('paste', e => {
  const files = [...(e.clipboardData?.files || [])];
  if (files.length) { e.preventDefault(); addFiles(files); }
});
const talk = document.querySelector('.talk');
talk.addEventListener('dragover', e => { e.preventDefault(); talk.classList.add('dropping'); });
talk.addEventListener('dragleave', e => { if (!talk.contains(e.relatedTarget)) talk.classList.remove('dropping'); });
talk.addEventListener('drop', e => {
  e.preventDefault();
  talk.classList.remove('dropping');
  if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
});

// ---------------------------------------------------------------- / and @ menus

const popup = $('popup');
let menu = null;           // { kind: 'command' | 'file', items, index, start }

function currentToken() {
  const upto = input.value.slice(0, input.selectionStart);
  const cmd = upto.match(/^\/([\w:-]*)$/);
  if (cmd) return { kind: 'command', q: cmd[1], start: 0 };
  const at = upto.match(/(^|\s)@([^\s@]*)$/);
  if (at) return { kind: 'file', q: at[2], start: upto.length - at[2].length - 1 };
  return null;
}

function updateMenu() {
  const tok = currentToken();
  if (!tok) return closeMenu();
  if (tok.kind === 'command') {
    const q = tok.q.toLowerCase();
    const items = commands.filter(c => c.name.toLowerCase().includes(q))
      .sort((a, b) => (b.name.startsWith(q) - a.name.startsWith(q)))
      .slice(0, 10)
      .map(c => ({ value: `/${c.name} `, label: `/${c.name}`, note: c.description }));
    openMenu('command', items, tok.start);
  } else {
    ws.send(JSON.stringify({ type: 'files', q: tok.q }));
    menu = { ...(menu || {}), kind: 'file', start: tok.start, waiting: tok.q };
  }
}
function showFileMatches(ev) {
  if (menu?.kind !== 'file' || menu.waiting !== ev.q) return;
  openMenu('file', ev.files.map(f => ({ value: `@${f.path} `, label: f.label })), menu.start);
}
function openMenu(kind, items, start) {
  if (!items.length) return closeMenu();
  menu = { kind, items, index: 0, start };
  popup.innerHTML = '';
  items.forEach((it, i) => {
    const row = div(`opt${i === 0 ? ' active' : ''}`);
    row.setAttribute('role', 'option');
    row.append(div('label', it.label));
    if (it.note) row.append(div('note', it.note));
    row.onmousedown = e => { e.preventDefault(); pick(i); };
    popup.append(row);
  });
  popup.hidden = false;
}
function closeMenu() { menu = null; popup.hidden = true; }
function moveMenu(d) {
  if (!menu?.items) return;
  menu.index = (menu.index + d + menu.items.length) % menu.items.length;
  [...popup.children].forEach((r, i) => r.classList.toggle('active', i === menu.index));
  popup.children[menu.index]?.scrollIntoView({ block: 'nearest' });
}
function pick(i) {
  const it = menu.items[i];
  const end = input.selectionStart;
  input.value = input.value.slice(0, menu.start) + it.value + input.value.slice(end);
  const pos = menu.start + it.value.length;
  input.setSelectionRange(pos, pos);
  closeMenu();
  input.focus();
  autosize();
}

// ---------------------------------------------------------------- composer

function autosize() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, innerHeight * 0.4) + 'px';
}
function sendMessage(text, files) {
  if ((!text.trim() && !files.length) || ws?.readyState !== 1) return false;
  ws.send(JSON.stringify({ type: 'send', text: text.trim(), files: files.map(({ name, type, data }) => ({ name, type, data })) }));
  return true;
}
input.addEventListener('input', () => { autosize(); updateMenu(); });
input.addEventListener('click', updateMenu);
input.addEventListener('blur', () => setTimeout(closeMenu, 100));
input.addEventListener('keydown', e => {
  if (menu?.items && !popup.hidden) {
    if (e.key === 'ArrowDown') { e.preventDefault(); return moveMenu(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); return moveMenu(-1); }
    if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) { e.preventDefault(); return pick(menu.index); }
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); return closeMenu(); }
  }
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); $('composer').requestSubmit(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && busy && popup.hidden) ws.send(JSON.stringify({ type: 'interrupt' }));
  else if (e.key === 'Escape' && homeEl) exitHome();
});
$('composer').addEventListener('submit', e => {
  e.preventDefault();
  if (sendMessage(input.value, pending)) {
    input.value = '';
    pending = [];
    paintPending();
    autosize();
  }
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
      paintMode(ev.mode);
      paintTodos(ev.todos);
      commands = ev.commands || [];
      showEmpty();
      toBottom();
      return;
    }
    handle(ev, true);
  };
  ws.onclose = () => setTimeout(connect, 1500);
}
Room.init();
connect();
setInterval(() => ws?.readyState === 1 && ws.send(JSON.stringify({ type: 'board' })), 5 * 60000);
input.focus();
