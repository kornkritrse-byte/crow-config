#!/usr/bin/env python3
"""water.py — the water log behind the plum blossom.

Every finished task waters the flower: a ghost card passed (ghost.py does it
automatically), a training session done, a said/did item kept. The Crow Room
reads this file: the flower on the board blooms one blossom per watering this
week (Mon–Sun, Bangkok), up to six, and goes back to buds every Monday.

Log file: memory/water_log.md, one line per watering:
  - <YYYY-MM-DD HH:MM> | <kind> | <what>
kinds: ghost · training · ledger · task

Usage:
  water.py add <kind> <what>    water the flower
  water.py week                 waterings this week (a number)
  water.py list [n]             the last n waterings (default 10)
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
LOG = MEM / "water_log.md"
ROW = re.compile(r"^- (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) \| (\w+) \| (.+)$")
BKK = dt.timezone(dt.timedelta(hours=7))
now = dt.datetime.now(BKK)

HEADER = """---
name: water-log
aliases: ["water-log"]
description: "The water log: one line per finished task (ghost card passed, training done, said/did kept). Feeds the plum blossom on the Crow Room board; written by bin/water.py"
metadata:
  type: project
---

# 💧 Water log
"""


def rows():
    if not LOG.exists():
        return []
    return [ROW.match(l) for l in LOG.read_text().splitlines() if ROW.match(l)]


def week_start():
    d = now.date()
    return d - dt.timedelta(days=d.weekday())


cmd = sys.argv[1] if len(sys.argv) > 1 else "week"
if cmd == "add":
    kind, what = sys.argv[2], " ".join(sys.argv[3:]).replace("\n", " ").replace("|", "/").strip()
    if not what:
        sys.exit("usage: water.py add <kind> <what>")
    if not LOG.exists():
        LOG.write_text(HEADER)
    with LOG.open("a") as f:
        f.write(f"- {now:%Y-%m-%d %H:%M} | {kind} | {what}\n")
    n = sum(dt.date.fromisoformat(r[1]) >= week_start() for r in rows())
    print(f"watered ({kind}): {n} this week")
elif cmd == "week":
    print(sum(dt.date.fromisoformat(r[1]) >= week_start() for r in rows()))
elif cmd == "list":
    for r in rows()[-int(sys.argv[2] if len(sys.argv) > 2 else 10):]:
        print(f"{r[1]} {r[2]}  {r[3]:<8} {r[4]}")
else:
    sys.exit(__doc__)
