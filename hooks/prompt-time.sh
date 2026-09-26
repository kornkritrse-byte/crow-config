#!/usr/bin/env bash
# prompt-time.sh — stamps the real clock onto every message Korn sends.
# Wired via ~/.claude/settings.json (UserPromptSubmit hook); stdout is added
# to Crow's context alongside the prompt.
#
# Why: Crow drifted the clock twice (once ~50 min, stamped into a published
# artifact). "Check `date` before any time reference" was a promise, and the
# promise failed. This makes the clock ambient instead of remembered.
echo "[clock] $(date '+%a %d %b %Y, %H:%M') (Bangkok)"
