#!/usr/bin/env bash
# load.sh — pull from GitHub and copy files to local Claude locations (Mac/Linux)
set -euo pipefail

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
memoryDest="$HOME/.claude/projects/$slug/memory"

cd "$repoDir"
git pull

cp "$repoDir/CLAUDE.md" "$HOME/CLAUDE.md"

mkdir -p "$memoryDest"
cp "$repoDir"/memory/* "$memoryDest/"

echo "Loaded from GitHub. Memory -> $memoryDest"
