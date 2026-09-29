// Korn's room, 16-bit side view (his pick, 27 Sep): the desk under the curtained
// window with the laptop, Owala, monitor, plum blossom and the crowned lamp; the
// classical, the Strat and the bass at the end of the desk; the Orange amp under
// it; the oak bookcase on the left; the sticky-note wall with the crew notes.
(function (root) {
  "use strict";
  const { PX, C, mix, bayer } = root.PXL;
  const R = root.ROOM, P = R.P;
  const W = 320, H = 180, DESK = 124, FLOOR = 156;
  const LAMP = [228, 102];

  // state: { hour, blooms, lamp: 'on' | 'bright' }
  function base(state = {}) {
    const b = new PX(W, H);
    for (let y = 0; y < FLOOR; y++) for (let x = 0; x < W; x++) b.set(x, y, bayer(x, y) < 0.06 ? P.wallHi : x % 23 === 0 ? P.wall2 : P.wall);
    for (let y = FLOOR; y < H; y++) for (let x = 0; x < W; x++) b.set(x, y, (y - FLOOR) % 6 === 0 ? P.floorLine : (x + Math.floor((y - FLOOR) / 6) * 37) % 53 === 0 ? P.floorLine : bayer(x, y) < 0.15 ? P.floor2 : P.floor);
    b.hline(0, W - 1, FLOOR, P.deskDark);
    // window, the sky for this hour, curtains
    const win = { x: 88, y: 14, w: 126, h: 80 };
    b.rect(win.x - 3, win.y - 3, win.w + 6, win.h + 6, P.frame);
    R.nightWindow(b, win.x, win.y, win.w, win.h, state.hour ?? 22);
    b.vline(win.x + 63, win.y, win.y + win.h - 1, P.frame); b.hline(win.x, win.x + win.w - 1, win.y + 40, P.frame);
    b.rect(win.x - 5, win.y + win.h + 2, win.w + 10, 3, P.frame);
    R.curtains(b, 80, 11, 142, 104, 131, 171);
    R.bookcase(b, 2, 42, 66, 114);
    const crew = R.noteWall(b, 264, 0, 56, FLOOR);
    // desk
    b.rect(70, DESK, 194, 4, P.deskTop); b.hline(70, 263, DESK, P.deskHi);
    b.rect(70, DESK + 4, 194, 6, P.desk); b.hline(70, 263, DESK + 9, P.deskDark);
    [[74, 5], [256, 5]].forEach(([x, w]) => b.rect(x, DESK + 10, w, FLOOR - DESK - 10, P.desk));
    b.tint(70, FLOOR - 3, 194, 3, C("#000000"), 0.35);
    R.amp(b, 104, FLOOR, { lit: true });
    R.owala(b, 82, DESK);
    R.laptop(b, 104, DESK);
    R.monitor(b, 158, DESK);
    R.keyboard(b, 158, DESK);
    R.flower(b, 202, DESK, { blooms: state.blooms ?? 3 });
    R.deskBits(b, 246, DESK);
    b.blit(R.acousticSprite(), 246, FLOOR - 96, 0.1);
    b.blit(R.electricSprite(), 261, FLOOR - 102, 0.11);
    b.blit(R.bassSprite(), 278, FLOOR - 106, 0.12);
    // light: the lamp does the work; brighter while Crow is thinking
    const bright = state.lamp === "bright";
    b.glow(LAMP[0], LAMP[1], 118, C("#ffb45a"), bright ? 0.62 : 0.5, 5);
    b.glow(158, 96, 46, C("#6a9ad8"), 0.14, 3);
    b.glow(158, DESK + 1, 30, P.rgb, 0.3, 3, (x, y) => y >= DESK - 1 && y <= DESK + 5);
    R.lamp(b, LAMP[0], DESK, { on: 1 });
    b.glow(LAMP[0], 100, 26, C("#ffd88a"), bright ? 0.35 : 0.2, 3);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const d = Math.hypot((x - W * 0.6) / W, (y - H * 0.48) / H);
      const a = d > 0.62 ? 0.42 : d > 0.54 ? 0.28 : d > 0.47 ? 0.14 : 0;
      if (a) b.set(x, y, mix(b.get(x, y), C("#05070c"), a));
    }
    const cap = (k) => k[0].toUpperCase() + k.slice(1);
    return {
      b, win: { x: 131, y: win.y, w: 40, h: win.h }, crowAt: [181, DESK - 46],
      hotspots: [
        { id: "lamp", x: 214, y: 58, w: 30, h: 66, label: "Lamp", note: "Crow's thinking light. Click to dim the room." },
        { id: "flower", x: 192, y: 68, w: 22, h: 56, label: "Plum blossom", note: "One blossom per task you finish this week." },
        { id: "monitor", x: 127, y: 70, w: 62, h: 46, label: "Monitor", note: "Click for a fresh session." },
        { id: "bass", x: 278, y: 50, w: 42, h: 106, label: "Bass", note: "Jazz bass, sunburst, the yak on the guard." },
        { id: "electric", x: 262, y: 54, w: 16, h: 102, label: "Strat", note: "Behind the bass, where it lives." },
        { id: "guitar", x: 246, y: 60, w: 16, h: 96, label: "Classical guitar", note: "Nylon strings, slotted head." },
        { id: "amp", x: 90, y: 130, w: 28, h: 26, label: "Orange amp", note: "Crush, under the desk." },
        { id: "owala", x: 76, y: 90, w: 14, h: 34, label: "Owala", note: "Drink some water." },
        { id: "window", x: 131, y: 14, w: 40, h: 80, label: "Window", note: "Bangkok. The sky follows the hour; the rain follows the weather." },
        { id: "books", x: 2, y: 42, w: 66, h: 114, label: "Bookcase", note: "Reading: Siddhartha and Karamazov." },
        ...crew.map((c) => ({ id: "crew-" + c.key, x: c.x, y: c.y, w: c.w, h: c.h, label: cap(c.key), note: "Call " + cap(c.key) + " in.", crew: c.key })),
      ],
      mini: { x: 186, y: 50, w: 132, h: 76 },
    };
  }
  // per-frame: rain in the window gap (only when it's raining) and the crow on the monitor
  function anim(f, info, t, state = {}) {
    if (!state.still && state.rain) R.rain(f, info.win, t);
    const blink = state.pose === "idle" && Math.floor(t / 10) % 9 === 0;
    R.crow(f, info.crowAt[0], info.crowAt[1], blink ? "blink" : state.pose || "idle");
  }
  root.SCENE = { W, H, base, anim };
})(window);
