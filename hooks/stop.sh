#!/usr/bin/env bash
# stop.sh — on session stop, sync memory + CLAUDE.md back to GitHub.
# Runs save.sh, which only commits/pushes when something actually changed.
# Wrapped to never hard-fail or block the session (e.g. when offline).
# Wired via ~/.claude/settings.json (Stop hook).

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repoDir" 2>/dev/null || exit 0
bash "$repoDir/save.sh" >/dev/null 2>&1 || true
