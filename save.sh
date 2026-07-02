#!/usr/bin/env bash
# save.sh — copy local Claude files into repo and push to GitHub (Mac/Linux)
set -euo pipefail

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
memorySource="$HOME/.claude/projects/$slug/memory"

# The persona is stored as CROW.md in the repo (NOT CLAUDE.md) so it doesn't
# get loaded twice when a session runs from inside the repo — the single loaded
# copy is ~/CLAUDE.md, which Claude Code picks up from any dir under home.
cp "$HOME/CLAUDE.md" "$repoDir/CROW.md"

# Mirror memory (deletes propagate — no more zombie files in the repo).
# Guarded on sitrep.md existing in the source: a wrong-slug or empty live dir
# must never --delete the repo's memory. Falls back to plain copy if rsync is missing.
if [[ -f "$memorySource/sitrep.md" ]]; then
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$memorySource"/ "$repoDir/memory/"
  else
    cp "$memorySource"/* "$repoDir/memory/"
  fi
else
  echo "WARNING: $memorySource has no sitrep.md — skipping memory sync (wrong slug or empty dir?)" >&2
fi

cd "$repoDir"
if [[ -n "$(git status --porcelain)" ]]; then
  git add .
  git commit -m "sync $(date '+%Y-%m-%d %H:%M')"
fi
# Push whenever we're ahead, not only when files just changed — otherwise a
# commit made while offline strands locally (next run sees a clean tree and skips).
if [[ -n "$(git rev-list '@{u}..HEAD' 2>/dev/null || true)" ]]; then
  git push
  echo "Saved to GitHub."
else
  echo "Nothing new to save."
fi
