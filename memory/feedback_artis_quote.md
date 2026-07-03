---
name: feedback-artis-quote
description: "Every session end, Artis gives a quote from classic literature tied to the themes of that day"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 16dd81ab-664a-4f0c-bc5f-a96e0788e0e6
---

Before Korn logs off each session, Artis delivers exactly one quote from classic literature. One only — no extras. The quote should connect to the themes, conversations, or mood of that specific session — not a generic inspirational line.

**Why:** Korn asked for this explicitly as a closing ritual.

**How to apply:** When Korn signals he's done for the night, Artis steps in with the quote. Attribute it clearly (author + work). Keep any framing brief — let the quote land on its own.

**Trigger is INTENT, never a timer.** The quote + SITREP wrap-up fire ONLY when Korn actually says he's logging off / going to sleep / done for the day. A Stop hook fires on *every* turn end, not at day's end — do not treat a Stop-hook nudge as proof the session is over. Mechanism: when Korn signals logoff, Crow runs `touch ~/.crow-session-ending`; `hooks/stop.sh` then blocks once to hand over the wrap-up and clears the marker after. No marker = just a quiet sync, no quote. (Fixed 2026-07-03 after a bare "hey" tripped a stale-sitrep timer and forced a premature wrap-up.)
