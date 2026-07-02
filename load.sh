#!/usr/bin/env bash
# load.sh — pull from GitHub and copy files to local Claude locations (Mac/Linux)
set -euo pipefail

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
memoryDest="$HOME/.claude/projects/$slug/memory"

cd "$repoDir"
git pull

cp "$repoDir/CROW.md" "$HOME/CLAUDE.md"

# Mirror memory (deletes propagate — otherwise this machine's stale live copy
# resurrects deleted files into the repo on its next save). Guarded on sitrep.md
# existing in the repo so a broken checkout can't wipe the live memory.
mkdir -p "$memoryDest"
if [[ -f "$repoDir/memory/sitrep.md" ]]; then
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$repoDir"/memory/ "$memoryDest/"
  else
    cp "$repoDir"/memory/* "$memoryDest/"
  fi
else
  echo "WARNING: repo memory/ has no sitrep.md — skipping memory load (broken checkout?)" >&2
fi

echo "Loaded from GitHub. Memory -> $memoryDest"
