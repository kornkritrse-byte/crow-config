// The FG board: a basketball-practice-style scoreboard for MCQs, parked at lunch
// 22 Nov — his ask: "make a scoreboard like in basketball practice... number of
// questions right vs taken next to each other on a board... the bar of percentage
// correct... a basketball court from bird's eye view... animation of a ball shot
// from the field, made if correct and missed if wrong." Counts EVERY graded MCQ
// ever (board.mcqAll, server.mjs mcqAllStats()) — doesn't forget an early miss.
// Re-laid out same evening: court on top, then the % tube (absorbed the standalone
// mcqbar.js — same glass/fluid sprite, now with the number inside the glass
// instead of below it), then made/att at the bottom. Whole stack moved to the
// top-right corner — the hoop and ball live top-left, this is the open side.
(function (root) {
  "use strict";
  const { PX, C } = root.PXL;
  const S = 3;
  const CW = 54, CH = 46;                          // court sprite size
  const TW = 14, TH = 44;                           // tube sprite size, same as the old mcqbar
  const TOP = 60;                                   // top-right corner, level with the hoop on the other side
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

  // ---------------------------------------------------------------- the % tube (vertical, the old mcqbar sprite)
  const TP = {
    glass: C("#4a5a6a"), glassHi: C("#9fb2c2"), glassLo: C("#2a3744"),
    cap: C("#8c9baa"), capHi: C("#c7d6e2"), capLo: C("#5f6f80"),
    empty: C("#1a2430"),
    fluid: C("#2f9d58"), fluidHi: C("#6fe08a"), fluidLo: C("#176b38"), fluidEdge: C("#bdf5c9"),
  };
  const TWALL = { x0: 2, x1: 11, yTop: 3, yBot: 40 };
  const rngTube = root.PXL.rng(11);
  function tubeShell() {
    const b = new PX(TW, TH);
    b.rect(TWALL.x0 - 1, 0, TWALL.x1 - TWALL.x0 + 3, 3, TP.cap);
    b.hline(TWALL.x0 - 1, TWALL.x1 + 1, 0, TP.capHi);
    b.hline(TWALL.x0 - 1, TWALL.x1 + 1, 2, TP.capLo);
    b.vline(TWALL.x0, TWALL.yTop, TWALL.yBot, TP.glass);
    b.vline(TWALL.x1, TWALL.yTop, TWALL.yBot, TP.glass);
    b.vline(TWALL.x0 - 1, TWALL.yTop + 1, TWALL.yBot - 2, TP.glassLo);
    b.set(TWALL.x0, TWALL.yTop + 1, TP.glassHi); b.set(TWALL.x0, TWALL.yTop + 2, TP.glassHi);
    b.hline(TWALL.x0, TWALL.x1, TWALL.yBot + 1, TP.glass);
    b.set(TWALL.x0 + 1, TWALL.yBot + 2, TP.glass); b.set(TWALL.x1 - 1, TWALL.yBot + 2, TP.glass);
    b.hline(TWALL.x0 + 1, TWALL.x1 - 1, TWALL.yBot + 3, TP.glassLo);
    return b;
  }
  const TUBESHELL = tubeShell();
  const tubeInnerH = TWALL.yBot - TWALL.yTop - 1;
  function tubeFrame(level) {
    const b = new PX(TW, TH);
    b.copy(TUBESHELL);
    const fillRows = Math.round(level * tubeInnerH);
    const topY = TWALL.yBot - fillRows;
    for (let y = TWALL.yTop + 1; y < TWALL.yBot; y++) {
      for (let x = TWALL.x0 + 1; x < TWALL.x1; x++) {
        if (y < topY) { b.set(x, y, TP.empty); continue; }
        const edge = x === TWALL.x0 + 1 || x === TWALL.x1 - 1;
        const meniscus = y === topY;
        b.set(x, y, meniscus ? TP.fluidEdge : edge ? TP.fluidLo : rngTube() < 0.08 ? TP.fluidHi : TP.fluid);
      }
    }
    return b;
  }

  // ---------------------------------------------------------------- state
  let wrap, courtCv, ballCv, tubeCv, madeEl, attEl, pctEl, raf = 0;
  let tubeCur = 0, tubeTarget = 0, tubeRaf = 0;
  let shot = null;                                   // {t0, dur, phase, make}
  let lastTotal = 0, lastCorrect = 0, primed = false;

  function paintTube() {
    if (!tubeCv) return;
    tubeFrame(tubeCur).toCanvas(tubeCv);
  }
  function stepTube() {
    const d = tubeTarget - tubeCur;
    if (Math.abs(d) < 0.003) { tubeCur = tubeTarget; paintTube(); tubeRaf = 0; return; }
    tubeCur += d * 0.12;
    paintTube();
    tubeRaf = requestAnimationFrame(stepTube);
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
    shot = { t0: performance.now(), dur: 520, phase: "fly", make, miss: make ? 0 : (rngTube() < 0.5 ? -9 : 9), deflectX: (rngTube() < 0.5 ? -1 : 1) * (14 + rngTube() * 10), deflectY: 6 + rngTube() * 8 };
    ballCv.style.opacity = 1;
    if (!raf) raf = requestAnimationFrame(tickShot);
  }

  function setStats(mcqAll) {
    const has = !!mcqAll && mcqAll.total > 0;
    if (madeEl) madeEl.textContent = has ? mcqAll.correct : "–";
    if (attEl) attEl.textContent = has ? mcqAll.total : "–";
    if (pctEl) pctEl.textContent = has ? mcqAll.pct + "%" : "–";
    tubeTarget = has ? mcqAll.pct / 100 : 0;
    if (reduceMotion || !tubeCv) { tubeCur = tubeTarget; paintTube(); }
    else if (!tubeRaf) tubeRaf = requestAnimationFrame(stepTube);
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
      <div class="fgboard-court">
        <canvas class="fgcourt" aria-hidden="true"></canvas>
        <canvas class="fgball" aria-hidden="true"></canvas>
      </div>
      <div class="fgboard-tubewrap">
        <canvas class="fgtube" aria-hidden="true"></canvas>
        <div class="fgboard-tubepct"><b>–</b></div>
      </div>
      <div class="fgboard-stats"><b class="made">–</b><span>/</span><b class="att">–</b></div>
      <div class="fgboard-cap">made / att</div>
    `;
    talk.append(wrap);
    courtCv = wrap.querySelector(".fgcourt"); ballCv = wrap.querySelector(".fgball"); tubeCv = wrap.querySelector(".fgtube");
    madeEl = wrap.querySelector(".made"); attEl = wrap.querySelector(".att"); pctEl = wrap.querySelector(".fgboard-tubepct b");
    courtCv.style.width = CW * S + "px"; courtCv.style.height = CH * S + "px";
    ballCv.style.width = BD * S + "px"; ballCv.style.height = BD * S + "px"; ballCv.style.opacity = 0;
    tubeCv.style.width = TW * S + "px"; tubeCv.style.height = TH * S + "px";
    wrap.style.top = TOP + "px";
    COURT.toCanvas(courtCv);
    BALL.toCanvas(ballCv);
    paintTube();
  }
  root.FgBoard = { mount, setStats, reveal };
  mount();
})(window);
