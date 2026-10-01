// Korn's room, object by object, drawn from his photos (27 Sep 2026).
// Pixel art authored in code: every mark is a whole pixel on a small buffer,
// scaled up with image-rendering: pixelated.
// Every sprite takes a bottom-centre anchor (cx, by) in scene pixels.
(function (root) {
  "use strict";
  const { PX, C, mix, bayer, rng } = root.PXL;

  const P = {
    // room
    wall: C("#1a2231"), wall2: C("#161d2a"), wallHi: C("#222c3d"),
    floor: C("#1c1310"), floor2: C("#24181300".slice(0, 7)), floorLine: C("#120c0a"),
    desk: C("#2e1c15"), deskTop: C("#43291e"), deskHi: C("#5e3b2a"), deskDark: C("#1d110c"),
    oak: C("#c9a877"), oak2: C("#b18f5e"), oakDark: C("#8a6a44"), oakBack: C("#6b5134"),
    panel: C("#5b3622"), panel2: C("#4b2c1b"), panelGrain: C("#6d4329"),
    // window + city
    sky0: C("#0a1120"), sky1: C("#13213a"), skyGlow: C("#3a2a3a"), bld: C("#080c16"), bld2: C("#0d1320"),
    lit: C("#e8b65a"), litCool: C("#9ab8d8"), rain: C("#7f9ab8"), frame: C("#2a303c"), curtain: C("#c9cfdb"),
    // lamp
    amb0: C("#ffe9a8"), amb1: C("#ffc56a"), amb2: C("#f09a3c"), amb3: C("#c96a22"), amb4: C("#8a4214"), weave: C("#6a3210"), brass: C("#b89a5a"), brassD: C("#7a6436"),
    velvet: C("#3a1030"), velvet2: C("#5a1a48"), gold: C("#e2b440"), gold2: C("#f6db86"), goldD: C("#9a7422"), ruby: C("#d23040"), sapph: C("#3a5ad8"),
    // plum blossom
    petal: C("#e0443a"), petalHi: C("#ff7a5c"), petalD: C("#a82a2a"), bud: C("#e05a9a"), budD: C("#a83a70"), stamen: C("#f5d23a"), branch: C("#4a2a1c"), branch2: C("#6a3e28"),
    pot: C("#a2a8b0"), potHi: C("#cfd3d8"), potD: C("#70767e"), potGold: C("#c9a040"), stand: C("#7a3a1e"), stand2: C("#9a4e28"),
    // bass
    sb0: C("#f0a038"), sb1: C("#c8641c"), sb2: C("#7a2c10"), sb3: C("#2a120a"), relic: C("#e8d2a8"), relicD: C("#c8ad80"),
    pearl: C("#ebe6dc"), pearl2: C("#d2ccc0"), yakR: C("#d23a44"), yakG: C("#e8b030"), yakGr: C("#3aa060"), chrome: C("#c8ccd2"), chromeD: C("#8a9098"),
    rose: C("#3a2418"), maple: C("#d9a860"), mapleD: C("#b08040"), black: C("#101114"), dot: C("#e8e4dc"),
    // acoustic
    ac0: C("#e4ae68"), ac1: C("#cc8c4c"), ac2: C("#a86a30"), ac3: C("#4a2610"), hole: C("#140c06"), rosette: C("#8a2a1a"),
    // amp
    or0: C("#f59a2a"), or1: C("#e07e14"), or2: C("#b85e0c"), grille: C("#e2c08e"), grille2: C("#c8a472"), ampBlk: C("#141416"), white: C("#f2efe8"),
    // tech
    bezel: C("#0b0d11"), screen: C("#0f1928"), screenLine: C("#2a3a52"), maroon: C("#7a2436"), maroonHi: C("#c86a7a"),
    kb: C("#101319"), key: C("#262c38"), rgb: C("#3aa0ff"), rgb2: C("#7ac8ff"), lap: C("#1e2026"), lapScreen: C("#0c1016"),
    // crow
    crow: C("#0c0d12"), crow2: C("#26222e"), crowSheen: C("#3a2030"), beak: C("#2c2c34"), eye: C("#f2efe8"),
    // bits
    jarGlass: C("#6a7a88"), candy1: C("#c05a2a"), candy2: C("#e0b030"), candy3: C("#7a3a2a"), lid: C("#b08040"),
    cactus: C("#b8d85a"), cactusD: C("#86a83a"), cpot: C("#e07a2a"), pen: C("#d8dce2"), balm: C("#8ac040"), balmL: C("#e8d040"),
    note: C("#efe39a"), noteD: C("#d8cc84"), note2: C("#f2b8c8"), note2D: C("#dca0b2"), ink: C("#8a7a50"),
    ball: C("#d86a2a"), ballD: C("#9a4418"), lav: C("#9a7ac0"), lavD: C("#6a5090"), vase: C("#b8c8d0"),
  };
  // crew colours (Crow Room tokens)
  const CREW = { sol: C("#d9b46c"), persi: C("#e0714f"), artis: C("#6fc2a8"), vera: C("#c4ccd8"), vex: C("#5fa8d3") };

  // ---------------------------------------------------------------- lamp (woven bamboo egg + velvet crown)
  function lamp(b, cx, by, o = {}) {
    const on = o.on ?? 1;
    b.rect(cx - 6, by - 2, 13, 2, P.brassD); b.rect(cx - 5, by - 3, 11, 1, P.brass);
    const h = 40, top = by - 3 - h, bulbX = cx, bulbY = by - 15;
    for (let y = top; y < by - 3; y++) {
      const t = (y - top) / h;                       // 0 top → 1 bottom
      const hw = 12.5 * Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.56) / 0.56, 2))) * (0.92 + 0.08 * t);
      for (let x = Math.round(cx - hw); x <= Math.round(cx + hw); x++) {
        const edge = Math.abs(x + 0.5 - cx) > hw - 1.2 || y === top;
        const d = Math.hypot(x + 0.5 - bulbX, (y + 0.5 - bulbY) * 0.8);
        const strip = (x + y) % 4 === 0 || (x - y + 400) % 4 === 0;
        let c;
        if (!on) c = strip ? P.weave : edge ? P.amb4 : P.amb3;
        else if (edge) c = P.amb4;
        else if (strip) c = d < 6 ? P.amb1 : d < 11 ? P.amb3 : P.amb4;
        else c = d < 4 + bayer(x, y) * 2 ? P.amb0 : d < 9 ? P.amb1 : d < 15 + bayer(x, y) * 3 ? P.amb2 : P.amb3;
        b.set(x, y, c);
      }
    }
    // the crown he keeps on it
    const ct = top - 1;
    b.ellipse(cx + 1, ct - 5, 9, 6, (x, y, u, v) => (v < -0.2 && u < 0.2 ? P.velvet2 : P.velvet));
    b.rect(cx - 8, ct - 3, 17, 4, P.gold); b.hline(cx - 8, cx + 8, ct - 3, P.gold2); b.hline(cx - 8, cx + 8, ct, P.goldD);
    [[-6, P.ruby], [-2, P.sapph], [2, P.ruby], [6, P.sapph]].forEach(([dx, c]) => b.set(cx + dx, ct - 2, c));
    [-7, -3, 1, 5, 8].forEach((dx, i) => { b.vline(cx + dx, ct - 6 - (i % 2), ct - 4, P.gold); b.set(cx + dx, ct - 7 - (i % 2), P.gold2); });
    b.set(cx + 4, ct - 11, P.gold2); b.vline(cx + 4, ct - 10, ct - 8, P.gold); b.set(cx + 3, ct - 10, P.gold); b.set(cx + 5, ct - 10, P.gold);
    return { glowX: bulbX, glowY: bulbY, top: ct - 11 };
  }

  // ---------------------------------------------------------------- lego plum blossom
  function blossom(b, x, y, open) {
    if (!open) { b.set(x, y, P.bud); b.set(x + 1, y, P.budD); b.set(x, y - 1, P.bud); return; }
    b.ellipse(x + 0.5, y + 0.5, 3.2, 3.2, (X, Y, u, v) => (u + v < -0.6 ? P.petalHi : u + v > 0.9 ? P.petalD : P.petal));
    b.set(x, y, P.stamen); b.set(x + 1, y - 1, P.stamen); b.set(x - 1, y - 1, P.stamen);
  }
  // where the blossoms open, in order: the six main ones, then seven more for a long goal list
  const flowerSpots = (cx, by) => [[cx, by - 18], [cx - 6, by - 31], [cx + 6, by - 38], [cx + 3, by - 27], [cx + 1, by - 44], [cx + 8, by - 22],
    [cx - 5, by - 54], [cx - 3, by - 50], [cx - 9, by - 27], [cx + 10, by - 24], [cx + 8, by - 40], [cx - 2, by - 40], [cx + 4, by - 33]];
  // o.slots: one bud per goal today (o.blooms of them open); without it, the old six + seven buds
  function flower(b, cx, by, o = {}) {
    const blooms = o.blooms ?? 5, slots = o.slots;
    b.rect(cx - 6, by - 2, 13, 2, P.stand); b.hline(cx - 5, cx + 5, by - 3, P.stand2); b.set(cx - 6, by - 1, P.branch); b.set(cx + 6, by - 1, P.branch);
    b.rect(cx - 5, by - 9, 11, 6, P.pot); b.vline(cx - 4, by - 9, by - 4, P.potHi); b.vline(cx + 5, by - 9, by - 4, P.potD); b.hline(cx - 5, cx + 5, by - 5, P.potGold);
    b.rect(cx - 3, by - 13, 7, 4, P.pot); b.vline(cx - 2, by - 13, by - 10, P.potHi); b.hline(cx - 3, cx + 3, by - 13, P.potD);
    // branches (from his photo: one tall arc to the upper left, two side arms)
    const br = [[cx, by - 13, cx + 1, by - 22], [cx + 1, by - 22, cx - 1, by - 30], [cx - 1, by - 30, cx + 2, by - 38], [cx + 2, by - 38, cx - 1, by - 46], [cx - 1, by - 46, cx - 5, by - 54],
      [cx + 1, by - 22, cx + 7, by - 20], [cx + 7, by - 20, cx + 9, by - 23], [cx - 1, by - 28, cx - 7, by - 30], [cx - 7, by - 30, cx - 8, by - 26], [cx + 2, by - 36, cx + 7, by - 39]];
    br.forEach(([a, c, d, e], i) => b.line(a, c, d, e, i % 3 ? P.branch : P.branch2));
    const spots = flowerSpots(cx, by);
    if (slots != null) return spots.slice(0, slots).forEach(([x, y], i) => blossom(b, x, y, i < blooms));
    spots.slice(0, 6).forEach(([x, y], i) => blossom(b, x, y, i < blooms));
    spots.slice(6).forEach(([x, y]) => blossom(b, x, y, false));
  }

  // ---------------------------------------------------------------- relic sunburst J-bass with the yak sticker
  function bassSprite() {
    const s = new PX(34, 106);
    const cx = 17;
    // headstock (maple), tuners on the top side, the bead charm he hangs off it
    s.poly([[15, 0], [21, 1], [22, 4], [20, 12], [15, 14]], P.maple); s.vline(21, 2, 10, P.mapleD); s.set(16, 1, C("#f0c888"));
    [2, 5, 8, 11].forEach((y) => { s.set(14, y, P.chromeD); s.set(13, y, P.chrome); });
    [P.ruby, P.gold, P.cactus, P.sapph, P.petal, P.gold, P.cactus].forEach((c, i) => s.set(22 + (i > 3 ? 1 : 0), 11 + i, c));
    // neck: maple edges, rosewood board, white dots
    for (let y = 14; y < 66; y++) { s.set(15, y, P.maple); s.set(16, y, P.rose); s.set(17, y, P.rose); s.set(18, y, P.mapleD); }
    [22, 31, 39, 46, 52, 57].forEach((y) => { s.set(16, y, P.dot); });
    s.set(16, 46, P.dot); s.set(17, 46, P.dot);
    // offset-waist body, 3-tone sunburst
    const burst = (x, y) => {
      const d = Math.hypot((x + 0.5 - 17.5) / 15, (y + 0.5 - 88) / 16) + (bayer(x, y) - 0.5) * 0.06;
      return d < 0.5 ? P.sb0 : d < 0.72 ? P.sb1 : d < 0.9 ? P.sb2 : P.sb3;
    };
    s.ellipse(17.5, 91, 15.5, 13.5, burst);
    s.ellipse(16, 76, 11.5, 10.5, burst);
    s.poly([[5, 74], [2.5, 62], [5, 58], [9.5, 62], [12, 70]], burst);    // upper horn
    s.poly([[24, 72], [26.5, 64], [29.5, 66], [29, 78]], burst);           // lower horn
    // relic wear, down to the raw wood
    [[3, 61], [3, 62], [4, 63], [4, 64], [5, 66], [3, 88], [3, 89], [2, 92], [3, 93], [4, 97], [7, 101], [8, 102], [28, 96], [30, 90], [31, 89], [27, 67], [28, 68]].forEach(([x, y], i) => { s.set(x, y, i % 3 ? P.relic : P.relicD); if (i % 2) s.set(x + 1, y, P.relicD); });
    // pearl pickguard
    s.poly([[10, 67], [13, 65], [21, 65], [24, 69], [23, 78], [19, 82], [12, 82], [9.5, 76]], (x, y) => (bayer(x, y) < 0.3 ? C("#c4baa2") : C("#d8cfb8")));
    // the yak (Thai giant) mask sticker: gold crown, red face, green eyes, fangs
    s.hline(15, 19, 68, P.yakG); s.set(17, 67, P.yakG); s.set(15, 67, P.yakG); s.set(19, 67, P.yakG);
    s.rect(14, 69, 7, 5, P.yakR); s.set(15, 70, P.yakGr); s.set(19, 70, P.yakGr); s.hline(16, 18, 72, P.black); s.set(15, 73, P.white); s.set(19, 73, P.white);
    s.set(13, 70, P.yakG); s.set(21, 70, P.yakG);
    // pickups, bridge, control plate + knobs, strings
    s.rect(12, 79, 10, 2, P.black); s.rect(13, 90, 10, 2, P.black);
    s.rect(14, 97, 7, 2, P.chrome); s.hline(14, 20, 98, P.chromeD);
    s.poly([[23, 85], [27, 83], [29, 92], [25, 95]], P.chromeD); s.set(25, 87, P.black); s.set(26, 90, P.black); s.set(26, 93, P.black);
    for (let y = 66; y < 97; y++) if (y % 2) { s.set(16, y, P.chrome); s.set(18, y, P.chromeD); }
    return s;
  }
  // ---------------------------------------------------------------- classical acoustic (slotted headstock)
  function acousticSprite() {
    const s = new PX(32, 96);
    const cx = 16;
    s.rect(cx - 3, 0, 7, 14, P.ac2); s.vline(cx - 1, 2, 12, P.hole); s.vline(cx + 1, 2, 12, P.hole);
    [3, 7, 11].forEach((y) => { s.set(cx - 4, y, P.pearl); s.set(cx + 4, y, P.pearl); });
    for (let y = 14; y < 50; y++) { s.set(cx - 2, y, P.ac2); s.set(cx - 1, y, P.rose); s.set(cx, y, P.rose); s.set(cx + 1, y, P.ac3); }
    for (let y = 18; y < 50; y += 4) { s.set(cx - 1, y, P.chromeD); s.set(cx, y, P.chromeD); }
    const body = (x, y) => { const d = Math.hypot(x + 0.5 - cx, (y + 0.5 - 70) * 0.8) + (bayer(x, y) - 0.5) * 1.5; return d < 8 ? P.ac0 : d < 12.5 ? P.ac1 : d < 14.5 ? P.ac2 : P.ac3; };
    s.ellipse(cx, 79, 15, 15.5, body); s.ellipse(cx, 58, 11.5, 11, body);
    s.ellipse(cx, 59, 5, 5, P.rosette); s.ellipse(cx, 59, 3.8, 3.8, P.hole);
    s.rect(cx - 5, 83, 10, 3, P.ac3); s.hline(cx - 4, cx + 3, 83, P.rose);
    for (let y = 50; y < 83; y += 2) { s.set(cx - 1, y, P.pearl2); s.set(cx, y + 1, P.pearl2); }
    return s;
  }

  // ---------------------------------------------------------------- the Strat: dark burst, white guard, maple neck
  function electricSprite() {
    const s = new PX(32, 102);
    const cx = 16;
    // maple headstock, 6-in-line tuners, the sticker
    s.poly([[14, 0], [20, 0], [21, 3], [19, 16], [14, 17]], P.maple); s.vline(20, 1, 12, P.mapleD);
    [2, 4, 6, 8, 10, 12].forEach((y) => s.set(13, y, P.chrome));
    s.rect(16, 6, 2, 4, C("#f2efe8")); s.set(16, 7, C("#2a2a30"));
    // maple board, black dots
    for (let y = 17; y < 66; y++) { s.set(14, y, P.maple); s.set(15, y, P.maple); s.set(16, y, P.maple); s.set(17, y, P.mapleD); }
    [26, 34, 41, 48, 55, 62].forEach((y) => s.set(15, y, P.black)); s.set(16, 55, P.black);
    // double-cut body: deep red-black burst
    const burst = (x, y) => { const d = Math.hypot((x + 0.5 - 16) / 13, (y + 0.5 - 84) / 15) + (bayer(x, y) - 0.5) * 0.08; return d < 0.45 ? C("#6a2a20") : d < 0.7 ? C("#4a1a18") : d < 0.88 ? C("#2e1012") : C("#16080a"); };
    s.ellipse(16, 87, 13.5, 13, burst);
    s.ellipse(15, 74, 10.5, 9, burst);
    s.poly([[5, 72], [4, 62], [7, 60], [11, 66]], burst);   // bass-side horn
    s.poly([[21, 68], [24, 58], [27, 60], [27, 72]], burst); // treble horn (longer)
    // white pickguard + three single coils + knobs + switch
    s.poly([[8, 68], [12, 64], [20, 64], [24, 68], [25, 88], [22, 94], [18, 93], [12, 90], [9, 84], [8, 76]], (x, y) => (bayer(x, y) < 0.2 ? C("#d8d2c2") : C("#ece6d6")));
    [72, 79, 86].forEach((y, i) => { s.rect(12 + (i === 2 ? 1 : 0), y, 7, 2, C("#e8d8b0")); s.hline(12 + (i === 2 ? 1 : 0), 18 + (i === 2 ? 1 : 0), y + 1, C("#c8b88a")); });
    [[21, 84], [22, 88], [20, 91]].forEach(([x, y]) => s.set(x, y, C("#f2efe8")));
    s.set(22, 80, C("#2a2a30")); s.set(23, 79, C("#2a2a30"));
    // bridge + jack plate + strings
    s.rect(12, 94, 8, 2, P.chrome); s.hline(12, 19, 95, P.chromeD);
    s.set(24, 96, P.chromeD); s.set(25, 97, P.chrome);
    for (let y = 66; y < 94; y++) if (y % 2) { s.set(15, y, P.chrome); s.set(16, y + 1, P.chromeD); }
    return s;
  }
  // ---------------------------------------------------------------- his Owala: navy, white paisley, pink band, grey flip lid
  function owala(b, cx, by) {
    const navy = C("#232a40"), navy2 = C("#1a2032"), print = C("#c8ccd8"), pink = C("#e8a49a"), lid = C("#2c3140"), cap = C("#d6d0c4"), capD = C("#a8a296");
    b.rect(cx - 4, by - 22, 9, 22, navy); b.vline(cx + 4, by - 22, by - 1, navy2); b.vline(cx - 4, by - 22, by - 1, C("#2e3652"));
    const r = rng(33);
    for (let y = by - 20; y < by - 1; y++) for (let x = cx - 3; x < cx + 4; x++) if (r() < 0.2) b.set(x, y, print);
    [[cx - 1, by - 15], [cx + 1, by - 8]].forEach(([x, y]) => { b.set(x, y, print); b.set(x - 1, y, print); b.set(x + 1, y, print); b.set(x, y - 1, print); b.set(x, y + 1, print); b.set(x, y, navy); });
    b.hline(cx - 4, cx + 4, by - 1, C("#141828"));
    b.rect(cx - 4, by - 24, 9, 2, pink);
    b.rect(cx - 4, by - 28, 9, 4, lid); b.hline(cx - 3, cx + 3, by - 28, C("#3a4052"));
    b.rect(cx - 2, by - 31, 6, 3, cap); b.hline(cx - 2, cx + 3, by - 29, capD); b.set(cx, by - 27, cap); b.set(cx, by - 26, capD);
    b.hline(cx - 3, cx + 4, by - 32, C("#1a1e2a")); b.set(cx - 4, by - 31, C("#1a1e2a")); b.set(cx + 5, by - 31, C("#1a1e2a"));
  }
  // ---------------------------------------------------------------- Orange Crush combo
  function amp(b, cx, by, o = {}) {
    const w = 28, h = 24, x = cx - 14, y = by - h;
    b.rect(x + 9, y - 2, 10, 2, P.ampBlk);
    b.rect(x, y, w, h, P.or1); b.hline(x, x + w - 1, y, P.or0); b.vline(x, y, y + h - 1, P.or0); b.hline(x, x + w - 1, y + h - 1, P.or2); b.vline(x + w - 1, y, y + h - 1, P.or2);
    b.rect(x + 3, y + 3, w - 6, h - 6, P.grille);
    for (let j = y + 3; j < y + h - 3; j++) for (let i = x + 3; i < x + w - 3; i++) if ((i + j) % 2 === 0 && (Math.floor(i / 2) + Math.floor(j / 2)) % 2 === 0) b.set(i, j, P.grille2);
    [[x, y], [x + w - 3, y], [x, y + h - 3], [x + w - 3, y + h - 3]].forEach(([a, c]) => b.rect(a, c, 3, 3, P.ampBlk));
    b.rect(cx - 5, by - 8, 10, 3, P.white); b.hline(cx - 4, cx + 3, by - 7, P.or1);
    b.rect(cx - 1, y + 6, 3, 3, P.white); b.set(cx, y + 7, P.ruby);
    if (o.lit) b.set(x + w - 5, y + 1, P.ruby);
  }
  // ---------------------------------------------------------------- desk tech
  function monitor(b, cx, by, o = {}) {
    const w = 62, h = 38, x = cx - 31, y = by - 8 - h;
    b.rect(cx - 10, by - 2, 21, 2, P.lap); b.rect(cx - 2, by - 9, 5, 7, P.lap);
    b.rect(x, y, w, h, P.bezel);
    b.rect(x + 2, y + 2, w - 4, h - 5, P.screen);
    if (o.ui !== false) {
      // a tiny Crow Room on the screen: rail, chat lines, board
      b.rect(x + 3, y + 3, 5, h - 7, C("#0c1320")); b.rect(x + w - 15, y + 3, 12, h - 7, C("#0c1320"));
      [6, 10, 14, 18].forEach((dy, i) => b.set(x + 5, y + dy, [CREW.sol, CREW.persi, CREW.artis, CREW.vera][i]));
      [[8, 30], [12, 22], [16, 28], [22, 18], [26, 25]].forEach(([dy, len], i) => b.hline(x + 12, x + 12 + len, y + dy, i === 3 ? P.maroonHi : P.screenLine));
      b.rect(x + 11, y + h - 9, 34, 3, C("#1a2638"));
      b.rect(x + w - 13, y + 5, 8, 3, P.screenLine);
    }
  }
  function laptop(b, cx, by) {
    b.poly([[cx - 20, by], [cx + 20, by], [cx + 18, by - 3], [cx - 18, by - 3]], P.lap);
    b.hline(cx - 16, cx + 16, by - 2, P.key);
    b.poly([[cx - 18, by - 3], [cx + 16, by - 3], [cx + 13, by - 29], [cx - 21, by - 29]], P.bezel);
    b.poly([[cx - 16, by - 5], [cx + 14, by - 5], [cx + 11.5, by - 27], [cx - 18.5, by - 27]], P.lapScreen);
    b.set(cx - 2, by - 16, P.dot); b.set(cx - 1, by - 16, P.dot); b.set(cx - 2, by - 17, P.dot); b.set(cx - 1, by - 17, P.dot);
  }
  function keyboard(b, cx, by) {
    b.rect(cx - 25, by - 3, 50, 3, P.kb);
    for (let i = cx - 24; i < cx + 24; i += 2) { b.set(i, by - 3, P.key); b.set(i + 1, by - 2, P.key); }
    b.hline(cx - 25, cx + 24, by, P.rgb);
    for (let i = cx - 24; i < cx + 24; i += 5) b.set(i, by - 1, P.rgb2);
    b.rect(cx + 30, by - 3, 6, 3, C("#16171c")); b.set(cx + 31, by - 2, C("#2a2c34")); b.set(cx + 33, by - 2, C("#2a2c34")); b.set(cx + 32, by - 3, C("#2a2c34")); b.hline(cx + 30, cx + 35, by, C("#e050c0")); b.set(cx + 29, by, C("#8a3080")); b.set(cx + 36, by, C("#8a3080"));
  }
  function deskBits(b, cx, by) {
    // cactus pen pot, pens, balm tin
    b.rect(cx - 3, by - 5, 6, 5, P.cpot); b.hline(cx - 3, cx + 2, by - 5, P.amb1);
    b.rect(cx - 1, by - 11, 3, 6, P.cactus); b.vline(cx - 2, by - 9, by - 7, P.cactusD); b.set(cx - 3, by - 9, P.cactus); b.vline(cx + 2, by - 10, by - 8, P.cactusD); b.set(cx + 3, by - 10, P.cactus);
    b.vline(cx + 2, by - 14, by - 6, P.pen); b.vline(cx + 3, by - 13, by - 6, P.pearl2);
    b.rect(cx + 6, by - 4, 5, 4, P.balm); b.hline(cx + 6, cx + 10, by - 3, P.balmL);
  }
  // ---------------------------------------------------------------- the crow
  function crow(b, x, y, pose = "idle") {
    // x,y = feet. Facing right.
    const body = [[0, -3], [1, -3], [2, -3], [3, -3], [-1, -4], [0, -4], [1, -4], [2, -4], [3, -4], [4, -4], [-2, -5], [-1, -5], [0, -5], [1, -5], [2, -5], [3, -5], [4, -5], [-3, -6], [-2, -6], [-1, -6], [0, -6], [1, -6], [2, -6], [3, -6], [-4, -7], [-3, -7], [-2, -7], [1, -7], [2, -7], [3, -7], [-5, -8], [-4, -8]];
    body.forEach(([dx, dy]) => b.set(x + dx, y + dy, P.crow));
    [[0, -5], [1, -6], [-1, -6]].forEach(([dx, dy]) => b.set(x + dx, y + dy, P.crowSheen));
    const hx = pose === "think" ? 3 : 4, hy = pose === "think" ? -7 : -8;
    [[0, 0], [1, 0], [0, -1], [1, -1], [2, -1], [0, -2], [1, -2], [-1, -1]].forEach(([dx, dy]) => b.set(x + hx + dx, y + hy + dy, P.crow));
    b.set(x + hx + 2, y + hy, P.beak); b.set(x + hx + 3, y + hy, P.beak);
    if (pose !== "blink") b.set(x + hx + 1, y + hy - 1, P.eye);
    if (pose === "wait") { b.set(x - 1, y - 8, P.crow); b.set(x, y - 9, P.crow); b.set(x + 1, y - 10, P.crow2); }
    b.set(x, y - 2, P.beak); b.set(x + 2, y - 2, P.beak); b.set(x, y - 1, P.beak); b.set(x + 2, y - 1, P.beak);
    // warm rim from the lamp so he reads against the night window
    [[4, -4], [4, -5], [3, -3], [hx - 4 + 2, hy - 2]].forEach(([dx, dy]) => b.set(x + dx, y + dy, C("#8a4a2a")));
    b.set(x + hx + 2, y + hy - 2, C("#6a3a2a"));
  }
  // ---------------------------------------------------------------- bookcase: the light-oak unit, two open columns (from his 3 shelf photos)
  function bookcase(b, x, y, w, h) {
    const mid = x + Math.floor(w / 2);
    b.rect(x, y, w, h, P.oakBack);
    for (let i = x + 3; i < x + w - 3; i += 9) b.vline(i, y + 3, y + h - 4, C("#624a30"));
    b.rect(x, y, 3, h, P.oak); b.rect(x + w - 3, y, 3, h, P.oak2); b.rect(x, y, w, 3, P.oak); b.rect(mid - 1, y, 3, h, P.oak); b.vline(mid + 1, y + 3, y + h - 1, P.oak2);
    const rows = [y + 26, y + 54, y + 82, y + h - 3];
    rows.forEach((sy) => { b.rect(x, sy, w, 3, P.oak); b.hline(x, x + w - 1, sy + 2, P.oakDark); });
    const L = x + 4, R = mid + 3, colW = mid - x - 5;
    const spines = (sx, sy, list) => { let cx = sx; list.forEach(([wd, ht, c, band, band2]) => { b.rect(cx, sy - ht, wd, ht, c); if (band) b.hline(cx, cx + wd - 1, sy - ht + 3, band); if (band2) b.hline(cx, cx + wd - 1, sy - 4, band2); cx += wd; }); return cx; };
    const K = C("#141418"), WH = C("#e8e4dc"), CR = C("#d9ccb0");
    // row 1 — L: camera, Naruto, the Spalding box. R: flat stack of big books + the framed temple photo
    let r1 = rows[0];
    b.rect(L, r1 - 6, 6, 6, K); b.set(L + 3, r1 - 4, C("#3a3a44"));
    b.rect(L + 8, r1 - 12, 3, 8, C("#f07a1a")); b.rect(L + 7, r1 - 16, 5, 4, C("#f2c230")); b.set(L + 8, r1 - 14, C("#e0c8a8")); b.vline(L + 8, r1 - 4, r1 - 1, C("#1c2438")); b.vline(L + 10, r1 - 4, r1 - 1, C("#1c2438"));
    b.rect(L + 14, r1 - 9, 12, 9, K); b.ellipse(L + 20, r1 - 5, 3, 3, (X, Y, u, v) => (Math.abs(u) < 0.2 || Math.abs(v) < 0.2 ? P.ballD : P.ball));
    b.rect(L + 17, r1 - 17, 3, 8, C("#2a2a3a")); b.rect(L + 16, r1 - 20, 5, 3, C("#141422")); b.set(L + 21, r1 - 19, C("#6a3aa0"));
    [[C("#1c2440"), 2], [C("#e0e0d8"), 1], [C("#c8b060"), 2], [C("#1f3a6a"), 2], [C("#2a4a8a"), 2], [C("#e06a5a"), 3], [C("#1c2440"), 1]].reduce((yy, [c, t]) => { b.rect(R, yy - t, 16, t, c); return yy - t; }, r1);
    b.rect(R + 18, r1 - 16, colW - 17, 16, C("#5a3a22")); b.rect(R + 20, r1 - 14, colW - 21, 11, C("#8aa6c0")); b.rect(R + 20, r1 - 8, colW - 21, 5, C("#b89a6a")); b.rect(R + 23, r1 - 13, 4, 6, C("#6a5a4a")); b.set(R + 21, r1 - 6, C("#2a2a2a")); b.set(R + 22, r1 - 6, C("#e0d0c0"));
    // row 2 — L: Berserk 10–12 + Asuka, Levi, Hinata plush, Ed. R: tall darks, War and Peace, the red run, the pig
    let r2 = rows[1];
    let cx = spines(L, r2, [[4, 22, K, C("#c02828"), C("#c02828")], [4, 22, K, C("#c02828"), C("#c02828")], [4, 22, K, C("#c02828"), C("#c02828")]]);
    b.rect(cx + 1, r2 - 15, 2, 12, C("#d02828")); b.rect(cx, r2 - 19, 4, 4, C("#e0602a")); b.vline(cx + 1, r2 - 3, r2 - 1, C("#d02828")); b.vline(cx + 2, r2 - 3, r2 - 1, C("#d02828"));
    b.rect(cx + 5, r2 - 14, 4, 11, C("#3a6a3a")); b.rect(cx + 5, r2 - 17, 4, 3, C("#e0c8a8")); b.hline(cx + 5, cx + 8, r2 - 17, K); b.vline(cx + 6, r2 - 3, r2 - 1, C("#6a5a4a"));
    b.ellipse(cx + 13.5, r2 - 11, 3.6, 3.6, C("#f08030")); b.set(cx + 12, r2 - 11, K); b.set(cx + 15, r2 - 11, K); b.rect(cx + 11, r2 - 7, 5, 6, WH); b.set(cx + 13, r2 - 5, C("#f08030"));
    b.rect(cx + 18, r2 - 9, 3, 8, C("#c02838")); b.rect(cx + 18, r2 - 12, 3, 3, C("#f0d060"));
    spines(R, r2, [[2, 23, CR], [2, 24, K], [2, 20, C("#2a2a30")], [2, 23, K], [2, 12, C("#e0b030")], [3, 21, K, C("#b82a2a"), C("#b82a2a")], [2, 18, C("#d4452a")], [2, 19, C("#c83a2a"), C("#f0d8c0")], [2, 17, C("#d4452a")], [2, 18, C("#e0662a")], [2, 17, C("#f08a3a")], [2, 19, C("#c83a2a")], [2, 18, C("#e05a5a")]]);
    b.ellipse(R + colW - 4, r2 - 4, 2.6, 3.4, C("#c8806a")); b.set(R + colW - 5, r2 - 6, C("#8a4a3a"));
    // row 3 — L: Atomic Habits, the teal pair, the Chainsaw Man run (pastels), Steve Jobs. R: the black classics + white spines
    let r3 = rows[2];
    spines(L, r3, [[2, 20, CR], [2, 18, C("#3a8a9a")], [2, 19, C("#2a6a7a")], [2, 17, C("#2a4a5a")], [1, 15, K], ...[C("#9ac8e0"), C("#e8c0d0"), C("#f0e0a0"), C("#b0e0c0"), C("#9ac8e0"), C("#e8c0d0"), C("#f0e0a0")].map((c) => [1, 16, c]), [2, 17, C("#e8e4dc"), C("#c02828")], [2, 17, C("#f08a3a")], [3, 24, WH]]);
    spines(R, r3, [[2, 17, K], [2, 18, C("#1c1c22")], [2, 18, K], [2, 19, C("#26262c")], [2, 18, K], [2, 19, C("#1c1c22")], [2, 18, K], [2, 17, WH], [2, 19, WH], [2, 18, C("#e8e0d0")], [2, 19, WH], [3, 20, K, C("#c8a040")], [3, 21, C("#1c1c22")]]);
    // bottom — L: dried lavender in the tall glass bottle, the Rei plush. R: the pinboard (boarding passes, kids' drawings, certificates)
    let r4 = rows[3];
    b.rect(L + 1, r4 - 12, 3, 12, C("#9ab0b8")); b.set(L + 2, r4 - 11, C("#d0e0e8"));
    const rr = rng(21);
    for (let i = 0; i < 26; i++) b.set(L + Math.floor(rr() * 7) - 1, r4 - 14 - Math.floor(rr() * 10), rr() < 0.5 ? P.lav : P.lavD);
    b.ellipse(L + 12, r4 - 9, 4, 4, C("#b8bcc8")); b.set(L + 11, r4 - 9, C("#c02838")); b.set(L + 13, r4 - 9, C("#c02838")); b.rect(L + 9, r4 - 5, 6, 5, WH); b.set(L + 12, r4 - 3, K);
    b.ellipse(L + 20, r4 - 4, 3.5, 4, C("#e8a040")); b.ellipse(L + 25, r4 - 3, 2, 3, C("#2a5ad0")); b.ellipse(L + 28, r4 - 3, 2, 3, C("#f0d030"));
    b.rect(R - 1, r4 - 25, colW + 1, 25, C("#9aa0aa"));
    [[0, 0, 10, 8, WH], [11, 1, 9, 12, C("#f2efe8")], [2, 9, 8, 10, C("#f0f0f0")], [20, 2, 8, 10, C("#f4f1ea")], [12, 13, 10, 9, C("#fafafa")], [22, 13, 6, 8, C("#e8e4dc")]].forEach(([dx, dy, w2, h2, c]) => b.rect(R + dx, r4 - 24 + dy, w2, h2, c));
    const scrib = [C("#3a8ad0"), C("#e0443a"), C("#f0c030"), C("#4aa060"), C("#c050c0")];
    for (let i = 0; i < 40; i++) b.set(R + 2 + Math.floor(rr() * 24), r4 - 22 + Math.floor(rr() * 20), scrib[i % 5]);
    b.rect(R + 1, r4 - 23, 7, 2, C("#d02838")); b.ellipse(R + 26, r4 - 21, 2, 2, C("#c02838"));
    return rows;
  }
  // a book lying flat in a pile (for the conversation-state book pile)
  function slab(b, x, y, len, thick, c, band, pageSide = "right") {
    b.rect(x, y, len, thick, c);
    b.hline(x, x + len - 1, y, mix(c, C("#ffffff"), 0.18)); b.hline(x, x + len - 1, y + thick - 1, mix(c, C("#000000"), 0.3));
    if (band) { b.vline(x + 3, y + 1, y + thick - 2, band); b.vline(x + len - 5, y + 1, y + thick - 2, band); }
    const px = pageSide === "right" ? x + len : x - 2;
    b.rect(px, y + 1, 2, thick - 2, C("#e8e0cc")); for (let j = y + 1; j < y + thick - 1; j += 2) b.set(px + (pageSide === "right" ? 1 : 0), j, C("#cfc5ae"));
  }
  // ---------------------------------------------------------------- the sticky-note wall (wood panel)
  function noteWall(b, x, y, w, h, crewNotes = true) {
    b.rect(x, y, w, h, P.panel);
    for (let i = x; i < x + w; i += 7) b.vline(i, y, y + h - 1, P.panel2);
    const r = rng(9);
    for (let k = 0; k < w * h * 0.08; k++) b.set(x + Math.floor(r() * w), y + Math.floor(r() * h), P.panelGrain);
    const spots = [];
    const cols = 3, nw = 11, nh = 9;
    for (let row = 0; row < 6; row++) for (let col = 0; col < cols; col++) {
      if ((row * cols + col) % 5 === 3) continue;
      const nx = x + 3 + col * (nw + 2) + (row % 2), ny = y + (crewNotes ? 30 : 4) + row * (nh + 3);
      if (nx + nw > x + w - 1) continue;
      const pink = (row + col) % 4 === 1;
      b.rect(nx, ny, nw, nh, pink ? P.note2 : P.note); b.hline(nx, nx + nw - 1, ny + nh - 1, pink ? P.note2D : P.noteD);
      for (let l = 0; l < 3; l++) b.hline(nx + 2, nx + 2 + Math.floor(r() * 6) + 2, ny + 2 + l * 2, P.ink);
      spots.push([nx, ny, nw, nh]);
    }
    // five crew notes, pinned lower down: coloured tab + initial dots
    const crew = [];
    if (crewNotes) {
      const keys = Object.keys(CREW);
      keys.forEach((k, i) => {
        const nx = x + 4 + (i % 3) * 16, ny = y + 4 + Math.floor(i / 3) * 12 + (i % 2);
        b.rect(nx, ny, 11, 10, P.pearl); b.rect(nx, ny, 11, 2, CREW[k]); b.hline(nx + 2, nx + 7, ny + 4, P.ink); b.hline(nx + 2, nx + 5, ny + 6, P.ink);
        crew.push({ key: k, x: nx, y: ny, w: 11, h: 10 });
      });
    }
    return crew;
  }
  // ---------------------------------------------------------------- window with Bangkok at night + sheer curtains
  // the window follows the Bangkok hour: night, dawn, day, dusk
  const SKIES = {
    night: { s0: "#0a1120", s1: "#13213a", glow: "#3a2a3a", b1: "#080c16", b2: "#0d1320", lit: 0.22 },
    dawn:  { s0: "#26284a", s1: "#b0607a", glow: "#f0a060", b1: "#141828", b2: "#1c2034", lit: 0.1 },
    day:   { s0: "#5a8ec0", s1: "#9cc0dc", glow: "#d8e4ec", b1: "#3a4658", b2: "#4a5668", lit: 0 },
    dusk:  { s0: "#2e2450", s1: "#c8684a", glow: "#f0a050", b1: "#10141f", b2: "#181c2a", lit: 0.14 },
  };
  function skyFor(hour) { return hour >= 19 || hour < 5 ? "night" : hour < 7 ? "dawn" : hour < 17 ? "day" : "dusk"; }
  function nightWindow(b, x, y, w, h, hour = 22) {
    const k = SKIES[skyFor(hour)], s0 = C(k.s0), s1 = C(k.s1), glow = C(k.glow), b1 = C(k.b1), b2 = C(k.b2);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const v = j / h;
      b.set(x + i, y + j, v > 0.75 ? (bayer(i, j) < (v - 0.75) * 3 ? glow : s1) : bayer(i, j) < v * 1.2 ? s1 : s0);
    }
    const r = rng(3);
    let bx = x;
    while (bx < x + w) {
      const bw = 5 + Math.floor(r() * 9), bh = 10 + Math.floor(r() * (h * 0.55));
      b.rect(bx, y + h - bh, bw, bh, r() < 0.5 ? b1 : b2);
      for (let j = y + h - bh + 2; j < y + h - 1; j += 3) for (let i = bx + 1; i < bx + bw - 1; i += 2) if (r() < k.lit) b.set(i, j, r() < 0.8 ? P.lit : P.litCool);
      if (r() < 0.25) b.set(bx + Math.floor(bw / 2), y + h - bh - 1, P.ruby);
      bx += bw;
    }
    return { x, y, w, h };
  }
  function rain(b, win, t, col = P.rain) {
    const r = rng(11), n = Math.round(win.w * 0.7);   // same feel at any width (0.7 drops per column)
    for (let k = 0; k < n; k++) {
      const rx = Math.floor(r() * win.w), speed = 2 + r() * 2, len = 2 + Math.floor(r() * 3);
      const ry = Math.floor((r() * win.h + t * speed) % (win.h + 6)) - 4;
      for (let l = 0; l < len; l++) { const X = win.x + ((rx - Math.floor((ry + l) / 3) + win.w * 4) % win.w), Y = win.y + ry + l; if (Y >= win.y && Y < win.y + win.h) b.set(X, Y, col); }
    }
  }
  function curtains(b, x, y, w, h, gapL, gapR) {
    b.tint(x, y, w, h, P.curtain, 0.2, (X) => X < gapL || X > gapR);
    for (let i = x; i < x + w; i++) if ((i < gapL || i > gapR) && (i - x) % 5 === 0) b.tint(i, y, 1, h, P.curtain, 0.18);
    b.hline(x - 2, x + w + 1, y - 1, P.frame);
  }

  root.ROOM = { P, CREW, skyFor, flowerSpots, slab, owala, electricSprite, lamp, flower, bassSprite, acousticSprite, amp, monitor, laptop, keyboard, deskBits, crow, bookcase, noteWall, nightWindow, rain, curtains };
})(window);
