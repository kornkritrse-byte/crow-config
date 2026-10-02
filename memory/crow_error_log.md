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

- **27 Sep 01:48 — Vera read "my dad signed me up… with me nudging him" as "you pushed for this race, the opposite of contentment-as-cover", and put it "on the record".** He corrected it: he only talked running, his dad got into it and invited him. Same shape as always: I turned a loose phrase into a character verdict. **Before Vera files something as evidence about him, ask one question.**
- **27 Sep 00:50 — told him "your house is fine, grandpa's flooded". Backwards: his home IS grandpa's house (fine); the brother's house next door flooded.** The SITREP garbled it in the 00:4x rebuild and I read it back to him as fact. **A rebuild is a moment where facts get corrupted: when compressing, keep whose-house-is-whose exact.**
- **27 Sep — the SITREP said the family talk was "still owed" for 10 days after it happened (17 Sep, in [[sessions-log]]).** Found only during the 27 Sep cleanup. A stale OPEN block survives if nothing forces a check → bin/lint-sitrep.py now runs at session start.
- **22 Sep — drifted the clock ~50 minutes** (said 20:35 when it was 19:45) and **stamped the wrong time into a published artifact.** 2nd occurrence; Korn: *"actually your like an hour off..."* ⇒ **every clock reference comes from a `date` call in that same turn** → [[feedback-critical-assessment]].
- **22 Sep — batched STQ05 Q1–Q5 into one message** after [[feedback-drill-format]] already said one at a time, reasoning that batching *was* the speed rep. He called it immediately. **No batching under any framing.**
- **21 Sep — told Korn twice that DSO is ACTIVITY. It is DUAL-LISTED in Obrom's LN3: (a-6) under Liquidity ("Measurement: Liquidity") AND (b-4) under Activity.** I inferred the family from the section headings instead of opening the ratio's own entry — the deck was on disk. **Read the entry, not the heading.** Korn found it by asking why DSO wasn't on his formula sheet.
- **20 Sep — told him "tomorrow's a 3-hour paper at 09:00" on a Sunday. Wrong: Mon 21 is a FREE day, AC313 is Tue 22 09:00.** He corrected it. The schedule was in [[project-midterms]] and I had read it the same session. **Same shape as the recurring one: check the record before asserting.** ⇒ The real bedtime constraint is **MONDAY night**, not tonight.
- **14 Sep — read the AC311 scope wrong and said so confidently.** Called Provisions "qualitative, not computational" and the deck-p.24 worry "largely moot"; Korn corrected that it carries the MOST marks. **The scope text listed no points for Provisions and I filled the silence with an inference.**
- **14 Sep — asserted ~70% that the 2021 share price ฿2.00 was a ×10 typo. It was correct** (split-adjusted, matching the post-split share count the professor's data uses). **[[project-midterms]] already recorded the reverse-split check from 12 Sep — I reasoned from the doc's stale "2.03" instead of reading my own file first.** Same failure shape as the 27 Aug BA202 "coverage gap" and the 1 Sep "unverified answers" claim: **check the record before calling a defect.**
- **13 Sep — misdiagnosed twice in one session**, both times calling a calculator typo a conceptual error (claimed he fed a PV in as C; claimed a number "migrated" between sub-questions). He corrected both. **Rule: when a wrong answer has two possible causes, ask what he punched in before asserting one.**
- **12 Sep — fabricated a "home = peak focus" study-location claim.** He does NOT study at home; his locked solo default is the cafe near home (Starbucks/Bloom). Check [[project-midterms]]' location rules before giving location advice.

- **27 Sep 2026 — exam order recorded swapped.** At 00:33 the record said AC311 Fri 2 Oct / BA202 Sun 4 Oct. The official notice says the reverse. Whether he misspoke or Crow misread, the order sat unverified on the calendar for 14 hours. **Postponed dates → ask for the official notice before writing them to the calendar.** Did right this time: when he contradicted it, Crow checked Gmail and held the calendar until he confirmed.
- 2026-09-29 17:3x: edited `~/crow-config/memory/sitrep.md` (the repo copy); the sync from the LIVE dir (`~/.claude/projects/-Users-kornkrit-crow-config/memory/`) overwrote it within minutes. **Always write memory to the live dir**; the repo `memory/` is a mirror.
- 2026-09-29 20:12: wrote a BA202 MCQ (Q22, s.42) from my memory of a 'trap' instead of reading the sheet row; the 'trap' option (case-competition prize) was ALSO exempt under s.42(11) per her L4 words. Two right answers. **Before sending an MCQ, check every distractor against the sheet row, not just the key.**

- **2026-10-01: wrong memory folder, and an inherited time.** (1) Edited `~/crow-config/memory/` (the repo COPY, overwritten by the sync) instead of the live `~/.claude/projects/-Users-kornkrit-crow-config/memory/`, so the sitrep, morning-person and ledger edits silently vanished. **Always write memory to the live path; the bin/ scripts already do.** (2) Told him not to print "tomorrow before the 09:00 paper", but BA202 is in the afternoon. The 09:00 came from the original slots: the 27 Sep correction fixed the DAY and the time was never re-checked. Same shape as always: a carried-over fact treated as checked.

- **2026-10-02 12:06: diagnosed his mistake without asking.** In the Mr C case he wrote life insurance 25k and I told him he had "carried it over from Ms B". His actual reason: he thought 25k was the cap (it is the HEALTH cap, life is 100k). Wrong diagnosis, delivered as fact. **When he gets a number wrong, ask where it came from before naming the habit.**
