// Crow's nest: a small crow living next to the clock. He idles, preens, hops,
// stretches, pecks, steals shiny things, sleeps at night, reacts to what Korn
// types, and follows the turn: beak-tapping while Crow thinks, a raised wing
// while a permission card waits, a caw when the reply starts.
(function (root) {
  "use strict";
  const { PX, C, bayer, rng } = root.PXL;
  const W = 44, H = 30;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = { get: (k) => { try { return localStorage.getItem("room:" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("room:" + k, v); } catch { /* private window */ } } };

  const K = {
    crow: C("#0b0c11"), sheen: C("#2a2440"), sheen2: C("#3a3058"), rim: C("#4a5670"), beak: C("#2e2e36"), eye: C("#f2efe8"),
    twig: C("#5a3a22"), twig2: C("#7a5230"), twigD: C("#3a2414"), leaf: C("#3a6a3a"), leaf2: C("#4f8a4a"),
    gold: C("#f2c84a"), gold2: C("#fff0a8"), bubble: C("#f2efe8"), ink: C("#141820"), note: C("#c8d8f0"), z: C("#b8c8e8"),
    book: C("#c02838"), page: C("#f0e8d8"),
  };
  const SKY = {
    night: ["#0b1322", "#15223a", "#e8e0c0"], dawn: ["#2a2c4c", "#a8607a", "#f4c890"],
    day: ["#4f86bc", "#8cb6d8", "#fff4c0"], dusk: ["#2e2450", "#c0644a", "#f8c070"],
  };
  const bkkHour = () => +new Date().toLocaleString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", hour12: false }) % 24;

  // ---------------------------------------------------------------- 3×5 glyphs for the speech bubble
  const G = {
    "?": ["111", "001", "011", "000", "010"], "!": ["010", "010", "010", "000", "010"],
    z: ["111", "001", "010", "100", "111"], h: ["101", "101", "111", "101", "101"], a: ["010", "101", "111", "101", "101"],
    n: ["011", "010", "010", "110", "110"], "♥": ["101", "111", "111", "010", "000"], ".": ["000", "000", "000", "000", "010"],
  };
  function glyph(b, ch, x, y, c) { if (ch === " ") return; (G[ch] || G["?"]).forEach((row, j) => [...row].forEach((v, i) => { if (v === "1") b.set(x + i, y + j, c); })); }
  function bubble(b, x, y, text) {
    const w = text.length * 4 + 3;
    b.rect(x, y, w, 8, K.bubble); b.set(x, y, 0); b.set(x + w - 1, y, 0); b.set(x, y + 7, 0); b.set(x + w - 1, y + 7, 0);
    b.set(x + 1, y + 8, K.bubble);
    [...text].forEach((ch, i) => glyph(b, ch, x + 2 + i * 4, y + 2 - (ch === "." ? 1 : 0), K.ink));
  }

  // ---------------------------------------------------------------- the crow, posable. p = pose, facing right before mirroring
  function crowSprite(p) {
    const s = new PX(26, 22);
    const bx = 11, by = 13 + (p.bob || 0);
    const puff = p.puff ? 1 : 0;
    // tail
    s.poly([[bx - 4, by - 1], [bx - 11, by + 2], [bx - 10, by + 4], [bx - 3, by + 3]], K.crow);
    s.set(bx - 10, by + 2, K.sheen);
    // far wing when spread
    if (p.wing === 2) s.poly([[bx + 1, by - 2], [bx + 4, by - 11], [bx + 6, by - 10], [bx + 3, by]], K.crow);
    // body
    s.ellipse(bx, by, 6.5 + puff, 4.5 + puff, K.crow);
    // head
    const hp = { normal: [bx + 5, by - 4], up: [bx + 5, by - 6], down: [bx + 6, by], tuck: [bx + 3, by - 3], tilt: [bx + 5, by - 4] }[p.head || "normal"];
    s.ellipse(hp[0], hp[1], 3.4 + puff * 0.3, 3.2, K.crow);
    // beak
    const [hx, hy] = hp;
    if (p.head === "tuck") { /* beak tucked into the wing */ }
    else if (p.head === "down") s.poly([[hx + 2, hy], [hx + 4, hy + 4], [hx + 1, hy + 2]], K.beak);
    else if (p.beak) { s.poly([[hx + 2.5, hy - 1.5], [hx + 7, hy - 1], [hx + 2.5, hy + 0.2]], K.beak); s.poly([[hx + 2.5, hy + 1], [hx + 6, hy + 3], [hx + 2.5, hy + 2]], K.beak); }
    else if (p.head === "tilt") s.poly([[hx + 2.5, hy - 0.5], [hx + 6.5, hy + 1.5], [hx + 2.5, hy + 1.5]], K.beak);
    else s.poly([[hx + 2.5, hy - 1], [hx + 7, hy + 0.2], [hx + 2.5, hy + 1.2]], K.beak);
    // eye
    if (p.eye !== "closed" && p.head !== "tuck") { s.set(hx + 1, hy - 1, K.eye); if (p.eye === "wide") s.set(hx + 1, hy - 2, K.eye); }
    else if (p.head !== "tuck") s.set(hx + 1, hy, K.sheen2);
    // near wing
    if (!p.wing) { s.ellipse(bx - 1, by, 4.2, 2.6, K.sheen); s.hline(bx - 4, bx + 1, by + 1, K.sheen2); }
    else if (p.wing === 1) s.poly([[bx - 2, by - 1], [bx - 6, by - 9], [bx - 4, by - 10], [bx + 2, by - 2]], K.sheen);
    else s.poly([[bx - 2, by - 1], [bx - 10, by - 10], [bx - 7, by - 12], [bx + 2, by - 2]], K.sheen);
    // cool rim light so the silhouette reads against the sky
    for (let y = 1; y < s.h; y++) for (let x = 0; x < s.w; x++) if (s.get(x, y) && !s.get(x, y - 1) && (x + y) % 2 === 0) s.set(x, y, K.rim);
    return s;
  }
  function blitFlip(b, src, dx, dy, flip) {
    for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) { const c = src.d[y * src.w + x]; if (c) b.set(dx + (flip ? src.w - 1 - x : x), dy + y, c); }
  }

  // ---------------------------------------------------------------- behaviours: t → { pose, fx }
  const B = {
    idle: { dur: Infinity, f: (t) => ({ bob: t % 30 < 15 ? 0 : 1, eye: t % 53 < 2 ? "closed" : "open" }) },
    think: { dur: Infinity, f: (t) => ({ head: t % 12 < 6 ? "tilt" : t % 12 === 9 ? "down" : "normal", fx: [["dots", 1 + (Math.floor(t / 5) % 3)]] }) },
    wait: { dur: Infinity, f: (t) => ({ wing: 1, eye: "wide", head: "up", fx: t % 10 < 7 ? [["bubble", "!"]] : [] }) },
    sleep: { dur: Infinity, f: (t) => ({ head: "tuck", eye: "closed", bob: t % 40 < 20 ? 0 : 1, fx: [["z", t]] }) },
    preen: { dur: 30, f: (t) => ({ head: "down", wing: t % 8 < 4 ? 1 : 0, face: 1 }) },
    look: { dur: 40, f: (t) => ({ face: t < 20 ? 1 : -1, head: "up" }) },
    hop: { dur: 24, f: (t) => ({ hop: -Math.round(7 * Math.sin((Math.PI * t) / 24)), wing: t > 2 && t < 21 ? 1 : 0 }) },
    stretch: { dur: 28, f: (t) => ({ wing: t > 5 && t < 22 ? 2 : t > 2 && t < 25 ? 1 : 0, head: "up" }) },
    peck: { dur: 24, f: (t) => ({ head: t % 6 < 3 ? "down" : "normal", fx: t % 6 === 1 ? [["crumb"]] : [] }) },
    caw: { dur: 12, f: (t) => ({ beak: t % 6 < 4, head: "up", fx: t % 6 < 4 ? [["caw"]] : [] }) },
    laugh: { dur: 30, f: (t) => ({ beak: true, bob: t % 4 < 2 ? -1 : 0, eye: "closed", fx: [["bubble", "ha"]] }) },
    startle: { dur: 22, f: (t) => ({ puff: 1, eye: "wide", hop: t < 4 ? -2 : 0, wing: t < 8 ? 1 : 0, fx: [["bubble", "!"]] }) },
    proud: { dur: 38, f: (t) => ({ puff: 1, head: "up", fx: [["sparkle", t], ["bubble", "♥"]] }) },
    yawn: { dur: 26, f: (t) => ({ beak: t > 4 && t < 20, head: "up", eye: "closed" }) },
    question: { dur: 32, f: (t) => ({ head: "tilt", fx: [["bubble", "?"]] }) },
    music: { dur: 54, f: (t) => ({ bob: t % 6 < 3 ? -1 : 0, head: t % 12 < 6 ? "tilt" : "normal", fx: [["notes", t]] }) },
    study: { dur: 60, f: (t) => ({ head: "down", eye: t % 20 < 2 ? "closed" : "open", fx: [["book"]] }) },
    eat: { dur: 30, f: (t) => ({ head: t % 5 < 2 ? "down" : "normal", fx: t % 5 === 1 ? [["crumb"]] : [] }) },
    settle: { dur: 16, f: (t) => ({ shake: t % 4 < 2 ? 1 : -1, puff: t < 6 ? 1 : 0 }) },
    shiny: { dur: 56, f: (t) => ({ face: 1, head: t > 20 && t < 34 ? "down" : "normal", hop: t > 14 && t < 20 ? -2 : 0, fx: t < 28 ? [["shiny", t]] : [] }) },
  };
  const AMBIENT = ["preen", "look", "hop", "stretch", "peck", "look", "preen", "music", "shiny"];

  let cur = { name: "idle", t: 0 }, base = "idle", mode = "idle";
  let lastActive = Date.now(), timer = null, canvas = null, nextAmbient = 90 + Math.random() * 120;
  let shinies = +store.get("shinies") || 0;
  const r = rng(Date.now() & 0xffff);

  function baseFor() {
    if (mode === "thinking") return "think";
    if (mode === "waiting") return "wait";
    const h = bkkHour(), quiet = Date.now() - lastActive > 25 * 60000;
    return (h >= 0 && h < 6) || quiet ? "sleep" : "idle";
  }
  function play(name) {
    if (!B[name]) return;
    cur = { name, t: 0 };
    if (reduceMotion) draw();
  }
  function tick() {
    cur.t++;
    const beh = B[cur.name];
    if (cur.t >= beh.dur) {
      if (cur.name === "shiny") { shinies++; store.set("shinies", shinies); if (canvas) canvas.title = title(); }
      cur = { name: baseFor(), t: 0 };
    }
    base = baseFor();
    if (B[cur.name].dur === Infinity && cur.name !== base) cur = { name: base, t: 0 };
    if (cur.name === "idle" && --nextAmbient <= 0) {
      nextAmbient = 100 + r() * 180;
      const pick = AMBIENT[Math.floor(r() * AMBIENT.length)];
      if (pick !== "shiny" || r() < 0.4) play(pick);
    }
    draw();
  }

  // ---------------------------------------------------------------- drawing
  function draw() {
    if (!canvas) return;
    const b = new PX(W, H);
    const h = bkkHour(), key = h >= 19 || h < 5 ? "night" : h < 7 ? "dawn" : h < 17 ? "day" : "dusk";
    const [s0, s1, orb] = SKY[key].map(C);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) b.set(x, y, bayer(x, y) < y / H ? s1 : s0);
    // rounded corners
    [[0, 0], [1, 0], [0, 1], [W - 1, 0], [W - 2, 0], [W - 1, 1], [0, H - 1], [1, H - 1], [0, H - 2], [W - 1, H - 1], [W - 2, H - 1], [W - 1, H - 2]].forEach(([x, y]) => { b.d[y * W + x] = 0; });
    if (key === "night") { b.ellipse(36, 6, 3, 3, orb); b.ellipse(37.5, 5, 2.4, 2.4, s0); [[6, 4], [13, 9], [24, 3], [30, 12], [3, 14]].forEach(([x, y], i) => b.set(x, y, (cur.t + i * 7) % 30 < 26 ? orb : s0)); }
    else b.ellipse(36, 7, 3.5, 3.5, orb);
    // the branch, a few leaves
    b.line(0, 25, 43, 21, K.twig); b.line(0, 26, 43, 22, K.twigD); b.line(30, 23, 40, 16, K.twig);
    [[38, 15], [41, 17], [36, 14], [4, 23], [8, 22]].forEach(([x, y], i) => { b.set(x, y, i % 2 ? K.leaf : K.leaf2); b.set(x + 1, y, K.leaf); });
    // nest back
    const nx = 21, ny = 22;
    b.ellipse(nx, ny, 10, 3, K.twigD);
    const p = { face: -1, ...B[cur.name].f(cur.t) };
    const fx = p.fx || [];
    // the crow (faces the chat, to his left, by default)
    const cs = crowSprite(p);
    const flip = (p.face ?? -1) < 0;
    blitFlip(b, cs, nx - 13 + (p.shake || 0), ny - 17 + (p.hop || 0) + (cur.name === "sleep" ? 1 : 0), flip);
    // nest front + his stash of shiny things
    for (let x = nx - 10; x <= nx + 10; x++) for (let y = ny - 1; y <= ny + 3; y++) {
      const u = (x - nx) / 10.5, v = (y - ny - 1) / 3.2;
      if (u * u + v * v <= 1) b.set(x, y, (x + y * 2) % 5 === 0 ? K.twig2 : (x * 3 + y) % 7 === 0 ? K.twigD : K.twig);
    }
    for (let i = 0; i < Math.min(shinies, 5); i++) b.set(nx - 7 + i * 3, ny, (cur.t + i * 5) % 24 < 20 ? K.gold : K.gold2);
    // effects
    const bxp = flip ? nx - 16 : nx + 6, byp = ny - 21 + (p.hop || 0);
    for (const [kind, arg] of fx) {
      if (kind === "bubble") bubble(b, flip ? bxp - (arg.length - 1) * 4 : bxp, Math.max(0, byp), arg);
      if (kind === "dots") { bubble(b, bxp, Math.max(0, byp), "...".slice(0, arg).padEnd(3, " ")); }
      if (kind === "z") { for (let k = 0; k < 3; k++) { const zt = (arg + k * 12) % 36; if (zt < 30) glyph(b, "z", nx - 4 + (flip ? -1 : 1) * Math.floor(zt / 5), ny - 12 - Math.floor(zt / 3), K.z); } }
      if (kind === "caw") { const ex = flip ? nx - 13 : nx + 13; b.set(ex, ny - 16, K.bubble); b.set(ex + (flip ? -1 : 1), ny - 15, K.bubble); b.set(ex + (flip ? -2 : 2), ny - 17, K.bubble); b.set(ex + (flip ? -2 : 2), ny - 14, K.bubble); }
      if (kind === "sparkle") { [[-9, -14], [10, -12], [-5, -19], [7, -18]].forEach(([dx, dy], i) => { if ((arg + i * 4) % 12 < 7) { const X = nx + dx, Y = ny + dy; b.set(X, Y, K.gold2); b.set(X - 1, Y, K.gold); b.set(X + 1, Y, K.gold); b.set(X, Y - 1, K.gold); b.set(X, Y + 1, K.gold); } }); }
      if (kind === "notes") { for (let k = 0; k < 2; k++) { const nt = (arg + k * 14) % 28; glyph(b, "n", nx + (flip ? -12 : 9) + (k ? 3 : 0), ny - 10 - Math.floor(nt / 2), K.note); } }
      if (kind === "crumb") { b.set(nx + (flip ? -9 : 9), ny - 2, K.twig2); b.set(nx + (flip ? -10 : 10), ny - 4, K.twig2); }
      if (kind === "book") { const bx = flip ? nx - 12 : nx + 5; b.rect(bx, ny - 5, 7, 4, K.page); b.vline(bx + 3, ny - 5, ny - 2, K.ink); b.rect(bx, ny - 2, 7, 1, K.book); }
      if (kind === "shiny") { const sx = 37, sy = 20; if (arg % 6 < 4) { b.set(sx, sy, K.gold2); b.set(sx - 1, sy, K.gold); b.set(sx + 1, sy, K.gold); b.set(sx, sy - 1, K.gold); } else b.set(sx, sy, K.gold); }
    }
    b.toCanvas(canvas);
  }
  const title = () => `Crow's nest${shinies ? ` · ${shinies} shiny thing${shinies === 1 ? "" : "s"} stolen so far` : ""}. Click to poke him.`;

  // ---------------------------------------------------------------- reactions to what Korn types
  const REACT = [
    [/\b(gn|good ?night|goodnight|sleep|sleepy|tired|bed)\b/, "yawn"],
    [/\b(lol|lmao|lmfao|haha+|hehe+|💀|😂)/, "laugh"],
    [/\b(fuck|fucking|shit|wtf|damn|bruh|hell)\b/, "startle"],
    [/\b(goat|thanks|thank you|thx|ty|great|fire|love (it|this)|nice|sick|holy|beautiful|perfect)\b/, "proud"],
    [/\b(song|music|bass|guitar|spotify|playlist|jam|album)\b/, "music"],
    [/\b(run|ran|running|10k|half|marathon|gym|lift|km)\b/, "hop"],
    [/\b(study|studying|exam|midterm|ba202|ac311|read|reading|book)\b/, "study"],
    [/\b(eat|eating|food|hungry|coffee|lunch|dinner|breakfast)\b/, "eat"],
    [/\b(sol|persi|artis|vera|vex|crow)\b/, "caw"],
    [/\?\s*$/, "question"],
  ];
  function react(text) {
    lastActive = Date.now();
    const s = String(text || "").toLowerCase();
    const hit = REACT.find(([re]) => re.test(s));
    play(hit ? hit[1] : "look");
  }

  function mount(cv) {
    canvas = cv;
    canvas.title = title();
    canvas.onclick = () => { lastActive = Date.now(); play(["caw", "hop", "proud", "stretch", "laugh"][Math.floor(r() * 5)]); };
    draw();
    if (!reduceMotion) timer = setInterval(() => { if (!document.hidden) tick(); }, 100);
  }
  function setMode(m) {
    if (m === mode) return;
    const was = mode;
    mode = m; lastActive = Date.now();
    if (m === "idle" && was !== "idle") play("settle");
    else if (reduceMotion) draw();
  }
  root.Nest = { mount, setMode, react, play };
})(window);
