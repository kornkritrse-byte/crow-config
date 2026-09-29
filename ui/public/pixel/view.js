// The view out of Korn's window, from his photo (29 Sep): a big leafy tree in the
// middle, a brown tiled house behind it, three white towers far off on the left,
// a red tile roof and a white awning on the left, and the grey corrugated roof
// right under the window. The window spans the whole wall, wider than the photo,
// so the sides carry on the same street: more towers, a mid-rise block, a power
// pole and its wires, another tree, a house on the right. Painted every frame:
// the trees move in the wind (with gusts), and once it's dark the building
// windows light up and flicker.
(function (root) {
  "use strict";
  const { C, mix, bayer } = root.PXL;
  const R = root.ROOM, P = R.P;

  // integer hash → [0, 1)
  const hash = (a, b = 0, c = 0) => {
    let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  const SKY = {
    day:   { s0: "#5b8fd0", s1: "#a9c9e8", tint: "#000000", dark: 0 },
    dawn:  { s0: "#2a2c50", s1: "#d88a78", tint: "#2a2440", dark: 0.45 },
    dusk:  { s0: "#2e2450", s1: "#d0704c", tint: "#2a1a30", dark: 0.52 },
    night: { s0: "#0a1120", s1: "#1a2640", tint: "#070b16", dark: 0.8 },
  };
  // daylight colours; darkened toward the sky's tint for the hour
  const DAY = {
    tower: "#dfe2e6", towerSide: "#b9c0c8", towerRow: "#a2acb8",
    far: "#3c5a34", far2: "#2e4a2c",
    leafDark: "#2c4526", leaf: "#48683a", leafLit: "#7a9a4c", leafSun: "#a4b862", trunk: "#3a2c22",
    palm: "#5a7a3a",
    brownRoof: "#5a3a2c", brownRoof2: "#4a2e24", wall: "#d6c2a4", wallShade: "#b8a488", winDark: "#3a3430",
    white: "#e4e6e6", whiteShade: "#c2c6c8", redRoof: "#8a3e2e", redRoof2: "#6e2e22",
    block: "#cfc4b0", blockShade: "#b0a48e", rail: "#8a8478",
    awning: "#d8dcdc", awningRib: "#b4babc",
    tin: "#54575c", tinHi: "#686b70", tinLo: "#3c3e42", ridge: "#6a3e30",
    pole: "#6a6a66", wire: "#2a2a2c",
    cloud: "#eef4fa",
  };

  // The photo's own coordinates are 126 × 80; PHOTO_AT is where that strip sits
  // inside the full-wall view, so the tree stays behind the monitor where it was.
  const PHOTO_AT = 82;
  // trees: canopy clumps (cx, cy, rx, ry) back to front, in view coordinates; higher clumps sway more
  const BIG_TREE = [
    [58, 58, 12, 7], [110, 56, 12, 9], [84, 58, 21, 9], [66, 46, 15, 11], [102, 44, 16, 12],
    [116, 40, 8, 8], [84, 34, 18, 12], [68, 29, 10, 7], [96, 24, 12, 7], [80, 18, 7, 4],
  ].map(([x, ...r]) => [x + PHOTO_AT, ...r]);
  const LEFT_TREE = [[12, 56, 12, 7], [26, 54, 10, 8], [18, 46, 11, 8], [14, 40, 6, 5]];
  const RIGHT_TREE = [[246, 50, 9, 9], [240, 58, 10, 6]];
  // towers far off: [x0, x1, top]
  const TOWERS = [[31, 37, 33], [38, 45, 30], [86, 91, 27], [92, 98, 25], [100, 105, 28], [230, 238, 22]];
  // the mid-rise block on the left: x0, x1, top, floors every 4 rows
  const BLOCK = { x0: 46, x1: 74, top: 36 };
  // lit windows: [x, y] cells, each its own light on its own schedule
  const WINDOWS = [];
  TOWERS.forEach(([x0, x1, top]) => { for (let y = top + 2; y < 52; y += 2) for (let x = x0 + 1; x < x1; x += 2) WINDOWS.push([x, y, 1]); });
  for (let y = BLOCK.top + 3; y < 60; y += 4) for (let x = BLOCK.x0 + 2; x < BLOCK.x1 - 2; x += 4) WINDOWS.push([x, y], [x + 1, y]);
  [[36, 56], [37, 56], [52, 56], [53, 56], [114, 44], [115, 44], [120, 44], [121, 44], [114, 50], [115, 50], [2, 50], [3, 50]]
    .forEach(([x, y]) => WINDOWS.push([x + PHOTO_AT, y]));
  [[218, 46], [219, 46], [226, 46], [227, 46], [218, 52], [219, 52]].forEach((p) => WINDOWS.push(p));

  function shaded(k) {
    const tint = C(k.tint), out = {};
    for (const n in DAY) out[n] = mix(C(DAY[n]), tint, k.dark * (n === "cloud" ? 0.6 : 1));
    return out;
  }
  const cache = {};

  // paint the view into b at (ox, oy), w × h, for this hour, at frame t
  function view(b, ox, oy, w, h, hour, t = 0) {
    const key = R.skyFor(hour), k = SKY[key], c = cache[key] || (cache[key] = shaded(k));
    const s0 = C(k.s0), s1 = C(k.s1), dark = k.dark, A = PHOTO_AT;
    const set = (x, y, col) => { if (x >= 0 && y >= 0 && x < w && y < h) b.set(ox + x, oy + y, col); };
    const rect = (x, y, rw, rh, col) => { for (let j = 0; j < rh; j++) for (let i = 0; i < rw; i++) set(x + i, y + j, col); };
    const line = (x0, y0, x1, y1, col) => {
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
      for (let i = 0; i <= n; i++) set(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), col);
    };

    // sky
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const v = Math.max(0, (y - 8) / 46); set(x, y, bayer(x, y) < Math.min(1, v * v * 1.3) ? s1 : s0); }
    if (key === "night") {
      for (let i = 0; i < Math.round(w / 9); i++) {
        const sx = Math.floor(hash(i, 1) * w), sy = Math.floor(hash(i, 2) * 30);
        if (hash(i, Math.floor(t / 12)) > 0.15) set(sx, sy, mix(s0, C("#c8d4ec"), 0.6 + hash(i, 3) * 0.4));
      }
    } else {
      // wisps of cloud, drifting slowly to the right
      const drift = Math.floor(t / 45), span = w + 40;
      for (const [cx, cy, rx, ry] of [[A + 100, 8, 16, 3], [A + 110, 12, 9, 2], [A + 26, 38, 14, 2], [A + 58, 16, 7, 1.5], [30, 20, 12, 2], [228, 30, 10, 2]]) {
        for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let i = -rx; i <= rx; i++) {
          const u = i / rx, v = (y + 0.5 - cy) / ry, d = u * u + v * v;
          if (d > 1) continue;
          const x = (((cx + i + drift) % span) + span) % span - 20;
          if (bayer(x, y) < (1 - d) * 1.1) set(x, y, c.cloud);
        }
      }
    }

    const lit = (n) => {
      if (dark < 0.3) return false;
      const period = 300 + Math.floor(hash(n, 7) * 600), phase = Math.floor(hash(n, 8) * period);
      let on = hash(n, Math.floor((t + phase) / period)) < (key === "night" ? 0.5 : 0.3);
      // a few tired fluorescent tubes: now and then they stutter for a few seconds
      if (on && hash(n, 9) < 0.08 && hash(n, Math.floor(t / 50), 1) < 0.25) on = hash(n, t, 2) < 0.55;
      return on;
    };
    const litColour = (n) => (hash(n, 5) < 0.2 ? mix(P.litCool, C("#000000"), hash(n, Math.floor(t / 6), 3) * 0.35) : P.lit);

    // towers far off
    TOWERS.forEach(([x0, x1, top]) => {
      rect(x0, top, x1 - x0, 54 - top, c.tower);
      rect(x1 - 2, top, 2, 54 - top, c.towerSide);
      for (let y = top + 2; y < 52; y += 2) for (let x = x0 + 1; x < x1; x += 2) set(x, y, c.towerRow);
    });
    rect(A + 6, 24, 1, 3, c.towerSide);
    if (dark > 0.3 && Math.floor(t / 8) % 3 === 0) set(A + 6, 23, P.ruby);       // the antenna's warning light

    // tree line behind the houses (sways a little)
    const wind = Math.sin(t * 0.07) * (0.6 + 0.8 * Math.max(0, Math.sin(t * 0.011)));   // gusts come and go
    for (let x = 0; x < w; x++) {
      const top = 46 + Math.round(Math.sin(x * 0.35) * 2 + Math.sin(x * 0.13 + 1) * 2 + wind * 0.4 * Math.sin(x * 0.9));
      for (let y = top; y < 62; y++) set(x, y, bayer(x, y) < 0.3 ? c.far2 : c.far);
    }

    // the mid-rise block on the left: floors of balconies
    rect(BLOCK.x0, BLOCK.top, BLOCK.x1 - BLOCK.x0, 62 - BLOCK.top, c.block);
    rect(BLOCK.x1 - 3, BLOCK.top, 3, 62 - BLOCK.top, c.blockShade);
    for (let y = BLOCK.top + 5; y < 62; y += 4) rect(BLOCK.x0, y, BLOCK.x1 - BLOCK.x0, 1, c.rail);
    for (let y = BLOCK.top + 3; y < 60; y += 4) for (let x = BLOCK.x0 + 2; x < BLOCK.x1 - 2; x += 4) { set(x, y, c.winDark); set(x + 1, y, c.winDark); }

    // palm (photo, left)
    const pw = Math.round(wind * 1.2);
    for (let y = 48; y < 62; y++) set(A + 24, y, c.trunk);
    for (const [ex, ey] of [[-7, 3], [-5, -2], [0, -4], [5, -2], [7, 3], [-3, 4], [3, 4]]) line(A + 24, 47, A + 24 + ex + pw, 47 + ey, c.palm);

    // photo houses: white on the left, the brown tiled house behind the tree, white + red roof on the right
    rect(A, 46, 11, 16, c.white); rect(A, 44, 12, 2, c.redRoof);
    for (let y = 46; y < 53; y++) { const inset = Math.round((53 - y) * 0.7); rect(A + 28 + inset, y, 40 - inset * 2, 1, (y % 2) ? c.brownRoof : c.brownRoof2); }
    rect(A + 30, 53, 36, 9, c.wall); rect(A + 30, 53, 36, 1, c.wallShade);
    rect(A + 110, 40, 16, 22, c.white); rect(A + 110, 40, 2, 22, c.whiteShade);
    for (let y = 52; y < 57; y++) rect(A + 104 + (57 - y), y, 22, 1, (y % 2) ? c.redRoof : c.redRoof2);
    // past the photo, right: another white house under a red roof
    rect(214, 42, 18, 20, c.white); rect(230, 42, 2, 20, c.whiteShade);
    for (let y = 38; y < 43; y++) rect(212 - (y - 38), y, 22 + (y - 38) * 2, 1, (y % 2) ? c.redRoof : c.redRoof2);

    // windows: dark in the day (towers keep their rows), lit or not after dark
    WINDOWS.forEach(([x, y, tower], n) => {
      if (lit(n)) set(x, y, litColour(n));
      else if (!tower) set(x, y, c.winDark);
    });

    // trees, each clump swaying with the wind; the crown moves most
    const tree = (clumps, top, seed) => clumps.forEach(([cx, cy, rx, ry], i) => {
      const reach = 1 - (cy - top) / 48;
      const sx = Math.round(wind * (0.8 + reach * 1.8) + Math.sin(t * 0.13 + i + seed) * 0.4 * reach);
      const sy = Math.round(Math.abs(wind) * reach * 0.4);
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
          const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry, d = u * u + v * v;
          if (d > 1) continue;
          const n = hash(x, y, i + seed);
          if (d > 0.7 && n < 0.45) continue;                          // ragged leafy edge
          const light = -u * 0.45 - v * 0.8 + (n - 0.5) * 0.7;        // lit from the upper left
          let col = light > 0.75 ? c.leafSun : light > 0.2 ? c.leafLit : light > -0.45 ? c.leaf : c.leafDark;
          // leaves flip in the wind: a shimmer of light pixels that moves
          if (light > -0.2 && hash(x, y, Math.floor(t / 3) + i + seed) < 0.05 * (1 + Math.abs(wind))) col = c.leafSun;
          set(x + sx, y + sy, col);
        }
    });
    line(A + 80, 80, A + 81, 52, c.trunk); line(A + 81, 80, A + 82, 52, c.trunk);
    line(A + 81, 60, A + 70, 48, c.trunk); line(A + 81, 58, A + 94, 46, c.trunk);
    tree(BIG_TREE, 18, 0);
    line(19, 72, 19, 56, c.trunk);
    tree(LEFT_TREE, 40, 20);
    tree(RIGHT_TREE, 44, 40);

    // a power pole and its sagging wires, Bangkok-style
    rect(76, 30, 2, 42, c.pole); rect(72, 32, 10, 1, c.pole);
    for (const [x0, y0, x1, y1, sag] of [[0, 40, 73, 33, 4], [77, 33, w, 36, 6], [0, 44, 73, 36, 3], [81, 33, w, 41, 5]]) {
      for (let x = x0; x <= x1; x++) {
        const f = (x - x0) / Math.max(1, x1 - x0);
        set(x, Math.round(y0 + (y1 - y0) * f + sag * 4 * f * (1 - f)), c.wire);
      }
    }

    // foreground: the red tile roof (running on to the left wall), the white awning
    for (let y = 58; y < h; y++) {
      const reach = A + Math.min(44, Math.round((y - 58) * 3.2));
      for (let x = 0; x <= reach; x++) set(x, y, ((x + y * 2) % 5 === 0 || y % 3 === 0) ? c.redRoof2 : c.redRoof);
    }
    for (let y = 65; y < 77; y++) for (let x = A + 24 + Math.round((y - 65) * 0.3); x < A + 52 - Math.round((77 - y) * 0.2); x++) set(x, y, x % 3 === 0 ? c.awningRib : c.awning);

    // the grey corrugated roof right under the window, red ridge along its top
    rect(0, 71, w, 1, c.ridge);
    for (let y = 72; y < h; y++) for (let x = 0; x < w; x++) {
      const m = (x + Math.floor((y - 72) / 4)) % 5;
      set(x, y, y % 4 === 3 ? c.tinLo : m === 0 ? c.tinHi : m === 3 ? c.tinLo : c.tin);
    }
  }

  R.view = view;
})(window);
