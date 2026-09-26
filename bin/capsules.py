#!/usr/bin/env python3
"""capsules.py — time capsules. Sealed notes that surface on their date.

Capsule files: memory/capsules/<YYYY-MM-DD>-<slug>.md (the date = open-on day).
On or after that date, the session-start hook prints the capsule for Crow to
deliver whole, first thing. Delivered capsules move to capsules/opened/.

Sealed is an honor system — they sit in the Obsidian vault like everything
else. Korn knows that. Not peeking is part of it.

Usage:
  capsules.py due             print any capsule whose day has come (for the hook)
  capsules.py opened <file>   move a delivered capsule to opened/
  capsules.py list            dates + slugs only, never contents
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
MEM = pathlib.Path.home() / ".claude/projects" / str(REPO).replace("/", "-") / "memory"
DIR = MEM / "capsules"
today = dt.date.today()


def sealed():
    for p in sorted(DIR.glob("*.md")):
        m = re.match(r"(\d{4}-\d{2}-\d{2})-(.+)\.md$", p.name)
        if m:
            yield p, dt.date.fromisoformat(m[1]), m[2]


cmd = sys.argv[1] if len(sys.argv) > 1 else "due"
if cmd == "due":
    for p, day, slug in sealed():
        if day <= today:
            body = p.read_text().split("---", 2)[-1].strip()
            print(f"=== 📬 TIME CAPSULE DUE ({day:%d %b %Y}, {slug}) — deliver it WHOLE, before anything else, "
                  f"then: bin/capsules.py opened {p.name} ===")
            print(body)
elif cmd == "opened":
    src = DIR / sys.argv[2]
    (DIR / "opened").mkdir(exist_ok=True)
    src.rename(DIR / "opened" / src.name)
    print("moved to opened/")
elif cmd == "list":
    for _, day, slug in sealed():
        print(f"{day}  {slug}")
else:
    sys.exit(__doc__)
