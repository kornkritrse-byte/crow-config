#!/usr/bin/env python3
"""ledger.py — the said/did ledger. Vera's evidence.

Every time Korn says "I'll do X" with a when attached, it gets a line. Next
session it gets checked. The point is one honest number, not a guilt list:
his follow-through measured, instead of felt ([[chapters]] Ch. 6 — "his sense
of how something is going measures how close he's been standing to it").

Ledger file: memory/ledger_said_did.md, one line per commitment:
  - [ ] <said YYYY-MM-DD> → <due YYYY-MM-DD> | <what he said, his words>
Status box:  [ ] open · [x] done · [-] didn't · [~] changed on purpose (not a miss)

Usage:
  ledger.py due     open items whose due date has arrived (for the hook)
  ledger.py rate    follow-through over the last 7 days of due dates
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
LEDGER = MEM / "ledger_said_did.md"
ROW = re.compile(r"^- \[(.)\] (\d{4}-\d{2}-\d{2}) → (\d{4}-\d{2}-\d{2}) \| (.+)$")
today = dt.date.today()

rows = []
if LEDGER.exists():
    for n, l in enumerate(LEDGER.read_text().splitlines(), 1):
        m = ROW.match(l)
        if m:
            rows.append((n, m[1], dt.date.fromisoformat(m[2]), dt.date.fromisoformat(m[3]), m[4]))


def rate(days=7):
    window = [r for r in rows if 0 <= (today - r[3]).days < days and r[1] in "x-"]
    if not window:
        return None
    done = sum(r[1] == "x" for r in window)
    return done, len(window)


cmd = sys.argv[1] if len(sys.argv) > 1 else "due"
if cmd == "due":
    due = [r for r in rows if r[1] == " " and r[3] < today]
    if due:
        print("=== 🪞 SAID/DID — check these with him (mark [x] / [-] / [~]) ===")
        for n, _, said, by, what in due:
            print(f"  line {n}: said {said:%d %b}, due {by:%d %b} — {what}")
    r = rate()
    if r and today.weekday() == 6:  # Sundays: the weekly number
        print(f"=== 🪞 WEEKLY FOLLOW-THROUGH: {r[0]}/{r[1]} ({100*r[0]//r[1]}%) — give him the number, flat ===")
elif cmd == "rate":
    r = rate()
    print("no scored items in the last 7 days" if not r else f"{r[0]}/{r[1]} ({100*r[0]//r[1]}%)")
else:
    sys.exit(__doc__)
