#!/usr/bin/env python3
"""ghost.py — the ghost deck: questions Korn missed come back, cold.

His gap is recognition-not-recall ([[feedback-drill-format]]): he knows an
answer when he sees it, and can't produce it from nothing. Review he has to
choose to do won't happen, so the session-start hook serves ONE due card
before anything else.

Deck file: memory/ghost_deck.md, one card per line:
  - <next YYYY-MM-DD> | box <n> | <subject> | Q: <question> | A: <answer>

Leitner boxes: pass moves up a box, fail drops to box 1.
  box 1 → +3 days · box 2 → +7 · box 3 → +14 · pass out of box 3 → retired (box 4)

Usage:
  ghost.py due                 print the most overdue card (for the hook)
  ghost.py add <subj> <Q> <A>  new card, box 1, due in 3 days
  ghost.py pass <n>            card on deck line n passed
  ghost.py fail <n>            card on deck line n failed
  ghost.py list                every live card with its line number
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
DECK = MEM / "ghost_deck.md"
GAP = {1: 3, 2: 7, 3: 14}
CARD = re.compile(r"^- (\d{4}-\d{2}-\d{2}) \| box (\d) \| (.+?) \| Q: (.+?) \| A: (.+)$")
today = dt.date.today()


def load():
    return DECK.read_text().splitlines() if DECK.exists() else []


def cards(lines):
    for n, l in enumerate(lines, 1):
        m = CARD.match(l)
        if m:
            yield n, dt.date.fromisoformat(m[1]), int(m[2]), m[3], m[4], m[5]


def fmt(nxt, box, subj, q, a):
    return f"- {nxt.isoformat()} | box {box} | {subj} | Q: {q} | A: {a}"


def regrade(n, passed):
    lines = load()
    for ln, _, box, subj, q, a in cards(lines):
        if ln == n:
            box = box + 1 if passed else 1
            nxt = today + dt.timedelta(days=GAP.get(box, 0)) if box in GAP else dt.date(9999, 12, 31)
            lines[n - 1] = fmt(nxt, box, subj, q, a)
            DECK.write_text("\n".join(lines) + "\n")
            print("retired" if box > 3 else f"box {box}, next {nxt:%a %d %b}")
            return
    sys.exit(f"no card on line {n}")


cmd = sys.argv[1] if len(sys.argv) > 1 else "due"
if cmd == "due":
    due = [c for c in cards(load()) if c[1] <= today and c[2] <= 3]
    if due:
        n, nxt, box, subj, q, a = min(due, key=lambda c: c[1])
        late = (today - nxt).days
        print(f"=== 👻 GHOST CARD (deck line {n}, box {box}, {len(due)} due) — ask it cold, "
              f"one question, BEFORE anything else; then ghost.py pass|fail {n} ===")
        print(f"  [{subj}] Q: {q}")
        print(f"  (answer, for Crow only: {a})")
elif cmd == "add":
    subj, q, a = sys.argv[2:5]
    with DECK.open("a") as f:
        f.write(fmt(today + dt.timedelta(days=3), 1, subj, q, a) + "\n")
    print("added, due", (today + dt.timedelta(days=3)).isoformat())
elif cmd in ("pass", "fail"):
    regrade(int(sys.argv[2]), cmd == "pass")
elif cmd == "list":
    for n, nxt, box, subj, q, _ in cards(load()):
        if box <= 3:
            print(f"{n:>3}  {nxt}  box {box}  [{subj}] {q}")
else:
    sys.exit(__doc__)
