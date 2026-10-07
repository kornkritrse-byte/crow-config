#!/usr/bin/env python3
"""goals.py — today's goals, the plum blossom's petals (Korn's design, 29 Sep).

At the first session of the day Crow asks "goals today?" and lists them here.
The flower in the Crow Room gets one blossom slot per goal; each goal done opens
one. When Korn logs off for the day (the ~/.crow-session-ending flow) the day is
closed, the petals fall, and the next day starts bare.

Standing goals are added on their own when the day's list is first set:
  - "Wake early"     checked at the first session of the day
  - "Bed by 23:30"   checked at the NEXT session; it counts toward the day it
                     belongs to, so it has no blossom on the live flower
  - training         only on days the Road to Chombueng plan has a session

A "day" runs 05:00 → 05:00 Bangkok, so a 1am log-off still closes the day it belongs to.

Log file: memory/goals_today.md, one line per goal:
  - <YYYY-MM-DD> | <goal> | open|done|missed
  - <YYYY-MM-DD> | — | closed          (the day is over, the petals fell)

Usage:
  goals.py set <goal> [<goal> …]   today's own goals (max 7) + the standing ones
  goals.py done <n> [YYYY-MM-DD]   goal n done (waters the flower too)
  goals.py miss <n> [YYYY-MM-DD]   goal n missed
  goals.py unknown <n> [YYYY-MM-DD] he doesn't remember: stops the ask, no blossom either way
  goals.py today [YYYY-MM-DD]      the list, numbered
  goals.py close                   the day is over: the petals fall
  goals.py check                   what Crow should ask right now (for the session-start hook)
"""
import datetime as dt
import json
import pathlib
import re
import subprocess
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
LOG = MEM / "goals_today.md"
ROW = re.compile(r"^- (\d{4}-\d{2}-\d{2}) \| (.+?) \| (open|done|missed|unknown|closed)$")
BKK = dt.timezone(dt.timedelta(hours=7))
DAY = (dt.datetime.now(BKK) - dt.timedelta(hours=5)).date().isoformat()
MAX_OWN = 7
WAKE, BED = "Wake early", "Bed by 23:30"
TRAINING_FROM = "2026-10-05"   # training is paused until the Monday after the last midterm

HEADER = """---
name: goals-today
aliases: ["goals-today"]
description: "Korn's goals per day: one blossom each on the Crow Room's plum blossom; the petals fall when he logs off. Written by bin/goals.py"
metadata:
  type: project
---

# 🌸 Goals today
"""


def lines():
    return LOG.read_text().splitlines() if LOG.exists() else []


def goals(day):
    """[(line index, goal, status)] for that day, closed marker excluded."""
    out = []
    for i, l in enumerate(lines()):
        m = ROW.match(l)
        if m and m[1] == day and m[3] != "closed":
            out.append((i, m[2], m[3]))
    return out


def closed(day):
    return any((m := ROW.match(l)) and m[1] == day and m[3] == "closed" for l in lines())


def append(rows):
    if not LOG.exists():
        LOG.write_text(HEADER)
    with LOG.open("a") as f:
        for r in rows:
            f.write(r + "\n")


def training(day):
    if day < TRAINING_FROM:
        return None
    try:
        plan = json.loads((REPO / "ui/road-plan.json").read_text())
        s = next((s for s in plan["sessions"] if s["date"] == day), None)
        return s and s.get("title")
    except (OSError, ValueError, KeyError):
        return None


def show(day):
    g = goals(day)
    if not g:
        print(f"no goals for {day}")
    for n, (_, goal, status) in enumerate(g, 1):
        print(f"{n}. [{ {'open': ' ', 'done': 'x', 'missed': '-', 'unknown': '?'}[status] }] {goal}")
    if closed(day):
        print("(day closed, the petals fell)")


def mark(status, args):
    day = args[1] if len(args) > 1 else DAY
    g = goals(day)
    try:
        i, goal, _ = g[int(args[0]) - 1]
    except (ValueError, IndexError):
        sys.exit(f"no goal {args[0] if args else '?'} on {day}")
    ls = lines()
    ls[i] = f"- {day} | {goal} | {status}"
    LOG.write_text("\n".join(ls) + "\n")
    if status == "done":
        subprocess.run([sys.executable, str(REPO / "bin/water.py"), "add", "goal", goal], check=False)
    print(f"{goal}: {status}")


cmd, args = (sys.argv[1] if len(sys.argv) > 1 else "today"), sys.argv[2:]
if cmd == "set":
    own = [a.replace("|", "/").strip() for a in args if a.strip()]
    if not own:
        sys.exit("usage: goals.py set <goal> [<goal> …]")
    if closed(DAY):
        sys.exit(f"{DAY} is already closed")
    have = goals(DAY)
    have_own = [g for _, g, _ in have if g not in (WAKE, BED) and not g.startswith("Training: ")]
    if len(have_own) + len(own) > MAX_OWN:
        sys.exit(f"max {MAX_OWN} goals a day ({len(have_own)} already set)")
    rows = [f"- {DAY} | {g} | open" for g in own]
    if not have:   # first list of the day: the standing goals come with it
        rows.append(f"- {DAY} | {WAKE} | open")
        t = training(DAY)
        if t:
            rows.append(f"- {DAY} | Training: {t} | open")
        rows.append(f"- {DAY} | {BED} | open")
    append(rows)
    show(DAY)
elif cmd in ("done", "miss", "unknown"):
    mark({"done": "done", "miss": "missed"}.get(cmd, cmd), args)
elif cmd == "today":
    show(args[0] if args else DAY)
elif cmd == "close":
    if goals(DAY) and not closed(DAY):
        append([f"- {DAY} | — | closed"])
        print(f"{DAY} closed: the petals fall")
    else:
        print(f"nothing to close for {DAY}")
elif cmd == "check":
    asks = []
    if not goals(DAY):
        asks.append('Ask "goals today?" (max 7), then: goals.py set "<goal>" …')
    else:
        for n, (_, g, s) in enumerate(goals(DAY), 1):
            if g == WAKE and s == "open":
                asks.append(f"Did he wake early? goals.py done|miss {n}")
    prev = sorted({m[1] for l in lines() if (m := ROW.match(l)) and m[1] < DAY})
    if prev:
        for n, (_, g, s) in enumerate(goals(prev[-1]), 1):
            if g == BED and s == "open":
                asks.append(f"Bed by 23:30 on {prev[-1]}? goals.py done|miss {n} {prev[-1]}")
    if asks:
        print("=== 🌸 GOALS — one blossom per goal on the Room's flower; ask these (one at a time), then run the command ===")
        for a in asks:
            print("  " + a)
else:
    sys.exit(__doc__)
