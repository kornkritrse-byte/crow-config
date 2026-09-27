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
let stepGroup = null;      // the <div class="steps"> collecting this run of tool steps
const steps = new Map();   // tool_use id → step element
let models = [];
let commands = [];
let pending = [];          // attachments waiting to be sent: { name, type, data, url }

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
function toBottom() { stream.scrollTop = stream.scrollHeight; }
function add(el) {
  const stick = atBottom();
  if (stream.querySelector('.empty')) { stream.querySelector('.empty').remove(); Room.setEmpty(false); }
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
function button(label, cls, onclick) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = cls || '';
  b.textContent = label;
  b.onclick = onclick;
  return b;
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
  const stick = atBottom();
  stepGroup.querySelector('.list').append(el);
  if (stick) toBottom();
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
      if (live) toBottom();
      break;
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
function showEmpty() {
  if (stream.children.length) { Room.setEmpty(false); return; }
  stream.append(Room.emptyScene({
    starters: STARTERS,
    onStarter: s => sendMessage(s, []),
    onLamp: () => Room.toggleDim(),
    onFlower: () => sendMessage('Serve me the ghost card', []),
    onMonitor: () => $('new-session').click(),
    onCrew: name => callCrew(name),
  }));
  Room.setEmpty(true);
}

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

  Room.setGhost(board.ghost);
  const g = board.ghost, ghost = $('ghost');
  if (!g?.next) { $('ghost-section').hidden = true; return; }
  $('ghost-section').hidden = false;
  ghost.innerHTML = '';
  ghost.append(
    div('subject', g.next.subject),
    div('q', g.next.q),
    div('due', g.due > 0 ? `${g.due} due now, ${g.total} in the deck` : `Next one due ${shortDay(g.next.date)}, ${g.total} in the deck`),
    button('Answer it', 'quiet', () => { input.value = `Ghost card (line ${g.next.line}), my answer: `; input.focus(); autosize(); }),
  );
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
