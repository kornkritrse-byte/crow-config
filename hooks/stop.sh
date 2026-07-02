#!/usr/bin/env bash
# stop.sh — two-phase session close. Wired via ~/.claude/settings.json (Stop hook).
#
# Phase 1 (first stop attempt, sitrep stale): block the stop and hand Crow the
#   SITREP rewrite instruction (rule lives in memory/sitrep.md itself).
# Phase 2 (stop_hook_active=true, OR the sitrep was already rewritten in the
#   last 45 min): let the session end and run save.sh to sync to GitHub.
#   The freshness guard stops the hook from nagging on every stop of a session
#   whose sitrep is already current. Trade-off: a fresh sitrep also skips the
#   nightly-quote reminder — the quote habit rides on the same block.
#
# Wrapped to never hard-fail or block the session shutdown (e.g. when offline).

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
slug="$(echo "$repoDir" | sed 's#/#-#g')"
liveSitrep="$HOME/.claude/projects/$slug/memory/sitrep.md"
input="$(cat 2>/dev/null || true)"

sitrepFresh=false
if [ -f "$liveSitrep" ] && [ -n "$(find "$liveSitrep" -mmin -45 2>/dev/null)" ]; then
  sitrepFresh=true
fi

if ! echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true' \
   && [ "$sitrepFresh" != true ]; then
  cat <<'EOF'
{"decision": "block", "reason": "Session is ending. Before it closes: (1) rewrite memory/sitrep.md following the REWRITE RULE at the top of that file — rolling 2-session window, flush the note that falls out to sessions_log.md, push durable facts to project files; if the session was trivial, a one-line note and date bump is enough. (2) If you haven't given Korn the nightly quote yet (feedback_artis_quote), do it now. Then stop."}
EOF
  exit 0
fi

cd "$repoDir" 2>/dev/null || exit 0
bash "$repoDir/save.sh" >/dev/null 2>&1 || true
