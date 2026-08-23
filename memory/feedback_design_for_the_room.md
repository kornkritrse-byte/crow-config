---
name: feedback-design-for-the-room
description: "Build for the room it runs in, not the edge case. Rule complexity that's justified per-change compounds into something unexplainable."
metadata:
  node_type: memory
  type: feedback
---

When building anything Korn will run **live, in front of a crowd** — game rules, scoring systems, run-of-show, any procedure other people must follow — optimise for **how fast it can be explained**, not for how airtight it is.

**Why:** the รับน้อง เกม 3 scoring system (Jul 2026) was hardened over weeks — bet caps 1–4, an all-in band on the last matches, own-match betting made structurally impossible, illegal bets auto-voided and flagged, ปรับมือ, tie-safe Top 3. Every single change was individually justified, most of them requested by Korn, all of them built by me. On the day the games ran chaotic. Korn's own diagnosis (23 Aug): **the game was over-complicated — his สันทนาการ team understood it perfectly but couldn't convey it, and explanations got long and boring.**

We defended against **exploitation by people reasoning hard about the rules**. The actual failure was **people not understanding the rules at all.** Wrong opponent.

**How to apply:**
- Before adding a rule that closes an edge case, ask: **does this add a sentence to the explanation?** If yes, weigh that cost explicitly — out loud, to Korn — instead of just building it.
- Ask "how would the MC explain this in 30 seconds to a loud hall?" and treat a bad answer as a design failure, not a briefing problem.
- Prefer a system that is *slightly exploitable but instantly understood* over one that is *airtight and needs a rulebook*. At a camp, confusion costs more than cheating does.
- Complexity compounds silently across sessions. Periodically re-read the whole ruleset as a stranger would, not as a diff.
