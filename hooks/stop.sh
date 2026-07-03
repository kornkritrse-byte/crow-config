#!/usr/bin/env bash
# stop.sh — session sync + intent-based end-of-day wrap-up.
# Wired via ~/.claude/settings.json (Stop hook).
#
# IMPORTANT: a Stop hook fires on EVERY turn end (control returning to Korn),
# NOT when the day/session is over. So this must NOT force a wrap-up by default.
# Doing so is what caused the "hey" -> instant wrap-up bug (a stale sitrep timer
# was standing in for Korn's intent).
#
# The end-of-day wrap-up (SITREP rewrite + nightly quote) is INTENT-based:
# it runs ONLY when Korn has said he's logging off / going to sleep, which makes
# Crow create the marker file below. No marker => every stop just quietly syncs.
#
#   Phase 1 (marker present, first stop): block once, hand Crow the wrap-up job.
#   Phase 2 (stop_hook_active=true): wrap-up done -> clear marker, sync, exit.
#   No marker: quiet autosave sync, never block.
#
# Wrapped to never hard-fail or block session shutdown (e.g. when offline).

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
marker="$HOME/.crow-session-ending"
input="$(cat 2>/dev/null || true)"

if echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  # Phase 2: wrap-up already handed over and completed. Clean up + sync.
  rm -f "$marker" 2>/dev/null || true
  cd "$repoDir" 2>/dev/null || exit 0
  bash "$repoDir/save.sh" >/dev/null 2>&1 || true
  exit 0
fi

if [ -f "$marker" ]; then
  # Phase 1: Korn signalled end of day. Block once for the wrap-up.
  cat <<'EOF'
{"decision": "block", "reason": "Korn is logging off for the day. Before the session closes: (1) rewrite memory/sitrep.md per the REWRITE RULE at its top — rolling 2-session window, flush the falling-out note to sessions_log.md, push durable facts to project files; a trivial day is a one-line note + date bump. (2) Give the nightly quote (feedback_artis_quote) if not already given tonight. Then stop."}
EOF
  exit 0
fi

# No end-of-day signal from Korn: quiet autosave, never block.
cd "$repoDir" 2>/dev/null || exit 0
bash "$repoDir/save.sh" >/dev/null 2>&1 || true
