#!/usr/bin/env python3
"""lint-sitrep.py — mechanical check of the SITREP against its own rules.

Why: the maintenance rules live inside the SITREP, and Crow still broke them
(21KB file, two contradicting ASK ON RETURN blocks, 13-Sep items still marked
live on 27 Sep). Rules that depend on Crow remembering them drift; this runs
at every session start and prints only when something is wrong.

Usage: bin/lint-sitrep.py            (prints warnings, silent if clean)
"""
import datetime as dt
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
SLUG = str(REPO).replace("/", "-")
MEM = pathlib.Path.home() / ".claude/projects" / SLUG / "memory"
SITREP = MEM / "sitrep.md"

SIZE_CAP = 12_000          # bytes; the window is two sessions, not a history
MAX_SESSIONS = 2
MAX_BULLETS = 6
LIVE_STALE_DAYS = 7
MONTHS = {m: i for i, m in enumerate(
    "jan feb mar apr may jun jul aug sep oct nov dec".split(), 1)}

today = dt.date.today()
warn = []


def dates_in(text):
    """Every 'DD Mon' / 'Mon DD' / ISO date in a line, as date objects."""
    out = []
    for y, m, d in re.findall(r"(\d{4})-(\d{2})-(\d{2})", text):
        out.append(dt.date(int(y), int(m), int(d)))
    for d, m in re.findall(r"\b(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b", text):
        try:
            out.append(dt.date(today.year, MONTHS[m.lower()], int(d)))
        except ValueError:
            pass
    return out


if not SITREP.exists():
    sys.exit(0)
text = SITREP.read_text()
lines = text.splitlines()

size = len(text.encode())
if size > SIZE_CAP:
    warn.append(f"size {size/1000:.1f}KB > {SIZE_CAP/1000:.0f}KB cap — flush durable facts out, condense")

# ASK ON RETURN mentions outside the MAINTENANCE RULE section (which describes the format)
asks, in_rules = [], False
for i, l in enumerate(lines):
    if l.startswith("## "):
        in_rules = "MAINTENANCE" in l
    if not in_rules and "ASK ON RETURN" in l:
        asks.append(i + 1)
if len(asks) > 1:
    warn.append(f"{len(asks)} ASK ON RETURN blocks (lines {asks}) — keep ONE, on the status line")

sessions = [(i, l) for i, l in enumerate(lines) if l.startswith("## Session")]
if len(sessions) > MAX_SESSIONS:
    warn.append(f"{len(sessions)} session notes > {MAX_SESSIONS} — flush the oldest to sessions_log.md")
for n, (i, head) in enumerate(sessions):
    end = next((j for j in range(i + 1, len(lines)) if lines[j].startswith("## ")), len(lines))
    bullets = sum(1 for l in lines[i + 1:end] if l.startswith("- "))
    if bullets > MAX_BULLETS:
        warn.append(f"'{head[:40]}…' has {bullets} bullets > {MAX_BULLETS}")

m = re.search(r"Last updated: (\d{4}-\d{2}-\d{2})", text)
if m:
    age = (today - dt.date.fromisoformat(m.group(1))).days
    if age > 2:
        warn.append(f"'Last updated' is {age} days old")

# Live / time-critical sections: bullets whose NEWEST date is over a week old
in_live = False
for i, l in enumerate(lines):
    if l.startswith("#"):
        in_live = bool(re.search(r"live|time-critical", l, re.I))
        continue
    if in_live and l.startswith("- ") and "✅" not in l[:6]:
        ds = [d for d in dates_in(l) if d <= today]
        if ds and (today - max(ds)).days > LIVE_STALE_DAYS:
            warn.append(f"line {i+1}: marked live but newest date is {max(ds):%d %b} — close it or move it")

# Memory-folder hygiene
strays = sorted(p.name for p in MEM.glob("Untitled*"))
if strays:
    warn.append(f"stray Obsidian files in memory/: {', '.join(strays)}")
for p in MEM.glob("*.md"):
    if p.name == "MEMORY.md":
        continue
    head = p.read_text()[:600]
    if head.startswith("---") and "aliases:" not in head:
        warn.append(f"{p.name} has no aliases line (shows unresolved in Obsidian graph)")

if warn:
    print("=== 🧹 SITREP LINT — fix these this session ===")
    for w in warn:
        print(f"  • {w}")
