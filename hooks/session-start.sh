#!/usr/bin/env bash
# session-start.sh — injects the SITREP into context at session start so Crow
# wakes up caught-up instead of cold. Wired via ~/.claude/settings.json (SessionStart hook).
# The hook *logic* lives here in the repo so it travels across devices; only the
# one-line wiring in settings.json is per-machine.

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
sitrep="$repoDir/memory/sitrep.md"

if [ -f "$sitrep" ]; then
  echo "=== CROW SITREP (auto-loaded) ==="
  cat "$sitrep"
fi
