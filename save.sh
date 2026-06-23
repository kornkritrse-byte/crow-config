#!/usr/bin/env bash
# save.sh — copy local Claude files into repo and push to GitHub (Mac/Linux)
set -euo pipefail

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
memorySource="$HOME/.claude/projects/$slug/memory"

cp "$HOME/CLAUDE.md" "$repoDir/CLAUDE.md"
cp "$memorySource"/* "$repoDir/memory/"

cd "$repoDir"
if [[ -n "$(git status --porcelain)" ]]; then
  git add .
  git commit -m "sync $(date '+%Y-%m-%d %H:%M')"
  git push
  echo "Saved to GitHub."
else
  echo "Nothing new to save."
fi
