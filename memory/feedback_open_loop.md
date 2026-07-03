---
name: feedback-open-loop
description: "When Korn says he's stepping away and what he's off to do, log it on the SITREP Current-status line and ask him to fill the gap when he's back — keep the day cohesive."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ced8d8d3-5ee0-4f77-85a1-605e9bec2b81
---

When Korn tells me he's stepping away and what he's going off to do (run, dinner, shower, read, out with friends, etc.), note it — and when he comes back, use it so the day reads as one continuous thread instead of disconnected pings.

**Why:** he pops in and out across a day and wants continuity held for him. Asked 2026-07-03: "whenever I tell you what I'm going off to, keep that noted so when I come back you can ask me to fill in the blanks in between, keep the whole thing cohesive."

**How to apply:**
- **Trigger on his sign-off words** — "see you", "good night", "gtg", "I'll be back in a bit", or him accepting a send-off from me ("aight, off to shower"). Update the `🚪 Current status` line in [[sitrep]] **in that same turn**; if he keeps talking, update again — last write wins. This counts even when I'm the one who told him to go do the thing.
- **Soft phrasing still counts as a real sign-off.** Korn confirmed (2026-07-03) that "yea ill see you tmr probably" was a genuine day-end and the right trigger for the full wrap-up — trust the read, don't demand certainty. If he pops back after the wrap-up already fired, just flip the status to Here and continue — **the nightly quote fires once per day, never a second time.**
- **Separate closed from open.** The status line holds ONLY the not-yet-reported gap (`AWAY — off to: X. ASK ON RETURN: X`). Things he already reported are closed → session note, never the status line, never re-asked.
- On return: read that line before greeting. Ask about exactly the open items, fold answers into the day's session note, reset the line to "here."
- Don't log a stale away-note after the fact — if he's already back and done the thing, that note has expired (his call 2026-07-03). Live continuity, not a diary of completed errands.
- The mechanism itself lives as rewrite-rule #5 in [[sitrep]].

**Failure log:** 2026-07-03 — v1 wrote the away-note mid-session with closed and open items mixed on one line ("ran → dinner → back. Next: shower, reading"); next session Crow asked about the run (already closed) instead of the reading (the open gap). Korn caught it and asked for the sign-off trigger + closed/open separation above.
