#!/usr/bin/env bash
# recall.sh — search Crow's memory for a term: the live memory files first,
# then the repo's git history (where condensed/flushed/deleted detail survives).
#
# Usage: bin/recall.sh <term>
#
# Why this exists: the SITREP rolling window deliberately forgets — session
# notes get condensed into sessions_log.md and detail drops. The full text
# lives in git history of the repo's memory/ copy, but digging it is
# non-obvious. This makes the buy-back one command.
#
# Layer 1: case-insensitive grep across the LIVE memory dir (current truth).
# Layer 2: git log -S over the repo — commits where the term was added/removed
#          (renamed/deleted/condensed content included). Dig a hit with:
#          git show <sha>:memory/<file>.md

set -u
term="${1:-}"
if [ -z "$term" ]; then
  echo "usage: recall.sh <term>" >&2
  exit 1
fi

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
liveMem="$HOME/.claude/projects/$slug/memory"

echo "=== LIVE MEMORY ($liveMem) ==="
grep -rin --color=never "$term" "$liveMem" 2>/dev/null \
  | sed "s#^$liveMem/##" \
  || echo "(no live matches)"

echo ""
echo "=== GIT HISTORY (commits that added/removed '$term') ==="
cd "$repoDir" 2>/dev/null || exit 0
hits="$(git log --all -i -S"$term" --oneline --date=short --pretty='%h %ad %s' -- memory/ 2>/dev/null)"
if [ -n "$hits" ]; then
  echo "$hits"
  echo ""
  echo "(dig one: git -C $repoDir show <sha> --stat  |  git -C $repoDir show <sha>:memory/<file>.md)"
else
  echo "(no history matches)"
fi
