// Korn's room, 16-bit side view (his pick, 27 Sep): the desk under the curtained
// window with the laptop, Owala, monitor, plum blossom and the crowned lamp; the
// classical, the Strat and the bass at the end of the desk; the Orange amp under
// it; the oak bookcase on the left; the sticky-note wall with the crew notes.
(function (root) {
  "use strict";
  const { PX, C, mix, bayer, pack, unpack } = root.PXL;
  const R = root.ROOM, P = R.P;
  const W = 320, H = 200, DESK = 124, FLOOR = 176;   // 200 tall since 29 Sep: room under the desk for the legs, the drawer and the amp
  const DRAWER = { x: 168, y: DESK + 10, w: 54, h: 12 }, CABINET = { x: 2, y: 156, w: 66, h: FLOOR - 156 };
  const LAMP = [228, 102];

  // the drawer under the desk: open, it drops forward and shows the papers inside (the artifact box)
  function drawer(b, open) {
    const { x, y, w, h } = DRAWER, brass = C("#c8a24a"), brassHi = C("#e8c66a");
    b.rect(x, y, w, 2, P.deskDark);                                   // runners under the desk top
    const fy = open ? y + 6 : y + 1;
    if (open) {
      b.rect(x + 2, y + 1, w - 4, 6, C("#140c08"));                   // inside the drawer
      const papers = ["#e8e2d4", "#f0d890", "#e8a8b8", "#a8c8e0", "#e8e2d4", "#c8e0b0", "#f0d890"];
      papers.forEach((c, i) => { const px = x + 5 + i * 7, ph = 3 + (i % 3); b.rect(px, y + 7 - ph, 5, ph, C(c)); b.hline(px, px + 4, y + 7 - ph, mix(C(c), C("#ffffff"), 0.4)); });
    }
    b.rect(x, fy, w, h - 1, P.desk);
    b.hline(x, x + w - 1, fy, P.deskHi); b.hline(x, x + w - 1, fy + h - 2, P.deskDark);
    b.vline(x, fy, fy + h - 2, P.deskDark); b.vline(x + w - 1, fy, fy + h - 2, P.deskDark);
    b.rect(x + 3, fy + 2, w - 6, h - 5, P.deskTop);                   // the front panel
    b.hline(x + 3, x + w - 4, fy + 2, P.deskHi);
    const hx = x + Math.floor(w / 2) - 5, hy = fy + Math.floor(h / 2) - 1;
    b.rect(hx, hy, 10, 2, brass); b.hline(hx, hx + 9, hy, brassHi); b.set(hx, hy + 2, P.deskDark); b.set(hx + 9, hy + 2, P.deskDark);
  }
  // the low cabinet under the bookcase: two doors that open out to both sides (empty for now)
  function cabinet(b, open) {
    const { x, y, w, h } = CABINET, mid = x + Math.floor(w / 2), knob = C("#e8d8b0");
    b.rect(x, y, w, h, P.oak); b.hline(x, x + w - 1, y, P.oakDark); b.rect(x, y + h - 2, w, 2, P.oakDark);
    if (open) {
      b.rect(x + 3, y + 2, w - 6, h - 5, P.oakBack);                  // the empty inside
      b.rect(x + 3, y + 9, w - 6, 1, P.oak2);                          // a shelf
      b.tint(x + 3, y + 2, w - 6, 3, C("#000000"), 0.35);
      // the doors swung out, seen edge-on at both sides
      b.rect(x - 2, y + 1, 4, h - 3, P.oak2); b.vline(x - 2, y + 1, y + h - 3, P.oakDark); b.set(x, y + 8, knob);
      b.rect(x + w - 2, y + 1, 4, h - 3, P.oak2); b.vline(x + w + 1, y + 1, y + h - 3, P.oakDark); b.set(x + w - 1, y + 8, knob);
    } else {
      for (const dx of [x + 3, mid + 1]) {
        const dw = mid - x - 4;
        b.rect(dx, y + 2, dw, h - 5, P.oak2);
        b.rect(dx + 2, y + 4, dw - 4, h - 9, P.oak); b.hline(dx + 2, dx + dw - 3, y + h - 6, P.oakDark);
      }
      b.vline(mid, y + 2, y + h - 4, P.oakDark);
      b.rect(mid - 3, y + 8, 2, 2, knob); b.rect(mid + 2, y + 8, 2, 2, knob);
    }
  }

  // state: { hour, blooms, lamp: 'on' | 'bright', drawer, cabinet }; paintView fills the window glass
  function build(state, paintView) {
    const b = new PX(W, H);
    for (let y = 0; y < FLOOR; y++) for (let x = 0; x < W; x++) b.set(x, y, bayer(x, y) < 0.06 ? P.wallHi : x % 23 === 0 ? P.wall2 : P.wall);
    for (let y = FLOOR; y < H; y++) for (let x = 0; x < W; x++) b.set(x, y, (y - FLOOR) % 6 === 0 ? P.floorLine : (x + Math.floor((y - FLOOR) / 6) * 37) % 53 === 0 ? P.floorLine : bayer(x, y) < 0.15 ? P.floor2 : P.floor);
    b.hline(0, W - 1, FLOOR, P.deskDark);
    // window, the sky for this hour, curtains
    const win = { x: 88, y: 14, w: 126, h: 80 };
    b.rect(win.x - 3, win.y - 3, win.w + 6, win.h + 6, P.frame);
    paintView(b, win);
    b.vline(win.x + 63, win.y, win.y + win.h - 1, P.frame); b.hline(win.x, win.x + win.w - 1, win.y + 40, P.frame);
    b.rect(win.x - 5, win.y + win.h + 2, win.w + 10, 3, P.frame);
    R.curtains(b, 80, 11, 142, 104, 131, 171);
    R.bookcase(b, 2, 42, 66, 114);
    cabinet(b, !!state.cabinet);
    const crew = R.noteWall(b, 264, 0, 56, FLOOR);
    // desk
    b.rect(70, DESK, 194, 4, P.deskTop); b.hline(70, 263, DESK, P.deskHi);
    b.rect(70, DESK + 4, 194, 6, P.desk); b.hline(70, 263, DESK + 9, P.deskDark);
    [[74, 5], [256, 5]].forEach(([x, w]) => { b.rect(x, DESK + 10, w, FLOOR - DESK - 10, P.desk); b.vline(x, DESK + 10, FLOOR - 1, P.deskHi); });
    drawer(b, !!state.drawer);
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
      b, glass: win, win: { x: 131, y: win.y, w: 40, h: win.h }, crowAt: [181, DESK - 46],
      hotspots: [
        { id: "lamp", x: 214, y: 58, w: 30, h: 66, label: "Lamp", note: "Crow's thinking light. Click to dim the room." },
        { id: "flower", x: 192, y: 68, w: 22, h: 56, label: "Plum blossom", note: "One blossom per task you finish this week." },
        { id: "monitor", x: 127, y: 70, w: 62, h: 46, label: "Monitor", note: "Click for a fresh session." },
        { id: "bass", x: 278, y: FLOOR - 106, w: 42, h: 106, label: "Bass", note: "Jazz bass, sunburst, the yak on the guard." },
        { id: "electric", x: 262, y: FLOOR - 102, w: 16, h: 102, label: "Strat", note: "Behind the bass, where it lives." },
        { id: "guitar", x: 246, y: FLOOR - 96, w: 16, h: 96, label: "Classical guitar", note: "Nylon strings, slotted head." },
        { id: "amp", x: 90, y: FLOOR - 26, w: 28, h: 26, label: "Orange amp", note: "Crush, under the desk." },
        { id: "owala", x: 76, y: 90, w: 14, h: 34, label: "Owala", note: "Drink some water." },
        { id: "window", x: 131, y: 14, w: 40, h: 80, label: "Window", note: "The view from your room. The tree moves with the wind; the sky follows the hour, the rain the weather." },
        { id: "books", x: 2, y: 42, w: 66, h: 114, label: "Bookcase", note: "Reading: Siddhartha and Karamazov." },
        { id: "drawer", ...DRAWER, label: "Desk drawer", note: "Everything Crow has built you. Click to open." },
        { id: "cabinet", ...CABINET, label: "Cabinet", note: "Two doors, empty for now. You'll find a use." },
        ...crew.map((c) => ({ id: "crew-" + c.key, x: c.x, y: c.y, w: c.w, h: c.h, label: cap(c.key), note: "Call " + cap(c.key) + " in.", crew: c.key })),
      ],
      mini: { x: 186, y: 50, w: 132, h: 76 },
    };
  }
  // The view out of the window moves (the tree in the wind, lights at night), but the
  // lamp glow, curtains, frame, vignette and whatever stands in front all sit on top
  // of it. Every one of those is affine per channel in the glass colour, so building
  // the room once with black glass and once with white gives, per pixel, out = B + S·glass.
  function base(state = {}) {
    const hour = state.hour ?? 22;
    const info = build(state, (b, g) => R.view(b, g.x, g.y, g.w, g.h, hour, 0));
    const black = build(state, (b, g) => b.rect(g.x, g.y, g.w, g.h, C("#000000"))).b;
    const white = build(state, (b, g) => b.rect(g.x, g.y, g.w, g.h, C("#ffffff"))).b;
    const g = info.glass, n = g.w * g.h, B = new Uint8Array(n * 3), S = new Int16Array(n * 3), open = new Uint8Array(n);
    for (let j = 0; j < g.h; j++) for (let i = 0; i < g.w; i++) {
      const k = j * g.w + i, lo = unpack(black.get(g.x + i, g.y + j)), hi = unpack(white.get(g.x + i, g.y + j));
      for (let ch = 0; ch < 3; ch++) { B[k * 3 + ch] = lo[ch]; S[k * 3 + ch] = hi[ch] - lo[ch]; if (hi[ch] - lo[ch] > 2) open[k] = 1; }
    }
    info.view = { hour, B, S, open, buf: new PX(g.w, g.h) };
    return info;
  }
  // per-frame: the view, rain in the window gap (only when it's raining), the crow on the monitor
  function anim(f, info, t, state = {}) {
    if (!state.still && info.view) {
      const g = info.glass, v = info.view;
      R.view(v.buf, 0, 0, g.w, g.h, v.hour, t);
      for (let j = 0; j < g.h; j++) for (let i = 0; i < g.w; i++) {
        const k = j * g.w + i;
        if (!v.open[k]) continue;
        const p = unpack(v.buf.d[k]), o = k * 3;
        f.d[(g.y + j) * f.w + g.x + i] = pack(v.B[o] + (v.S[o] * p[0]) / 255, v.B[o + 1] + (v.S[o + 1] * p[1]) / 255, v.B[o + 2] + (v.S[o + 2] * p[2]) / 255);
      }
    }
    if (!state.still && state.rain) R.rain(f, info.win, t);
    const blink = state.pose === "idle" && Math.floor(t / 10) % 9 === 0;
    R.crow(f, info.crowAt[0], info.crowAt[1], blink ? "blink" : state.pose || "idle");
  }
  root.SCENE = { W, H, base, anim };
})(window);
