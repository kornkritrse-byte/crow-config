// The FG board: a basketball-practice-style scoreboard for MCQs, parked at lunch
// 22 Nov and built alongside the existing tube (mcqbar.js), NOT replacing it —
// his ask: "make a scoreboard like in basketball practice... number of questions
// right vs taken next to each other on a board... the bar of percentage correct
// horizontally labeled percentage from the field... a basketball court from bird's
// eye view... animation of a ball shot from the field, made if correct and missed
// if wrong." Unlike the tube (rolling last-20), this counts EVERY graded MCQ ever
// (board.mcqAll, server.mjs mcqAllStats()) — doesn't forget an early miss.
// Same mount/reveal pattern as mcqbar.js; stacks below it in the same corner.
(function (root) {
  "use strict";
  const { PX, C } = root.PXL;
  const S = 3;
  const CW = 54, CH = 46;                          // court sprite size
  const BARW = 46, BARH = 8;                        // FG% bar sprite size
  const TOP = 60 + 36 * S + 42 + 44 * S + 34 + 14;   // under the hoop (108) + its score (42) + the tube (132) + its score (~34) + a gap
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------- the court (bird's-eye, half-court, hoop at top)
  const P = {
    floor: C("#8a6a3e"), floorLo: C("#7a5c34"), line: C("#e8ddc4"), lineDim: C("#cbbd9c"),
    rim: C("#e0561f"), rimHi: C("#f59a62"), board: C("#5f6f80"),
  };
  const HOOP = { x: CW / 2, y: 6 };                  // basket position, sprite coords
  const SHOT = { x: CW / 2, y: CH - 6 };             // shooter spot (free-throw line)
  function courtSprite() {
    const b = new PX(CW, CH);
    b.rect(0, 0, CW, CH, P.floor);
    for (let y = 0; y < CH; y += 2) b.hline(0, CW - 1, y, P.floorLo);  // boards, dithered
    // boundary
    b.hline(1, CW - 2, 1, P.line); b.hline(1, CW - 2, CH - 2, P.line);
    b.vline(1, 1, CH - 2, P.line); b.vline(CW - 2, 1, CH - 2, P.line);
    // the key (free-throw lane), baseline at the top
    const laneW = 22, laneX = (CW - laneW) / 2, laneH = 26;
    b.vline(laneX, 1, laneH, P.lineDim); b.vline(laneX + laneW, 1, laneH, P.lineDim);
    b.hline(laneX, laneX + laneW, laneH, P.lineDim);
    // free-throw circle at the foot of the lane
    b.ellipse(CW / 2, laneH, 11, 7, (x, y, u, v) => { const r2 = u * u + v * v; return r2 > 0.8 && r2 <= 1 ? P.lineDim : undefined; });
    // backboard + rim, just under the baseline
    b.hline(HOOP.x - 6, HOOP.x + 6, HOOP.y - 3, P.board);
    b.ellipse(HOOP.x, HOOP.y + 2, 3, 2, (x, y, u, v) => { const r2 = u * u + v * v; return r2 > 0.5 && r2 <= 1 ? (y < HOOP.y + 1 ? P.rimHi : P.rim) : undefined; });
    // a hint of the 3pt arc near the shooter's end
    b.ellipse(CW / 2, CH + 14, 30, 22, (x, y, u, v) => { const r2 = u * u + v * v; return r2 > 0.94 && r2 <= 1 && y < CH - 2 ? P.lineDim : undefined; });
    return b;
  }
  const COURT = courtSprite();

  // ---------------------------------------------------------------- the ball (small, static — this isn't the hoops.js toy)
  const BD = 7, BR = (BD * S) / 2;
  const B = { base: C("#d9622b"), shade: C("#a8441c"), hi: C("#f39056"), seam: C("#3a1a0c") };
  const BALL = (() => {
    const b = new PX(BD, BD);
    b.ellipse(BD / 2, BD / 2, BD / 2, BD / 2, (x, y, u, v) => {
      const r2 = u * u + v * v, lit = -u - v;
      if (Math.abs(u) < 0.14 || Math.abs(v) < 0.14) return B.seam;
      if (r2 > 0.72) return lit > 0.3 ? B.base : B.shade;
      return lit > 0.75 ? B.hi : B.base;
    });
    return b;
  })();

  // ---------------------------------------------------------------- the FG% bar (horizontal, same fluid language as the tube)
  const BP = {
    glass: C("#4a5a6a"), glassHi: C("#9fb2c2"), empty: C("#1a2430"),
    fluid: C("#2f9d58"), fluidHi: C("#6fe08a"), fluidLo: C("#176b38"), fluidEdge: C("#bdf5c9"),
  };
  const rngBar = root.PXL.rng(11);
  function barShell() {
    const b = new PX(BARW, BARH);
    b.rect(0, 0, BARW, BARH, BP.glass);
    b.hline(0, BARW - 1, 0, BP.glassHi);
    b.rect(1, 1, BARW - 2, BARH - 2, BP.empty);
    return b;
  }
  const BARSHELL = barShell();
  function barFrame(level) {
    const b = new PX(BARW, BARH);
    b.copy(BARSHELL);
    const innerW = BARW - 3, fillCols = Math.round(level * innerW);
    for (let y = 1; y < BARH - 1; y++) {
      for (let x = 1; x < 1 + fillCols; x++) {
        const edge = y === 1 || y === BARH - 2, meniscus = x === fillCols;
        b.set(x, y, meniscus ? BP.fluidEdge : edge ? BP.fluidLo : rngBar() < 0.1 ? BP.fluidHi : BP.fluid);
      }
    }
    return b;
  }

  // ---------------------------------------------------------------- state
  let wrap, courtCv, ballCv, barCv, madeEl, attEl, pctEl, raf = 0;
  let barCur = 0, barTarget = 0, barRaf = 0;
  let shot = null;                                   // {t0, dur, phase, make}
  let lastTotal = 0, lastCorrect = 0, primed = false;

  function paintBar() {
    if (!barCv) return;
    barFrame(barCur).toCanvas(barCv);
  }
  function stepBar() {
    const d = barTarget - barCur;
    if (Math.abs(d) < 0.003) { barCur = barTarget; paintBar(); barRaf = 0; return; }
    barCur += d * 0.12;
    paintBar();
    barRaf = requestAnimationFrame(stepBar);
  }

  const ease = (t) => 1 - (1 - t) * (1 - t);           // ease-out quad
  function placeBall(x, y, scale = 1, alpha = 1) {
    ballCv.style.transform = `translate(${Math.round(x - BR * scale)}px, ${Math.round(y - BR * scale)}px) scale(${scale})`;
    ballCv.style.opacity = alpha;
  }
  function tickShot(now) {
    raf = 0;
    if (!shot) return;
    const t = Math.min(1, (now - shot.t0) / shot.dur);
    if (shot.phase === "fly") {
      const e = ease(t);
      const x = (SHOT.x + (shot.make ? HOOP.x - SHOT.x : HOOP.x - SHOT.x + shot.miss) * e) * S;
      const yStraight = SHOT.y + (HOOP.y - SHOT.y) * e;
      const arc = Math.sin(Math.PI * e) * 16;
      const y = (yStraight - arc) * S;
      placeBall(x, y, 1, 1);
      if (t >= 1) {
        if (shot.make) { shot = { ...shot, phase: "swish", t0: now, dur: 220 }; }
        else { shot = { ...shot, phase: "miss", t0: now, dur: 420, fromX: x, fromY: y }; }
      }
    } else if (shot.phase === "swish") {
      const e = t;
      placeBall(HOOP.x * S, (HOOP.y + 2 + e * 6) * S, 1 - e * 0.6, 1 - e);
      if (t >= 1) shot = null;
    } else if (shot.phase === "miss") {
      const e = ease(t);
      const x = shot.fromX + shot.deflectX * e;
      const y = shot.fromY + (shot.deflectY + e * 30) * e;
      placeBall(x, y, 1, 1 - e * 0.9);
      if (t >= 1) shot = null;
    }
    if (shot) raf = requestAnimationFrame(tickShot);
    else { ballCv.style.opacity = 0; }
  }
  function fire(make) {
    if (reduceMotion || !ballCv) return;
    shot = { t0: performance.now(), dur: 520, phase: "fly", make, miss: make ? 0 : (rngBar() < 0.5 ? -9 : 9), deflectX: (rngBar() < 0.5 ? -1 : 1) * (14 + rngBar() * 10), deflectY: 6 + rngBar() * 8 };
    ballCv.style.opacity = 1;
    if (!raf) raf = requestAnimationFrame(tickShot);
  }

  function setStats(mcqAll) {
    const has = !!mcqAll && mcqAll.total > 0;
    if (madeEl) madeEl.textContent = has ? mcqAll.correct : "–";
    if (attEl) attEl.textContent = has ? mcqAll.total : "–";
    if (pctEl) pctEl.textContent = has ? mcqAll.pct + "% FG" : "no shots yet";
    barTarget = has ? mcqAll.pct / 100 : 0;
    if (reduceMotion || !barCv) { barCur = barTarget; paintBar(); }
    else if (!barRaf) barRaf = requestAnimationFrame(stepBar);
    if (has) document.body.classList.add("fg-active");
    if (has && primed) {
      if (mcqAll.total > lastTotal) fire(mcqAll.correct > lastCorrect);
    }
    if (has) { lastTotal = mcqAll.total; lastCorrect = mcqAll.correct; primed = true; }
  }
  function reveal() { document.body.classList.add("fg-active"); }

  function mount() {
    const talk = document.querySelector(".talk"); if (!talk) return;
    wrap = document.createElement("div");
    wrap.className = "fgboard";
    wrap.title = "All-time MCQ record — every graded card, no rolling window";
    wrap.innerHTML = `
      <div class="fgboard-stats"><b class="made">–</b><span>/</span><b class="att">–</b></div>
      <div class="fgboard-cap">made / att</div>
      <div class="fgboard-court">
        <canvas class="fgcourt" aria-hidden="true"></canvas>
        <canvas class="fgball" aria-hidden="true"></canvas>
      </div>
      <canvas class="fgbar" aria-hidden="true"></canvas>
      <div class="fgboard-pct">no shots yet</div>
    `;
    talk.append(wrap);
    courtCv = wrap.querySelector(".fgcourt"); ballCv = wrap.querySelector(".fgball"); barCv = wrap.querySelector(".fgbar");
    madeEl = wrap.querySelector(".made"); attEl = wrap.querySelector(".att"); pctEl = wrap.querySelector(".fgboard-pct");
    courtCv.style.width = CW * S + "px"; courtCv.style.height = CH * S + "px";
    ballCv.style.width = BD * S + "px"; ballCv.style.height = BD * S + "px"; ballCv.style.opacity = 0;
    barCv.style.width = BARW * S + "px"; barCv.style.height = BARH * S + "px";
    wrap.style.top = TOP + "px";
    COURT.toCanvas(courtCv);
    BALL.toCanvas(ballCv);
    paintBar();
  }
  root.FgBoard = { mount, setStats, reveal };
  mount();
})(window);
