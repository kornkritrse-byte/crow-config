#!/usr/bin/env bash
# session-start.sh — injects the SITREP into context at session start so Crow
# wakes up caught-up instead of cold. Wired via ~/.claude/settings.json (SessionStart hook).
# The hook *logic* lives here in the repo so it travels across devices; only the
# one-line wiring in settings.json is per-machine.
#
# Reads the LIVE memory copy first (the one Crow edits during sessions) and only
# falls back to the repo copy — the repo copy is one failed push away from stale.

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
liveSitrep="$HOME/.claude/projects/$slug/memory/sitrep.md"
repoSitrep="$repoDir/memory/sitrep.md"

# --- Upcoming-events banner: closest event from the maintained list + camp countdown.
# Events file is NOT live calendar data; Crow mirrors calendar changes into it.
eventsFile="$HOME/.claude/projects/$slug/memory/reference_upcoming_events.md"
campDate="2026-07-25"
today="$(date +%Y-%m-%d)"
epoch() { date -j -f %Y-%m-%d "$1" +%s 2>/dev/null || date -d "$1" +%s 2>/dev/null; }
days_until() { echo $(( ($(epoch "$1") - $(epoch "$today")) / 86400 )); }
label() {  # "in N days" with today/tomorrow special-cased
  case "$1" in 0) echo "TODAY";; 1) echo "tomorrow";; *) echo "in $1 days";; esac
}
banner=""
if [ -f "$eventsFile" ]; then
  next="$(grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2} \|' "$eventsFile" | sort | awk -v t="$today" '$1 >= t' | head -1)"
  if [ -n "$next" ]; then
    nextDate="${next%% |*}"
    nextTitle="${next#*| }"
    banner="⏳ Next up: ${nextTitle} — $(label "$(days_until "$nextDate")") (${nextDate})"
  fi
fi
if [ "$today" \< "$campDate" ] || [ "$today" = "$campDate" ]; then
  campLine="🏕️ Camp: $(label "$(days_until "$campDate")") (25–27 Jul)"
  banner="${banner:+$banner · }$campLine"
fi
[ -n "$banner" ] && echo "=== $banner ==="

if [ -f "$liveSitrep" ]; then
  echo "=== CROW SITREP (auto-loaded, live copy) ==="
  cat "$liveSitrep"
elif [ -f "$repoSitrep" ]; then
  echo "=== CROW SITREP (auto-loaded, repo FALLBACK — live copy missing; run load.sh) ==="
  cat "$repoSitrep"
fi
