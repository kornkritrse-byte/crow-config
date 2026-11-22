// The MCQ tube: a pixel test tube of green fluid sitting between the hoop and
// the book pile, level = rolling % correct over his last graded MCQs
// (bin/mcq.py, read into the board payload as board.mcq). Korn's ask, 22 Nov:
// "a percentage correct bar... like a tube with green fluid inside that moves
// up with percentage and down with lower." Same pixel aesthetic as the hoop.
// Hidden until the first MCQ card of the session goes up (body.mcq-active,
// set by app.js in mountMcq()); only shown with the gutters, same as the hoop.
(function (root) {
  "use strict";
  const { PX, C } = root.PXL;
  const S = 3;                                    // sprite pixel → screen px, same as the hoop/pile
  const W = 14, H = 44;                           // sprite size
  const TOP = 60 + 36 * S + 42;                    // just under the hoop + its score caption (HH*S=108, TOP=60 there too)
  const WALL = { x0: 2, x1: 11, yTop: 3, yBot: 40 };          // inner glass walls
  const P = {
    glass: C("#4a5a6a"), glassHi: C("#9fb2c2"), glassLo: C("#2a3744"),
    cap: C("#8c9baa"), capHi: C("#c7d6e2"), capLo: C("#5f6f80"),
    empty: C("#1a2430"),
    fluid: C("#2f9d58"), fluidHi: C("#6fe08a"), fluidLo: C("#176b38"), fluidEdge: C("#bdf5c9"),
  };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tubeShell() {
    const b = new PX(W, H);
    // the cap: a small steel collar
    b.rect(WALL.x0 - 1, 0, WALL.x1 - WALL.x0 + 3, 3, P.cap);
    b.hline(WALL.x0 - 1, WALL.x1 + 1, 0, P.capHi);
    b.hline(WALL.x0 - 1, WALL.x1 + 1, 2, P.capLo);
    // the glass walls + rounded foot
    b.vline(WALL.x0, WALL.yTop, WALL.yBot, P.glass);
    b.vline(WALL.x1, WALL.yTop, WALL.yBot, P.glass);
    b.vline(WALL.x0 - 1, WALL.yTop + 1, WALL.yBot - 2, P.glassLo);
    b.set(WALL.x0, WALL.yTop + 1, P.glassHi); b.set(WALL.x0, WALL.yTop + 2, P.glassHi);   // a thin highlight down the left edge
    b.hline(WALL.x0, WALL.x1, WALL.yBot + 1, P.glass);
    b.set(WALL.x0 + 1, WALL.yBot + 2, P.glass); b.set(WALL.x1 - 1, WALL.yBot + 2, P.glass);
    b.hline(WALL.x0 + 1, WALL.x1 - 1, WALL.yBot + 3, P.glassLo);
    return b;
  }
  const SHELL = tubeShell();
  const innerH = WALL.yBot - WALL.yTop - 1;        // rows of fluid the tube can hold
  const rng = root.PXL.rng(7);

  function frame(level) {                          // level 0..1
    const b = new PX(W, H);
    b.copy(SHELL);
    const fillRows = Math.round(level * innerH);
    const topY = WALL.yBot - fillRows;
    for (let y = WALL.yTop + 1; y < WALL.yBot; y++) {
      for (let x = WALL.x0 + 1; x < WALL.x1; x++) {
        if (y < topY) { b.set(x, y, P.empty); continue; }
        const edge = x === WALL.x0 + 1 || x === WALL.x1 - 1;
        const meniscus = y === topY;
        b.set(x, y, meniscus ? P.fluidEdge : edge ? P.fluidLo : rng() < 0.08 ? P.fluidHi : P.fluid);
      }
    }
    return b;
  }

  let canvas = null, label = null, sub = null, cur = 0, target = 0, raf = 0, hasData = false;

  function paint() {
    if (!canvas) return;
    frame(hasData ? cur : 0).toCanvas(canvas);
  }
  function step() {
    const d = target - cur;
    if (Math.abs(d) < 0.002) { cur = target; paint(); raf = 0; return; }
    cur += d * 0.12;
    paint();
    raf = requestAnimationFrame(step);
  }
  function setPct(mcq) {
    hasData = !!mcq && mcq.pct != null;
    target = hasData ? mcq.pct / 100 : 0;
    if (label) label.textContent = hasData ? mcq.pct + "%" : "—";
    if (sub) sub.textContent = hasData ? `${mcq.correct} of ${mcq.total}` : "no mcqs yet";
    if (hasData) document.body.classList.add("mcq-active");
    if (reduceMotion || !canvas) { cur = target; paint(); return; }
    if (!raf) raf = requestAnimationFrame(step);
  }
  function reveal() {                              // the first mcq card of the session: show the tube even before it's graded
    document.body.classList.add("mcq-active");
  }

  function mount() {
    const talk = document.querySelector(".talk"); if (!talk) return;
    const wrap = document.createElement("div");
    wrap.className = "mcqbar";
    wrap.title = "Rolling % correct over your last graded MCQs";
    wrap.innerHTML = `<canvas aria-hidden="true"></canvas><div class="mcqbar-score"><b></b><span></span></div>`;
    talk.append(wrap);
    canvas = wrap.querySelector("canvas");
    label = wrap.querySelector("b"); sub = wrap.querySelector("span");
    canvas.style.width = W * S + "px"; canvas.style.height = H * S + "px";
    wrap.style.top = TOP + "px";
    paint();
  }
  root.McqBar = { mount, setPct, reveal };
  mount();
})(window);
