#!/usr/bin/env python3
"""mcq.py — the MCQ log behind the pixel percentage tube.

Every MCQ Crow grades in chat gets logged here: right or wrong, plus a short
topic tag. The Crow Room reads this file to fill the glass tube that sits
between the basketball hoop and the book pile — green fluid rises and falls
with recent accuracy, live while an MCQ card is up.

Log file: memory/mcq_log.md, one line per graded MCQ:
  - <YYYY-MM-DD HH:MM> | <correct|wrong> | <topic>

Usage:
  mcq.py add <correct|wrong> <topic>    log a graded MCQ (that turn, right after grading)
  mcq.py pct [n]                        rolling % correct over the last n (default 20)
  mcq.py list [n]                       the last n entries (default 10)
  mcq.py reset                          empty the log (tube + FG board start at 0);
                                        old rows move to memory/mcq_log_archive.md
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
LOG = MEM / "mcq_log.md"
ROW = re.compile(r"^- (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) \| (correct|wrong) \| (.+)$")
BKK = dt.timezone(dt.timedelta(hours=7))
now = dt.datetime.now(BKK)
WINDOW = 20

HEADER = """---
name: mcq-log
aliases: ["mcq-log"]
description: "The MCQ log: one line per graded MCQ (correct/wrong + topic). Feeds the pixel percentage tube in the Crow Room board; written by bin/mcq.py"
metadata:
  type: project
---

# \U0001f3af MCQ log
"""


def rows():
    if not LOG.exists():
        return []
    return [m for l in LOG.read_text().splitlines() if (m := ROW.match(l))]


cmd = sys.argv[1] if len(sys.argv) > 1 else "pct"
if cmd == "add":
    if len(sys.argv) < 3 or sys.argv[2] not in ("correct", "wrong"):
        sys.exit("usage: mcq.py add <correct|wrong> <topic>")
    result, topic = sys.argv[2], " ".join(sys.argv[3:]).replace("\n", " ").replace("|", "/").strip() or "untagged"
    if not LOG.exists():
        LOG.write_text(HEADER)
    with LOG.open("a") as f:
        f.write(f"- {now:%Y-%m-%d %H:%M} | {result} | {topic}\n")
    last = rows()[-WINDOW:]
    pct = round(100 * sum(r[3] == "correct" for r in last) / len(last))
    print(f"logged ({result}): {pct}% over last {len(last)}")
elif cmd == "pct":
    n = int(sys.argv[2]) if len(sys.argv) > 2 else WINDOW
    last = rows()[-n:]
    if not last:
        print("no mcqs logged yet")
    else:
        pct = round(100 * sum(r[3] == "correct" for r in last) / len(last))
        print(f"{pct}% over last {len(last)}")
elif cmd == "list":
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    for r in rows()[-n:]:
        print(f"{r[1]} {r[2]}  {r[3]:<8} {r[4]}")
elif cmd == "reset":
    # Archive, don't delete: the server reads mcq_log.md live, so emptying it
    # resets the tube and the FG board with no Room restart.
    old = [l for l in (LOG.read_text().splitlines() if LOG.exists() else []) if ROW.match(l)]
    archive = MEM / "mcq_log_archive.md"
    with archive.open("a") as f:
        if archive.stat().st_size == 0:
            f.write("# \U0001f3af MCQ log archive (rows moved out by mcq.py reset)\n")
        f.write(f"\n## reset {now:%Y-%m-%d %H:%M} ({len(old)} rows)\n" + "".join(l + "\n" for l in old))
    LOG.write_text(HEADER)
    print(f"reset: {len(old)} rows archived to {archive.name}, log empty")
else:
    sys.exit(__doc__)
