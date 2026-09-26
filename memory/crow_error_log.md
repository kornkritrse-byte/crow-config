---
name: crow-error-log
aliases: ["crow-error-log"]
description: Crow's own mistakes with Korn, newest on top. Same failure shape keeps recurring: asserting before checking the record. Read before claiming a defect, a date, or a time.
metadata:
  type: feedback
---

# ⚠️ Crow's Error Log

**The shape that keeps repeating:** asserting from inference when the answer was already on disk. **Rule: open the record (the file, the deck entry, `date`) before asserting. When a wrong answer has two possible causes, ask him what he did before picking one.**

**Why:** every entry below got corrected by Korn, not caught by me. Each one cost trust and time during exam season.
**How to apply:** before any claim about a date, time, a schedule, a defect in his work, or what a document says, check the source that turn. The clock is now stamped on every prompt by hooks/prompt-time.sh, so use it.

- **27 Sep — the SITREP said the family talk was "still owed" for 10 days after it happened (17 Sep, in [[sessions-log]]).** Found only during the 27 Sep cleanup. A stale OPEN block survives if nothing forces a check → bin/lint-sitrep.py now runs at session start.
- **22 Sep — drifted the clock ~50 minutes** (said 20:35 when it was 19:45) and **stamped the wrong time into a published artifact.** 2nd occurrence; Korn: *"actually your like an hour off..."* ⇒ **every clock reference comes from a `date` call in that same turn** → [[feedback-critical-assessment]].
- **22 Sep — batched STQ05 Q1–Q5 into one message** after [[feedback-drill-format]] already said one at a time, reasoning that batching *was* the speed rep. He called it immediately. **No batching under any framing.**
- **21 Sep — told Korn twice that DSO is ACTIVITY. It is DUAL-LISTED in Obrom's LN3: (a-6) under Liquidity ("Measurement: Liquidity") AND (b-4) under Activity.** I inferred the family from the section headings instead of opening the ratio's own entry — the deck was on disk. **Read the entry, not the heading.** Korn found it by asking why DSO wasn't on his formula sheet.
- **20 Sep — told him "tomorrow's a 3-hour paper at 09:00" on a Sunday. Wrong: Mon 21 is a FREE day, AC313 is Tue 22 09:00.** He corrected it. The schedule was in [[project-midterms]] and I had read it the same session. **Same shape as the recurring one: check the record before asserting.** ⇒ The real bedtime constraint is **MONDAY night**, not tonight.
- **14 Sep — read the AC311 scope wrong and said so confidently.** Called Provisions "qualitative, not computational" and the deck-p.24 worry "largely moot"; Korn corrected that it carries the MOST marks. **The scope text listed no points for Provisions and I filled the silence with an inference.**
- **14 Sep — asserted ~70% that the 2021 share price ฿2.00 was a ×10 typo. It was correct** (split-adjusted, matching the post-split share count the professor's data uses). **[[project-midterms]] already recorded the reverse-split check from 12 Sep — I reasoned from the doc's stale "2.03" instead of reading my own file first.** Same failure shape as the 27 Aug BA202 "coverage gap" and the 1 Sep "unverified answers" claim: **check the record before calling a defect.**
- **13 Sep — misdiagnosed twice in one session**, both times calling a calculator typo a conceptual error (claimed he fed a PV in as C; claimed a number "migrated" between sub-questions). He corrected both. **Rule: when a wrong answer has two possible causes, ask what he punched in before asserting one.**
- **12 Sep — fabricated a "home = peak focus" study-location claim.** He does NOT study at home; his locked solo default is the cafe near home (Starbucks/Bloom). Check [[project-midterms]]' location rules before giving location advice.
