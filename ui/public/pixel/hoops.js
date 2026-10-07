// Hoops: a pixel hoop bolted to the chat's top-left border and a ball that rolls
// free around the conversation, something to fiddle with while Crow thinks (his ask, 7 Oct).
//   drag the ball and let go to throw it · tap it for a hop · drop it on the book
//   pile and it tucks in behind the books and stays put, until he pulls it back out.
// Only out in the conversation view, when the gutters are showing (same rule as the books).
(function (root) {
  "use strict";
  const { PX, C } = root.PXL;
  const S = 3;                                   // sprite pixel → screen px, same as the pile
  const store = { get: (k) => { try { return localStorage.getItem("hoops:" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("hoops:" + k, v); } catch { /* private window */ } } };

  // ---------------------------------------------------------------- the hoop (side view, a touch of 3/4 on the rim)
  const HW = 30, HH = 36, TOP = 60;              // sprite size; px from the top of the chat
  const RIM = { x0: 6, x1: 26, y: 18 };          // sprite coords
  const P = { board: C("#e4ded2"), boardD: C("#a9a397"), steel: C("#5f6f80"), steelD: C("#3c4a58"),
    rimBack: C("#8a3412"), rim: C("#e0561f"), rimHi: C("#f59a62"), net: C("#e4ded2"), netD: C("#8c9baa") };
  function hoopBack() {
    const b = new PX(HW, HH);
    b.rect(0, 11, 3, 4, P.steel); b.hline(0, 2, 14, P.steelD);                 // bracket into the border
    b.rect(3, 0, 3, 28, P.board); b.vline(5, 1, 26, P.boardD); b.hline(3, 5, 27, P.boardD);
    b.hline(RIM.x0, RIM.x1, RIM.y - 1, P.rimBack);                                // the far side of the rim
    return b;
  }
  function hoopFront(sway = 0) {
    const b = new PX(HW, HH);
    const top = [7, 10, 13, 16, 19, 22, 25], bot = [10, 12, 14, 16, 18, 20, 22];
    const s = (i) => Math.round(sway * (i % 2 ? 1 : -1));
    for (let i = 0; i < top.length; i++) {
      b.line(top[i], RIM.y + 2, bot[i] + s(i), HH - 3, P.netD);
      if (i + 1 < top.length) b.line(top[i], RIM.y + 2, bot[i + 1] + s(i + 1), HH - 3, P.net);
    }
    b.hline(10 + s(0), 22 + s(1), HH - 3, P.netD);
    b.hline(RIM.x0, RIM.x1, RIM.y + 1, P.rim); b.hline(RIM.x0 + 2, RIM.x0 + 7, RIM.y + 1, P.rimHi);
    b.set(RIM.x1, RIM.y, P.rim); b.set(RIM.x0, RIM.y, P.rim);
    return b;
  }

  // ---------------------------------------------------------------- the ball
  const BD = 12, R = (BD * S) / 2;               // 12 px across → 36 px on screen
  const B = { base: C("#d9622b"), shade: C("#a8441c"), hi: C("#f39056"), seam: C("#3a1a0c") };
  const ballFrames = [];
  function ballSprite(k) {                       // k = one of 16 spin steps
    if (ballFrames[k]) return ballFrames[k];
    const b = new PX(BD, BD), a = (k / 16) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    b.ellipse(BD / 2, BD / 2, BD / 2, BD / 2, (x, y, u, v) => {
      const r2 = u * u + v * v, lit = -u - v;    // light from the top left, it doesn't spin
      const ru = u * ca - v * sa, rv = u * sa + v * ca;
      if (Math.abs(rv) < 0.1 || Math.abs(ru) < 0.1) return B.seam;            // the seam cross, it spins
      if (r2 > 0.72) return lit > 0.3 ? B.base : B.shade;                     // a darker rim keeps it round
      return lit > 0.75 ? B.hi : B.base;
    });
    return (ballFrames[k] = b);
  }

  // ---------------------------------------------------------------- state
  // tuned 7 Oct 15:12 (his ask: slower, more consistent bounces): softer gravity, one bounce
  // number for every surface, a fixed physics step so each throw plays out the same way
  const G = 1300, AIR = 0.25, E = 0.68, E_RIM = 0.6, STEP = 1 / 240;
  let acc = 0;
  const ball = { x: 0, y: 0, vx: 0, vy: 0, spin: 0, parked: store.get("parked") !== "0", drag: null, asleep: false, still: 0, grounded: false, scored: false };
  let talk, back, front, cv, score, raf = 0, last = 0, swish = 0, made = 0, allTime = +store.get("made") || 0;

  const visible = () => document.body.classList.contains("gutters") && !document.body.classList.contains("room-empty");
  const rel = (el) => { if (!el) return null; const t = talk.getBoundingClientRect(), r = el.getBoundingClientRect(); return { l: r.left - t.left, t: r.top - t.top, r: r.right - t.left, b: r.bottom - t.top }; };
  function pileBox() { const r = rel(document.getElementById("pile")); return r && r.r > r.l ? r : null; }
  // parked: behind the top book (Siddhartha, always pinned on top), only the top of the ball showing
  function parkSpot() { const p = pileBox(); return p ? { x: p.l + 54, y: p.t + 8 } : null; }
  // the solid things: the backboard, the bracket, and the composer (the ball sits on it or bounces off its sides)
  function solids() {
    const out = [
      { l: 3 * S, t: TOP, r: 6 * S, b: TOP + 28 * S },
      { l: 0, t: TOP + 11 * S, r: 3 * S, b: TOP + 15 * S },
    ];
    const f = document.getElementById("composer");
    if (f) {
      const r = rel(f), cs = getComputedStyle(f);
      out.push({ l: r.l + parseFloat(cs.paddingLeft), t: r.t + parseFloat(cs.paddingTop), r: r.r - parseFloat(cs.paddingRight), b: r.b - parseFloat(cs.paddingBottom) });
    }
    return out;
  }
  const rimEnds = () => [{ x: (RIM.x1 + 0.5) * S, y: TOP + (RIM.y + 0.5) * S, r: 1.2 * S }];

  // ---------------------------------------------------------------- physics
  function bounce(nx, ny, e, fr = 0.04) {
    const vn = ball.vx * nx + ball.vy * ny;
    if (vn >= 0) return;
    ball.vx -= (1 + e) * vn * nx; ball.vy -= (1 + e) * vn * ny;
    const tx = -ny, ty = nx, vt = ball.vx * tx + ball.vy * ty;
    ball.vx -= fr * vt * tx; ball.vy -= fr * vt * ty;
    if (ny < -0.6) ball.grounded = true;
  }
  function hitRect(o, e) {
    const cx = Math.max(o.l, Math.min(ball.x, o.r)), cy = Math.max(o.t, Math.min(ball.y, o.b));
    let dx = ball.x - cx, dy = ball.y - cy, d = Math.hypot(dx, dy);
    if (d >= R) return;
    if (d === 0) {                               // centre inside: out by the shortest side
      const m = [[ball.x - o.l, -1, 0], [o.r - ball.x, 1, 0], [ball.y - o.t, 0, -1], [o.b - ball.y, 0, 1]].sort((a, b) => a[0] - b[0])[0];
      dx = m[1]; dy = m[2]; d = 1; ball.x += m[1] * (m[0] + R); ball.y += m[2] * (m[0] + R);
    } else { ball.x = cx + (dx / d) * R; ball.y = cy + (dy / d) * R; }
    bounce(dx / d, dy / d, e);
  }
  function hitDot(p, e) {
    const dx = ball.x - p.x, dy = ball.y - p.y, d = Math.hypot(dx, dy), min = R + p.r;
    if (d >= min || d === 0) return;
    ball.x = p.x + (dx / d) * min; ball.y = p.y + (dy / d) * min;
    bounce(dx / d, dy / d, e);
  }
  function step(dt, W, H, walls) {
    const py = ball.y;
    ball.grounded = false;
    ball.vy += G * dt;
    ball.vx *= 1 - AIR * dt; ball.vy *= 1 - AIR * dt;
    ball.x += ball.vx * dt; ball.y += ball.vy * dt;
    if (ball.x < R) { ball.x = R; bounce(1, 0, E); }
    if (ball.x > W - R) { ball.x = W - R; bounce(-1, 0, E); }
    if (ball.y < R) { ball.y = R; bounce(0, 1, E); }
    if (ball.y > H - R) { ball.y = H - R; bounce(0, -1, E); }
    for (const o of walls) hitRect(o, E);
    for (const p of rimEnds()) hitDot(p, E_RIM);
    if (ball.grounded) { ball.vx *= 1 - 1.2 * dt; if (Math.abs(ball.vy) < 60) ball.vy = 0; ball.spin += (ball.vx * dt) / R; }
    else ball.spin += ball.vx * dt * 0.012;
    // a make: the centre drops through the rim's opening, moving down
    const rimY = TOP + RIM.y * S, inside = ball.x > (RIM.x0 + 1) * S && ball.x < RIM.x1 * S;
    if (!ball.scored && py < rimY && ball.y >= rimY && ball.vy > 0 && inside) { ball.scored = true; made++; allTime++; store.set("made", allTime); swish = 14; paintScore(true); }
    if (ball.scored && (ball.y < rimY - R * 2 || ball.y > rimY + R * 3)) ball.scored = false;
  }

  // ---------------------------------------------------------------- drawing
  function place() {
    const k = ((Math.round((ball.spin / (Math.PI * 2)) * 16) % 16) + 16) % 16;
    if (cv.dataset.k !== String(k)) { ballSprite(k).toCanvas(cv); cv.dataset.k = k; }
    cv.style.transform = `translate(${Math.round(ball.x - R)}px, ${Math.round(ball.y - R)}px)`;
    cv.classList.toggle("parked", ball.parked);
  }
  function paintNet() { hoopFront(swish ? Math.sin(swish * 1.3) * (swish / 7) : 0).toCanvas(front); }
  function paintScore(pop) {
    score.innerHTML = `<b>${made}</b> in<span>${allTime} all-time</span>`;
    if (pop) { score.classList.remove("pop"); void score.offsetWidth; score.classList.add("pop"); }
  }

  function tick(now) {
    raf = 0;
    if (!visible() || ball.parked) { last = 0; return; }
    const dt = Math.min(0.033, last ? (now - last) / 1000 : 0.016);
    last = now;
    if (!ball.drag) {
      const W = talk.clientWidth, H = talk.clientHeight, walls = solids();
      for (acc += dt; acc >= STEP; acc -= STEP) step(STEP, W, H, walls);
      const slow = ball.grounded && Math.hypot(ball.vx, ball.vy) < 10;
      ball.still = slow ? ball.still + dt : 0;
      if (ball.still > 0.5) { ball.vx = ball.vy = 0; ball.asleep = true; }
    }
    if (swish) { swish--; paintNet(); }
    place();
    if (!ball.asleep || ball.drag || swish) raf = requestAnimationFrame(tick);
  }
  function wake() { ball.asleep = false; ball.still = 0; if (!raf) { last = 0; acc = 0; raf = requestAnimationFrame(tick); } }

  // ---------------------------------------------------------------- park behind the books / pull it back out
  function park(on) {
    ball.parked = on; store.set("parked", on ? "1" : "0");
    if (on) { const s = parkSpot(); if (s) { ball.x = s.x; ball.y = s.y; } ball.vx = ball.vy = 0; }
    place();
    if (!on) wake();
  }
  const overPile = () => { const p = pileBox(); return p && ball.x > p.l && ball.x < p.r + 6 && ball.y > p.t - 10 && ball.y < p.b; };

  // ---------------------------------------------------------------- drag, throw, tap
  function onDown(e) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    cv.setPointerCapture(e.pointerId);
    const wasParked = ball.parked;
    if (wasParked) { ball.parked = false; store.set("parked", "0"); cv.classList.remove("parked"); }
    const t = talk.getBoundingClientRect();
    ball.drag = { id: e.pointerId, ox: e.clientX - t.left - ball.x, oy: e.clientY - t.top - ball.y, t0: performance.now(), x0: e.clientX, y0: e.clientY, wasParked, trail: [] };
    cv.classList.add("held");
    wake();
  }
  function onMove(e) {
    const d = ball.drag; if (!d || e.pointerId !== d.id) return;
    const t = talk.getBoundingClientRect(), W = talk.clientWidth, H = talk.clientHeight;
    ball.x = Math.max(R, Math.min(W - R, e.clientX - t.left - d.ox));
    ball.y = Math.max(R, Math.min(H - R, e.clientY - t.top - d.oy));
    const now = performance.now();
    d.trail.push({ x: ball.x, y: ball.y, t: now });
    while (d.trail.length && now - d.trail[0].t > 90) d.trail.shift();
    place();
  }
  function onUp(e) {
    const d = ball.drag; if (!d || e.pointerId !== d.id) return;
    ball.drag = null; cv.classList.remove("held");
    const moved = Math.hypot(e.clientX - d.x0, e.clientY - d.y0), quick = performance.now() - d.t0 < 260;
    if (moved < 5 && quick) {                    // a tap: a little hop (out of the pile, if it was in there)
      ball.vx = d.wasParked ? 220 : 0; ball.vy = -650;
      return wake();
    }
    if (overPile()) return park(true);
    const now = performance.now(), tr = d.trail.filter((q) => now - q.t < 90);   // held still before letting go = a dead drop
    const a = tr[0], z = tr[tr.length - 1];
    const span = a && z && z.t - a.t > 8 ? (z.t - a.t) / 1000 : 0;
    const cap = 1800, vx = span ? ((z.x - a.x) / span) * 0.7 : 0, vy = span ? ((z.y - a.y) / span) * 0.7 : 0, sp = Math.hypot(vx, vy);
    const k = sp > cap ? cap / sp : 1;
    ball.vx = vx * k; ball.vy = vy * k;
    wake();
  }

  // ---------------------------------------------------------------- mount
  function sync() {
    if (!talk) return;
    if (!visible()) return;
    const W = talk.clientWidth, H = talk.clientHeight;
    if (ball.parked) { const s = parkSpot(); if (s) { ball.x = s.x; ball.y = s.y; } place(); return; }
    ball.x = Math.max(R, Math.min(W - R, ball.x)); ball.y = Math.max(R, Math.min(H - R, ball.y));
    wake();
  }
  function mount() {
    talk = document.querySelector(".talk"); if (!talk) return;
    const court = document.createElement("div");
    court.className = "court";
    court.innerHTML = `<canvas class="hoop back" aria-hidden="true"></canvas><canvas class="hoop front" aria-hidden="true"></canvas><div class="hoop-score" aria-live="polite"></div><canvas class="ball" title="Drag to throw, tap to hop, drop it on the books to put it away" aria-label="Basketball"></canvas>`;
    talk.append(court);
    [back, front, score, cv] = court.children;
    for (const c of [back, front]) Object.assign(c.style, { width: HW * S + "px", height: HH * S + "px", top: TOP + "px" });
    score.style.top = TOP + HH * S + 4 + "px";
    Object.assign(cv.style, { width: BD * S + "px", height: BD * S + "px" });
    hoopBack().toCanvas(back); paintNet(); paintScore();
    // first time out (or not parked last time): it drops in under the hoop
    ball.x = 16 * S; ball.y = TOP + HH * S + R * 2;
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    // the gutters come and go (window size, the room view): follow them
    new MutationObserver(() => requestAnimationFrame(sync)).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    addEventListener("resize", () => requestAnimationFrame(sync));
    requestAnimationFrame(() => { place(); sync(); });
  }
  root.Hoops = { mount, park };
  mount();
})(window);
