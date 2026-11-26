// Scratch: a torn notebook page for working things out mid-drill (his ask, 26 Nov).
// It lives in the top-right corner, the same spot as the FG board, and the two swap:
//   press the book pile → the page comes up and the scoreboard goes · press the pile
//   again → the page goes away · press the hoop while the page is up → the scoreboard
//   comes back and the page goes. What he writes stays (localStorage) until he wipes it.
// Shown with the gutters only, like the rest of the room's pixel things.
(function (root) {
  "use strict";
  const store = { get: (k) => { try { return localStorage.getItem("scratch:" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("scratch:" + k, v); } catch { /* private window */ } } };
  let wrap, text;

  // the torn edges: a fresh ragged line along the top and bottom, kept so it doesn't jump on reload
  function tornPath() {
    let seed = +store.get("seed") || Math.floor(Math.random() * 1e6);
    store.set("seed", seed);
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const pts = [], N = 22;
    for (let i = 0; i <= N; i++) pts.push(`${(i / N) * 100}% ${(rnd() * 7).toFixed(1)}px`);
    for (let i = N; i >= 0; i--) pts.push(`${(i / N) * 100}% calc(100% - ${(rnd() * 7).toFixed(1)}px)`);
    return `polygon(${pts.join(", ")})`;
  }

  const isOpen = () => document.body.classList.contains("scratch-on");
  function setOpen(on) {
    document.body.classList.toggle("scratch-on", on);
    store.set("open", on ? "1" : "0");
    if (on) requestAnimationFrame(() => text?.focus({ preventScroll: true }));
  }
  const toggle = () => setOpen(!isOpen());

  function mount() {
    const talk = document.querySelector(".talk"); if (!talk) return;
    wrap = document.createElement("div");
    wrap.className = "scratch";
    wrap.innerHTML = `
      <div class="scratch-tape" aria-hidden="true"></div>
      <div class="scratch-paper">
        <div class="scratch-head"><span>Scratch</span><button type="button" class="scratch-wipe" title="Wipe the page clean">wipe</button></div>
        <textarea class="scratch-text" spellcheck="false" aria-label="Scratch notes" placeholder="workings, numbers, whatever…"></textarea>
      </div>`;
    talk.append(wrap);
    wrap.querySelector(".scratch-paper").style.clipPath = tornPath();
    text = wrap.querySelector(".scratch-text");
    text.value = store.get("text") || "";
    text.addEventListener("input", () => store.set("text", text.value));
    wrap.querySelector(".scratch-wipe").onclick = () => {
      if (text.value && !confirm("Wipe the scratch page?")) return;
      text.value = ""; store.set("text", ""); text.focus();
    };
    const pile = document.getElementById("pile");
    if (pile) {
      pile.classList.add("pressable");
      pile.title = "Scratch page: press to open, press again to put it away";
      pile.addEventListener("click", toggle);
    }
    setOpen(store.get("open") === "1");
  }
  root.Scratch = { mount, isOpen, setOpen, toggle };
  mount();
})(window);
