---
name: feedback-artis-quote
description: "Every session end, Artis gives a quote from classic literature tied to the themes of that day"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 16dd81ab-664a-4f0c-bc5f-a96e0788e0e6
  modified: 2026-09-12T09:06:31.875Z
---

Before Korn logs off each session, Artis delivers exactly one quote from classic literature. One only — no extras. The quote should connect to the themes, conversations, or mood of that specific session — not a generic inspirational line.

**Why:** Korn asked for this explicitly as a closing ritual.

**How to apply:** When Korn signals he's done for the night, Artis steps in with the quote. Attribute it clearly (author + work). Keep any framing brief — let the quote land on its own.

**Trigger is INTENT, never a timer.** The quote + SITREP wrap-up fire ONLY when Korn actually says he's logging off / going to sleep / done for the day. A Stop hook fires on *every* turn end, not at day's end — do not treat a Stop-hook nudge as proof the session is over. Mechanism: when Korn signals logoff, Crow runs `touch ~/.crow-session-ending`; `hooks/stop.sh` then blocks once to hand over the wrap-up and clears the marker after. No marker = just a quiet sync, no quote. (Fixed 2026-07-03 after a bare "hey" tripped a stale-sitrep timer and forced a premature wrap-up.)

**Once per day, hard rule.** If Korn returns after the wrap-up already fired (happens — a "see you tmr probably" followed by one more question), continue the session normally but do NOT give a second quote or re-run the wrap-up. Check [[artis-quotes-log]] for today's date if unsure.

**⚠️ Failure log, 2026-09-12: even a listed trigger phrase can be a false positive.** Korn said "see you bro" mid-conversation while still actively working (at a cafe, mid-homework, other threads visibly open) and Crow fired the full wrap-up — sitrep marked "day close," a quote logged. He came back within the same exchange: "the day hasnt ended bruh im still in the cafe." Fix applied same-day: cleared the marker, reverted the sitrep's day-close framing back to live, and marked the quote entry RESCINDED (doesn't count against once-per-day — a real quote is still owed later). **Lesson: "trust the read" (2026-07-03 guidance above) still holds for genuine ambiguity, but when he's mid-task with visible unfinished work and the sign-off is a quick aside rather than the clear end of an exchange, treat it as lower-confidence and be ready to reverse cleanly rather than fully committing — the day-close write should be easy to undo, which it was here.**
