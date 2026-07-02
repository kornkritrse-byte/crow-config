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

if [ -f "$liveSitrep" ]; then
  echo "=== CROW SITREP (auto-loaded, live copy) ==="
  cat "$liveSitrep"
elif [ -f "$repoSitrep" ]; then
  echo "=== CROW SITREP (auto-loaded, repo FALLBACK — live copy missing; run load.sh) ==="
  cat "$repoSitrep"
fi
