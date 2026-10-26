// Room: glues Korn's pixel room to the Crow Room's state.
//   empty chat   → the full scene (no rain, his call 1 Oct; the crow blinks, hover labels)
//   conversation → the scene shrinks to the board's corner, the book pile and the
//                  guitars stand in the gutters beside the chat box, and nothing moves
// The lamp brightens while Crow is thinking; the crow's pose follows the turn.
(function (root) {
  "use strict";
  const { PX, C } = root.PXL, R = root.ROOM, S = root.SCENE;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = { get: (k) => { try { return localStorage.getItem("room:" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("room:" + k, v); } catch { /* private window */ } } };

  let mode = "idle";        // idle | thinking | waiting
  let blooms = 0, slots = null, bloomNote = "";   // slots: one per goal today (null = no goals data yet)
  let idle = null;          // { info, canvas, timer, t }
  const bkkHour = () => +new Date().toLocaleString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", hour12: false }) % 24;
  let hour = bkkHour();
  const raining = false;   // rain switched off, his call 1 Oct ("just dont make it rain"); checkRain() is kept, unwired
  const pose = () => (mode === "thinking" ? "think" : mode === "waiting" ? "wait" : "idle");
  const lampState = () => (mode === "thinking" ? "bright" : "on");
  const furniture = { drawer: false, drawerL: false, drawerR: false, cabinet: false };   // open or shut, in the idle scene only

  // ---------------------------------------------------------------- the empty-state scene
  function emptyScene({ starters, onStarter, onLamp, onFlower, onMonitor, onCrew }) {
    const box = document.createElement("div");
    box.className = "empty room-idle";
    const now = new Date();
    const day = now.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok", weekday: "long", day: "numeric", month: "long" });
    const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });
    box.innerHTML = `<div class="dateline"><span>${day}</span><i></i><span>${time} Bangkok</span></div>
      <img class="room-title" alt="perge movere" draggable="false">
      <div class="scene"><canvas></canvas><div class="tip" hidden></div></div>
      <div class="starters"></div>`;
    const scene = box.querySelector(".scene"), canvas = scene.querySelector("canvas"), tip = scene.querySelector(".tip");
    const T = root.ROOM_TITLE, title = box.querySelector(".room-title");
    if (T) { title.src = T[T.use].src; title.classList.toggle("smooth", !!T[T.use].smooth); } else title.remove();
    for (const s of starters) {
      const b = document.createElement("button"); b.type = "button"; b.textContent = s; b.onclick = () => onStarter(s);
      box.querySelector(".starters").append(b);
    }
    stopIdle();
    for (const k in furniture) furniture[k] = false;
    idle = { info: S.base({ hour, blooms, slots, lamp: lampState(), ...furniture }), canvas, t: 0, timer: null, box };
    const frame = new PX(S.W, S.H);
    const draw = () => {
      if (!canvas.isConnected) return stopIdle();
      frame.copy(idle.info.b); S.anim(frame, idle.info, idle.t, { pose: pose(), still: reduceMotion, rain: raining });
      frame.toCanvas(canvas);
    };
    idle.draw = draw;
    draw();
    if (!reduceMotion) idle.timer = setInterval(() => { if (!document.hidden) { idle.t++; draw(); } }, 90);
    // hover labels + the few objects that do something when clicked
    const pct = (v, of) => (v / of) * 100 + "%";
    const act = { lamp: onLamp, flower: onFlower, monitor: onMonitor, drawer: () => toggleDrawer(scene), drawerL: () => toggle("drawerL"), drawerR: () => toggle("drawerR"), cabinet: () => toggle("cabinet") };
    for (const h of idle.info.hotspots) {
      const d = document.createElement(h.crew || act[h.id] ? "button" : "div");
      d.className = "hot"; if (d.tagName === "BUTTON") d.type = "button";
      Object.assign(d.style, { left: pct(h.x, S.W), top: pct(h.y, S.H), width: pct(h.w, S.W), height: pct(h.h, S.H) });
      if (h.crew) d.style.setProperty("--c", `var(--${h.crew})`), d.classList.add("crew");
      d.setAttribute("aria-label", `${h.label}: ${h.id === "flower" && bloomNote ? bloomNote : h.note}`);
      d.onmouseenter = d.onfocus = () => {
        tip.innerHTML = `<b></b><span></span>`;
        tip.querySelector("b").textContent = h.label;
        tip.querySelector("span").textContent = h.id === "flower" && bloomNote ? bloomNote : h.note;
        Object.assign(tip.style, { left: pct(h.x + h.w / 2, S.W), top: pct(h.y, S.H) });
        tip.hidden = false;
      };
      d.onmouseleave = d.onblur = () => { tip.hidden = true; };
      if (h.crew) d.onclick = () => onCrew(h.label);
      else if (act[h.id]) d.onclick = act[h.id];
      scene.append(d);
    }
    requestAnimationFrame(() => sizeIdle());
    return box;
  }
  // The room fills the space it's given: from 2.5× up it may take a fractional scale
  // (uneven pixels don't show at that size), below that it stays on whole pixels so
  // it stays crisp. The title keeps whole pixels, ×3 when it fits, else a step down.
  function sizeIdle() {
    if (!idle?.canvas.isConnected) return;
    const host = idle.box.parentElement, scene = idle.canvas.parentElement;
    const title = idle.box.querySelector(".room-title"), T = root.ROOM_TITLE?.[root.ROOM_TITLE.use];
    const cs = getComputedStyle(host);
    const availW = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 8;
    const other = idle.box.offsetHeight - scene.offsetHeight - (title ? title.offsetHeight : 0);
    const availH = host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - other - 4;
    const th = title && T ? T.h : 0;
    let k = 1, kt = 1;
    for (const t of [3, 2, 1]) {
      const fit = Math.min(availW / S.W, (availH - th * t) / S.H, 4);
      if (fit >= 2.5 || t === 1) { kt = t; k = fit >= 2.5 ? Math.floor(fit * 20) / 20 : Math.max(1, Math.floor(fit)); break; }
    }
    scene.style.width = Math.round(S.W * k) + "px"; scene.style.height = Math.round(S.H * k) + "px";
    if (title && T) { title.style.width = T.w * kt + "px"; title.style.height = T.h * kt + "px"; }
  }
  function stopIdle() { if (idle?.timer) clearInterval(idle.timer); if (idle) idle.timer = null; }
  function rebuildIdle() {
    if (!idle?.canvas.isConnected) return;
    idle.info = S.base({ hour, blooms, slots, lamp: lampState(), ...furniture });
    idle.draw();
  }

  // ---------------------------------------------------------------- the desk drawer: the artifact box
  // Opening the drawer lays a box of everything Crow has built over the room
  // (public/artifacts.json, which Crow keeps up to date). The side drawers and the cabinet just open.
  function toggle(k) { furniture[k] = !furniture[k]; rebuildIdle(); }
  function toggleDrawer(scene) {
    furniture.drawer = !furniture.drawer;
    rebuildIdle();
    if (furniture.drawer) openBox(scene); else closeBox();
  }
  let boxEl = null;
  const onBoxKey = (e) => {
    if (e.key !== "Escape") return;
    if (!boxEl?.isConnected) { closeBox(); furniture.drawer = false; return; }   // the room went away under it
    e.stopImmediatePropagation(); toggleDrawer();
  };
  function closeBox() {
    boxEl?.remove(); boxEl = null;
    document.removeEventListener("keydown", onBoxKey, true);
  }
  async function openBox(scene) {
    closeBox();
    boxEl = document.createElement("div");
    boxEl.className = "artifact-box";
    boxEl.innerHTML = `<header><b>The drawer</b><span>Everything Crow has built you</span><button type="button" class="shut" aria-label="Close the drawer">×</button></header><div class="groups"><p class="loading">Opening…</p></div>`;
    boxEl.querySelector(".shut").onclick = () => toggleDrawer();
    scene.append(boxEl);
    document.addEventListener("keydown", onBoxKey, true);
    const el = boxEl, groups = el.querySelector(".groups");
    try {
      const data = await (await fetch("/artifacts.json", { cache: "no-store" })).json();
      if (el !== boxEl) return;
      groups.innerHTML = "";
      for (const g of data.groups || []) {
        const sec = document.createElement("section");
        const h = document.createElement("h4"); h.textContent = g.name; sec.append(h);
        for (const it of g.items || []) {
          const a = document.createElement("a");
          a.href = it.url; a.target = "_blank"; a.rel = "noopener noreferrer";
          a.innerHTML = "<b></b><span></span>";
          a.querySelector("b").textContent = it.title;
          a.querySelector("span").textContent = it.what || "";
          sec.append(a);
        }
        groups.append(sec);
      }
    } catch { if (el === boxEl) groups.innerHTML = `<p class="loading">The drawer's stuck (couldn't read artifacts.json).</p>`; }
  }

  // ---------------------------------------------------------------- board corner
  function paintMini() {
    const cv = document.getElementById("mini"); if (!cv) return;
    const info = S.base({ hour, blooms, slots, lamp: lampState() });
    const b = new PX(S.W, S.H).copy(info.b); S.anim(b, info, 0, { pose: pose(), still: true });
    const full = b.toCanvas(document.createElement("canvas"));
    const m = info.mini;
    cv.width = m.w; cv.height = m.h;
    cv.getContext("2d").drawImage(full, m.x, m.y, m.w, m.h, 0, 0, m.w, m.h);
    const cap = document.getElementById("mini-cap");
    cap.className = "cap " + mode;
    cap.lastChild.textContent = mode === "thinking" ? "Crow is thinking" : mode === "waiting" ? "Waiting on you" : "Lamp on";
  }

  // ---------------------------------------------------------------- gutters: the book pile + the guitars
  // Spine colours + designs: his own word, book by book (26 Oct 21:30); earlier ones from his shelf photos.
  // pg = page count (his estimate where he gave one, else a common English edition's). Thickness
  // follows it: cream paperback paper ≈ 0.0025″ (0.0635 mm) a page + ~1 mm of cover (mm overrides
  // it for the hardcovers), drawn at ~3.3 mm a pixel, never under 4 px so the spine label still fits.
  // deco = marks on the spine, u = 0 at the TOP of the spine (the left end, lying flat) to 1 at the bottom:
  //   ["band", u, c] one line across · ["block", u0, u1, c] a solid section · ["dot", u, c] ·
  //   ["tab", u, c] a small label · ["arcs", c] curved lines at both ends · ["vine", c] · ["frames", c] · ["leather"]
  // lab = [u0, u1], the part of the spine the title sits in. split = the title goes either side of a dot.
  const W_ = "#f4f0ea", K_ = "#141418", RED = "#b8282a", PINK = "#e893ab", GOLD = "#d8b45a";
  const PENGUIN = { c: K_, ink: W_, deco: [["band", 2 / 3, W_]], lab: [0, 0.62] };   // the black classics, one white band 2/3 down
  const CAMUS = { c: "#ece8e0", ink: K_, deco: [["block", 0.5, 1, K_]], lab: [0, 0.5] };   // white top half, black bottom half
  const MURAKAMI = { c: "#18181c", ink: W_, deco: [["dot", 0.5, "#d0302a"]], split: true };
  const BLACKTAB = { c: K_, ink: W_, deco: [["tab", 0.9, W_]], lab: [0, 0.84] };
  const BERSERK = (n) => ({ t: `Berserk Deluxe Edition ${n}`, a: "Kentaro Miura", s: "on the shelf, the big leather hardcovers", c: "#121214", mm: 50, len: 43, deco: [["leather"]], parts: [{ text: String(n), u: [0.03, 0.2], ink: GOLD, fs: 11 }, { text: "Berserk", u: [0.2, 0.97], ink: "#c8402a", fs: 11 }] });
  const BOOKS = [
    { t: "Siddhartha", a: "Hermann Hesse", s: "dropped: the writing bored him, his first real drop (26 Oct)", c: "#e0b830", ink: "#2a2418", pg: 150 },
    { t: "The Brothers Karamazov", short: "Karamazov", a: "Dostoevsky", s: "finished 24 Oct, Alyosha's speech nearly made him cry", c: "#5a3a24", ink: GOLD, pin: 3, pg: 796 },
    { t: "The Courage to Be Disliked", short: "Be Disliked", a: "Kishimi & Koga", s: "read", c: "#efece4", ink: "#1a1a1a", pg: 288, deco: [["arcs", "#c8302a"]], lab: [0.14, 0.86] },
    { t: "Kafka on the Shore", a: "Haruki Murakami", s: "read, where Crow's name comes from", pg: 500, ...MURAKAMI },
    { t: "After Dark", a: "Haruki Murakami", s: "read (Jul), the before-sleep book", pg: 175, ...MURAKAMI },
    { t: "A Wild Sheep Chase", a: "Haruki Murakami", s: "read, fun, vibes only", pg: 250, ...MURAKAMI },
    { t: "Norwegian Wood", a: "Haruki Murakami", s: "read", c: RED, ink: W_, pg: 300 },
    { t: "Never Let Me Go", a: "Kazuo Ishiguro", s: "read (thin paper)", c: "#e8e4dc", ink: "#1a1a1a", pg: 200 },
    { t: "Klara and the Sun", a: "Kazuo Ishiguro", s: "read", c: RED, ink: K_, pg: 250 },
    { t: "Kokoro", a: "Natsume Soseki", s: "read", c: "#2e1f3e", ink: "#b89ad8", pg: 300 },
    { t: "Discourses", a: "Epictetus", s: "read", pg: 250, ...PENGUIN },
    { t: "Meditations", a: "Marcus Aurelius", s: "the one you keep going back to", pg: 250, ...PENGUIN },
    { t: "Nicomachean Ethics", a: "Aristotle", s: "unfinished", pg: 250, len: 43, ...PENGUIN },
    { t: "The Three Theban Plays", short: "Theban Plays", a: "Sophocles", s: "dropped once, wants to go back to it (because of รับน้อง)", pg: 430, ...PENGUIN },
    { t: "White Nights", a: "Dostoevsky", s: "read, a long time back", pg: 100, ...PENGUIN },
    { t: "The Stranger", a: "Albert Camus", s: "read", pg: 120, len: 40, ...CAMUS },
    { t: "The Myth of Sisyphus", short: "Myth of Sisyphus", a: "Albert Camus", s: "reading now (the heavy track), the reread after Karamazov (26 Oct)", pin: 1, now: true, pg: 150, len: 43, ...CAMUS },
    { t: "The Alchemist", a: "Paulo Coelho", s: "read", c: "#e07a26", ink: "#f8e06a", pg: 200 },
    { t: "The Death of Ivan Ilyich", short: "Ivan Ilyich", a: "Leo Tolstoy", s: "read", c: "#f0ece4", ink: RED, pg: 115, deco: [["block", 0, 0.09, "#3a5aa8"]], lab: [0.1, 1] },
    { t: "Man's Search for Meaning", short: "Man's Search", a: "Viktor Frankl", s: "read, still marinating", c: K_, ink: GOLD, pg: 150 },
    { t: "One Hundred Years of Solitude", short: "100 Years", a: "García Márquez", s: "~100 pp in, dropped", c: "#f0ece4", ink: "#e07a26", pg: 500 },
    { t: "Letters to Milena", a: "Franz Kafka", s: "unread", c: RED, ink: W_, pg: 270 },
    { t: "The Sound of Waves", a: "Yukio Mishima", s: "read", c: RED, ink: W_, pg: 180 },
    { t: "War and Peace", a: "Leo Tolstoy", s: "on the shelf", c: "#7e7c78", ink: W_, pg: 1273, deco: [["vine", "#a02a2a"]] },
    { t: "What If?", a: "Randall Munroe", s: "on the shelf", c: RED, ink: W_, pg: 300 },
    { t: "Lonely Castle in the Mirror", short: "Lonely Castle", a: "Mizuki Tsujimura", s: "on the shelf", c: PINK, ink: W_, pg: 380 },
    { t: "Breasts and Eggs", a: "Mieko Kawakami", s: "on the shelf", c: "#e487a2", ink: W_, pg: 430 },
    BERSERK(10), BERSERK(11), BERSERK(12),
    { t: "The Picture of Dorian Gray", short: "Dorian Gray", a: "Oscar Wilde", s: "read", pg: 260, ...BLACKTAB },
    { t: "Pride and Prejudice", a: "Jane Austen", s: "a few chapters in, paused for a more fun read", pg: 430, len: 40, ...BLACKTAB },
    { t: "Cleopatra and Frankenstein", short: "Cleopatra & Frankenstein", a: "Coco Mellors", s: "on the shelf", c: "#f0ece4", ink: "#2a4ab0", pg: 370 },
    { t: "Shakespeare's Sonnets", short: "Sonnets", a: "William Shakespeare", s: "on the shelf", c: "#f0ece4", ink: K_, pg: 100, deco: [["block", 0, 0.16, K_], ["block", 0.84, 1, K_]], lab: [0.17, 0.83] },
    { t: "The Winter of Our Discontent", short: "Winter of Our Discontent", a: "John Steinbeck", s: "reading now (the light track), picked 26 Oct", pin: 2, now: true, c: "#f0ece4", ink: K_, pg: 290, len: 43, deco: [["dot", 0.93, "#e8741c"]], lab: [0, 0.87] },
    { t: "House of Leaves", a: "Mark Z. Danielewski", s: "on the shelf, thick as hell", c: "#ece8e0", ink: W_, pg: 700, len: 43, deco: [["frames", K_]], shadow: true },
  ];
  const thickFor = (bk) => Math.max(4, Math.round((bk.mm ?? (bk.pg || 250) * 0.0635 + 1) / 3.3));
  // the marks on a spine (see deco above); drawn over the slab, inside its top/bottom edge lines
  function paintDeco(b, bk, x, y, len, th) {
    const at = (u) => x + Math.round(u * len), mid = y + th / 2;
    const block = (x0, x1, c) => { b.rect(x0, y, x1 - x0, th, c); b.hline(x0, x1 - 1, y, PXL.mix(c, C("#ffffff"), 0.18)); b.hline(x0, x1 - 1, y + th - 1, PXL.mix(c, C("#000000"), 0.3)); };
    for (const [kind, ...v] of bk.deco || []) {
      if (kind === "band") b.vline(at(v[0]), y + 1, y + th - 2, C(v[1]));
      else if (kind === "block") block(at(v[0]), at(v[1]), C(v[2]));
      else if (kind === "dot") {   // a round dot
        const c = C(v[1]), cx = at(v[0]), cy = Math.round(mid);
        if (th >= 8) {   // 3×3, the corners half-blended into the cloth so it reads round, not as a plus
          b.rect(cx - 1, cy - 1, 3, 3, c);
          const soft = PXL.mix(c, C(bk.c), 0.55);
          for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) b.set(cx + dx, cy + dy, soft);
        } else b.rect(cx - 1, cy - 1, 2, 2, c);
      }
      else if (kind === "tab") b.rect(at(v[0]), Math.round(mid) - 1, 2, 2, C(v[1]));
      else if (kind === "arcs") {   // two curved lines at each end, bowing outward like ( ( title ) )
        const c = C(v[0]), rows = th - 2;
        for (let j = 0; j < rows; j++) {
          const t = (j + 0.5) / rows * 2 - 1, d = Math.round(1.6 * (1 - Math.sqrt(1 - t * t)));
          for (const off of [2, 5]) { b.set(x + off + d, y + 1 + j, c); b.set(x + len - 1 - off - d, y + 1 + j, c); }
        }
      } else if (kind === "vine") {   // two red vines winding along the grey cloth, joined pixel to pixel, with leaves
        const c = C(v[0]), leaf = PXL.mix(C(v[0]), C("#000000"), 0.3), amp = Math.max(1, (th - 6) / 2);
        for (const ph of [0, Math.PI]) {
          let prev = null;
          for (let i = 2; i < len - 2; i++) {
            const yy = Math.round(mid - 0.5 + amp * Math.sin(i * 0.28 + ph));
            if (prev === null) b.set(x + i, yy, c); else b.vline(x + i, prev, yy, c);
            if (i % 7 === (ph ? 3 : 0)) { const up = Math.cos(i * 0.28 + ph) > 0 ? -1 : 1; b.set(x + i, yy + up, leaf); b.set(x + i + 1, yy + up, leaf); b.set(x + i + 1, yy + 2 * up, leaf); }
            prev = yy;
          }
        }
      } else if (kind === "frames") {   // five black panels framed in white along the spine
        const c = C(v[0]), n = 5, step = (len - 1) / n;
        for (let k = 0; k < n; k++) { const a = x + 1 + Math.round(k * step), z = x + Math.round((k + 1) * step); b.rect(a, y + 1, z - a, th - 2, c); }
      } else if (kind === "leather") {   // black leather: a fine grain of slightly lighter specks
        const r = PXL.rng(len * 31 + th), g = C("#232326");
        for (let j = y + 1; j < y + th - 1; j++) for (let i = x; i < x + len; i++) if (r() < 0.16) b.set(i, j, g);
        b.vline(x + 1, y + 1, y + th - 2, C("#2c2c30")); b.vline(x + len - 2, y + 1, y + th - 2, C("#2c2c30"));   // the boards' edges
      }
    }
  }
  // the title (or titles) on a spine: where it sits, in what colour, shrunk until it fits
  const measure = document.createElement("canvas").getContext("2d");
  function fitSize(text, width, fs) {
    measure.font = `700 ${fs}px "Times New Roman", Times, serif`;
    const w = measure.measureText(text.toUpperCase()).width + text.length * fs * 0.04;
    return Math.max(5, Math.min(fs, Math.floor((fs * width / w) * 2) / 2));
  }
  function labelParts(bk) {
    if (bk.parts) return bk.parts;
    const text = bk.short || bk.t;
    if (!bk.split) return [{ text, u: bk.lab || [0, 1], ink: bk.ink }];
    const w = text.split(" ");   // either side of the dot, splitting the words as evenly as it can
    let best = 1;
    for (let i = 1; i < w.length; i++) if (Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length) < Math.abs(w.slice(0, best).join(" ").length - w.slice(best).join(" ").length)) best = i;
    return w.length < 2 ? [{ text, u: [0, 0.44], ink: bk.ink }]
      : [{ text: w.slice(0, best).join(" "), u: [0, 0.46], ink: bk.ink }, { text: w.slice(best).join(" "), u: [0.54, 1], ink: bk.ink }];
  }
  // the nest on top of the pile: a twig bowl sitting on the top book. The middle of the back
  // rim is left open, so the parked ball (behind the canvas) shows through as the egg in it.
  const NEST = { w: 22, h: 8, rim: 3 };   // rim = the front rim's top row
  function paintNest(b, cx) {
    const twig = C("#5a3a22"), twig2 = C("#7a5230"), twigD = C("#3a2414"), hollow = C("#24160c");
    const feather = C("#0b0c11"), sheen = C("#2a2440");
    const x0 = cx - NEST.w / 2, r = root.PXL.rng(7), { h, rim } = NEST;
    const tone = () => { const v = r(); return v < 0.45 ? twig : v < 0.8 ? twig2 : twigD; };
    // the bowl: the lower half of an ellipse, flattened where it sits on the book
    for (let y = rim; y < h; y++) {
      const v = (y - rim + 0.5) / (h - rim), half = (NEST.w / 2) * Math.sqrt(Math.max(0, 1 - v * v * 0.55));
      for (let x = Math.ceil(cx - half); x < cx + half; x++) b.set(x, y, tone());
    }
    // the front rim: a thicker woven band, light twigs on top, dark under
    for (let x = x0; x < x0 + NEST.w; x++) { b.set(x, rim, r() < 0.6 ? twig2 : twig); b.set(x, rim + 1, r() < 0.5 ? twig : twigD); }
    // the hollow just behind the front rim, and the two ends of the back rim rising either side
    b.hline(x0 + 4, x0 + NEST.w - 5, rim - 1, hollow);
    for (const [sx, dir] of [[x0, 1], [x0 + NEST.w - 1, -1]]) {
      for (let k = 0; k < 4; k++) { b.set(sx + dir * k, rim - 1, tone()); if (k < 3) b.set(sx + dir * k, rim - 2, tone()); }
      b.set(sx + dir, rim - 3, twig2);
    }
    // stray twigs poking out, and one crow feather tucked in on the left
    for (const [sx, sy, dx, dy, n] of [[x0 - 1, rim + 1, -1, 1, 3], [x0 + NEST.w, rim, 1, -1, 3], [x0 + NEST.w, rim + 2, 1, 0, 2], [x0 + 2, rim - 3, -1, -1, 2]]) {
      for (let k = 0; k < n; k++) b.set(sx + dx * k, sy + dy * k, k % 2 ? twigD : twig2);
    }
    for (let k = 0; k < 5; k++) { b.set(x0 + 3 - k, rim - 1 - k, feather); if (k < 4) b.set(x0 + 4 - k, rim - 1 - k, sheen); }
  }
  function pileSeed() {
    const doy = Math.floor((Date.now() - Date.UTC(new Date().getUTCFullYear(), 0, 1)) / 864e5);
    return doy + (+store.get("sessions") || 0);
  }
  function paintPile() {
    const el = document.getElementById("pile"); if (!el) return;
    const seed = pileSeed();
    // a seeded shuffle (a fixed stride skipped books whenever it shared a factor with the pool size)
    const pool = BOOKS.filter((b) => !b.pin), rr = root.PXL.rng(seed + 1);
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rr() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    // up to 9 books, as long as the pile stays short enough to clear the hoop above it
    const pins = BOOKS.filter((b) => b.pin).sort((a, b) => a.pin - b.pin), picks = [];
    let room = 88 - pins.reduce((n, b) => n + thickFor(b) + 1, 0);
    for (const b of pool) { if (picks.length >= 9) break; if (thickFor(b) + 1 <= room) { picks.push(b); room -= thickFor(b) + 1; } }
    picks.sort((a, b) => thickFor(a) - thickFor(b));   // the heavy ones settle to the bottom
    const stack = [...pins, ...picks];
    const Wd = 46, offs = [3, 1, 0, 2, 0, 1, 2, 0, 3, 1];
    const lenFor = (bk) => bk.len || Math.max(30, Math.min(43, Math.ceil((bk.short || bk.t).length * 1.75) + 8));
    let y = NEST.h;   // the nest sits right on the top book
    const rows = stack.map((bk, i) => { const r = { bk, x: offs[i % offs.length], y, len: lenFor(bk), th: thickFor(bk) }; y += r.th + 1; return r; });
    const pb = new PX(Wd, y + 1);
    for (const { bk, x, y, len, th } of rows) {
      R.slab(pb, x, y, len, th, C(bk.c), 0);
      paintDeco(pb, bk, x, y, len, th);
    }
    const nestX = rows[0].x + Math.round(rows[0].len / 2);
    paintNest(pb, nestX);
    el.innerHTML = "";
    const cv = pb.toCanvas(document.createElement("canvas"));
    el.style.width = Wd * 3 + "px"; el.style.height = pb.h * 3 + "px";
    el.dataset.parkX = nestX * 3; el.dataset.parkY = (NEST.rim - 1) * 3;   // hoops.js: the ball sits in the nest
    el.append(cv);
    for (const { bk, x, y, len, th } of rows) {
      for (const [i, p] of labelParts(bk).entries()) {
        const l = document.createElement("span"), pad = 4;
        const left = (x + p.u[0] * len) * 3 + pad, width = (p.u[1] - p.u[0]) * len * 3 - pad * 2;
        l.className = "spine" + (bk.now && i === 0 ? " now" : "");   // the reading light: whatever he's reading now
        l.textContent = p.text;
        l.title = `${bk.t} · ${bk.a} · ${bk.s}`;
        Object.assign(l.style, { left: left + "px", top: y * 3 + 2 + "px", width: width + "px", height: th * 3 - 4 + "px", color: p.ink, fontSize: fitSize(p.text, width, p.fs || 8.5) + "px" });
        if (bk.shadow) l.style.textShadow = "0 0 2px #000, 1px 1px 0 #000, -1px -1px 0 #000";   // reads over the white frame lines
        el.append(l);
      }
    }
  }
  function paintGuitars() {
    const cv = document.getElementById("guitars"); if (!cv) return;
    const b = new PX(66, 110);
    b.blit(R.acousticSprite(), 0, 14, 0.13); b.blit(R.electricSprite(), 11, 8, 0.12); b.blit(R.bassSprite(), 20, 4, 0.11);
    b.toCanvas(cv);
  }
  // the gutters only show when there's real room beside the chat box
  function layout() {
    const talk = document.querySelector(".talk"), box = document.getElementById("composer");
    if (!talk || !box) return;
    const gutter = (talk.clientWidth - box.querySelector(".box").getBoundingClientRect().width) / 2 - 40;
    document.body.classList.toggle("gutters", gutter >= 200 && talk.clientHeight >= 560);
    sizeIdle();
  }

  // ---------------------------------------------------------------- public
  function setMode(m) {
    if (m === mode) return;
    mode = m;
    root.Nest?.setMode(m);
    paintMini(); rebuildIdle();
  }
  // ---------------------------------------------------------------- the plum blossom: one bloom per watering this week
  let lastGoals = null, anim = null;
  const WF = { w: 28, h: 64, cx: 14, by: 63 };
  function paintWaterFlower(n, fx = {}) {
    const cv = document.getElementById("water-flower"); if (!cv) return;
    const b = new PX(WF.w, WF.h);
    R.flower(b, WF.cx, WF.by, { blooms: n, slots: fx.slots ?? slots });
    for (const [x, y, c] of fx.petals || []) b.set(x, y, c);
    const drop = C("#7ac8ff"), dropHi = C("#e8f6ff"), gold = C("#fff0a8");
    for (const d of fx.drops || []) { b.set(d.x, d.y, dropHi); b.set(d.x, d.y + 1, drop); b.set(d.x - 1, d.y + 2, drop); b.set(d.x, d.y + 2, drop); b.set(d.x + 1, d.y + 2, drop); b.set(d.x, d.y + 3, drop); }
    for (const [x, y] of fx.splash || []) { b.set(x - 2, y, drop); b.set(x + 2, y, drop); b.set(x - 1, y - 1, dropHi); b.set(x + 1, y - 1, dropHi); }
    if (fx.pop) { const [x, y] = fx.pop.at, k = fx.pop.t; [[0, -4], [4, 0], [0, 4], [-4, 0], [3, -3], [-3, 3], [3, 3], [-3, -3]].forEach(([dx, dy], i) => { if ((i + k) % 3) b.set(x + Math.round(dx * (0.6 + k / 12)), y + Math.round(dy * (0.6 + k / 12)), gold); }); }
    b.toCanvas(cv);
  }
  // drops fall onto the next blossom, it opens, a little sparkle
  function animateWater(n) {
    if (anim) clearInterval(anim);
    const spots = R.flowerSpots(WF.cx, WF.by);
    const at = spots[Math.min(n, 13) - 1] || [WF.cx, WF.by - 50];
    if (reduceMotion) return paintWaterFlower(Math.min(n, 13));
    let t = 0;
    anim = setInterval(() => {
      const drops = [], splash = [];
      for (let i = 0; i < 3; i++) {
        const y = (t - i * 5) * 3;
        if (y >= 0 && y < at[1] - 4) drops.push({ x: at[0] + (i - 1), y });
        else if (y >= at[1] - 4 && y < at[1] + 2) splash.push([at[0] + (i - 1), at[1] - 2]);
      }
      const opened = t >= 22;
      paintWaterFlower(opened ? Math.min(n, 13) : Math.min(n, 13) - 1, { drops, splash, pop: opened && t < 36 ? { at, t: t - 22 } : null });
      if (++t > 38) { clearInterval(anim); anim = null; paintWaterFlower(Math.min(n, 13)); }
    }, 70);
  }
  // the day is over: every open blossom lets go, the petals drift down past the pot and fade
  function animateFall(had) {
    if (anim) clearInterval(anim);
    if (reduceMotion || !had) return paintWaterFlower(0, { slots: 0 });
    const spots = R.flowerSpots(WF.cx, WF.by).slice(0, had);
    const tones = [R.P.petal, R.P.petalHi, R.P.petalD];
    let t = 0;
    anim = setInterval(() => {
      const petals = [];
      spots.forEach(([x, y], i) => {
        for (let k = 0; k < 5; k++) {                       // five petals a blossom, let go one by one
          const s = t - i * 3 - k * 3, c = tones[k % 3];
          const ox = [-1, 1, 0, -2, 2][k], oy = [-1, -1, 1, 0, 0][k];
          if (s < 0) { petals.push([x + ox, y + oy, c]); continue; }
          const py = Math.round(y + oy + s * 1.2), px = x + ox + Math.round(Math.sin(s * 0.45 + k * 1.7 + i) * 2.5);
          if (py < WF.h) petals.push([px, py, c], [px + 1, py, c]);
        }
      });
      paintWaterFlower(0, { slots: 0, petals });
      if (++t > 80) { clearInterval(anim); anim = null; paintWaterFlower(0, { slots: 0 }); }
    }, 70);
  }
  // the flower shows today's goals: one bud per goal, one blossom per goal done
  function setWater(w) {
    const g = w?.goals;
    if (!g) return;
    const was = lastGoals;
    lastGoals = g;
    const nextSlots = g.closed ? 0 : g.total, next = g.closed ? 0 : Math.min(g.done, g.total);
    bloomNote = g.closed ? "The day's done, the petals fell. New goals tomorrow"
      : !g.total ? "No goals yet today. Tell Crow what they are"
      : `${g.done} of ${g.total} goal${g.total === 1 ? "" : "s"} done today${g.done >= g.total ? ", in full bloom" : ""}`;
    const cv = document.getElementById("water-flower"); if (cv) cv.title = bloomNote;
    const sameDay = was && was.day === g.day;
    slots = nextSlots;
    if (sameDay && !was.closed && g.closed) animateFall(Math.min(was.done, was.total));
    else if (sameDay && !g.closed && g.done > was.done) animateWater(next);
    else if (!anim) paintWaterFlower(next);
    if (next !== blooms || !sameDay || g.closed !== was?.closed || g.total !== was?.total) { blooms = next; paintMini(); rebuildIdle(); }
  }

  function setEmpty(empty) { document.body.classList.toggle("room-empty", empty); if (!empty) stopIdle(); }
  function newSession() { store.set("sessions", (+store.get("sessions") || 0) + 1); paintPile(); }
  function toggleDim() { const on = document.body.classList.toggle("dim"); store.set("dim", on ? "1" : ""); }

  // real weather: WMO drizzle/rain/showers/thunder codes, or any precipitation this quarter-hour
  async function checkRain() {
    try {
      const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=13.75&longitude=100.52&current=precipitation,weather_code&timezone=Asia%2FBangkok");
      const { current: c } = await r.json();
      const code = c.weather_code;
      const wet = c.precipitation > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
      return wet;
    } catch { /* offline: keep the last known sky */ }
  }

  function init() {
    if (store.get("dim")) document.body.classList.add("dim");
    paintMini(); paintPile(); paintGuitars(); layout();
    const nest = document.getElementById("nest"); if (nest && root.Nest) root.Nest.mount(nest);
    addEventListener("resize", layout);
    // the window follows the Bangkok hour
    setInterval(() => { const h = bkkHour(); if (h !== hour) { hour = h; paintMini(); rebuildIdle(); } }, 10 * 60000);
  }
  root.Room = { init, emptyScene, setMode, setWater, setEmpty, newSession, toggleDim, layout, animateWater };
})(window);
