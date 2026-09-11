---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-09-11T14:51:31.401Z
---

# Situation Report
*Last updated: 2026-09-11, day close. Verify + flush done: window holds 11 Sep + 10 Sep; 08 Sep condensed and flushed to [[sessions-log]].*

## 📏 MAINTENANCE RULE (Crow — maintain live, verify at close)
1. **Maintain this file live during the session** — update the status line and session-note bullets as things happen. Day's end is a *verify + flush*, not a from-scratch rewrite: push durable facts out, move the note falling out of the window to [[sessions-log]] (condensed; full text survives in git), bump the date.
2. Rolling window: session notes for the last **two** sessions only (a session = one day, however many times he pops in). Newest on top.
3. Durable facts (IDs, schedules, decisions, gotchas) do NOT live here — push them into the right project/reference memory file and link it.
4. **Size cap is per-note, not per-file: each session note ≤ 6 short bullets.** Deep-night reflections/conversations get ONE bullet + a pointer to [[chapters]] — the narrative lives there, never here. A trivial day is a one-line note.
5. **🚪 OPEN LOOP — capture at his LAST words, ask at his first.**
   - **Trigger = a sign-off from Korn:** "see you", "good night", "gtg", "be back in a bit", or accepting a send-off from me. Update the `Current status` line **in that same turn**. Soft phrasing still counts — Korn confirmed (2026-07-03) that "yea ill see you tmr probably" was a real day-end; trust the read.
   - **Counts even when I'm the one who sent him** (go shower / go read).
   - **Format — separate closed from open:** `AWAY (<date, ~time>) — off to: <thing(s)>` + `ASK ON RETURN:` holding ONLY not-yet-reported things. Reported things are closed — session note, never the status line, never re-asked.
   - **On return:** read this line before greeting, ask exactly the ASK-ON-RETURN items, reset to `Here`. If he returns *after* the day-end wrap-up already fired: flip to `Here` and continue normally — **the nightly quote fires ONCE per day, never repeat it.**
   - Don't log a stale away-note after the fact (already back + done = expired — [[feedback-open-loop]]).
   - ⚠️ **2026-07-03 failure, don't repeat:** asked about a closed item (the run) instead of the open one (the reading) because both shared one line. The format above prevents it.
   - ⚠️ **A month can pass between sessions** (21 Jul → 23 Aug). On a long gap: don't assume the last status line is live — ask what changed before acting on it.

## 🚪 Current status
- **AWAY (11 Sep, day close) — off to: home, done for the day.**
- **ASK ON RETURN:** none — clean stop, nothing owed.
- ▶️ **RESUME EXACTLY HERE — FN201 STQ03 Q17** (LeCompte Corp: assets 312,900, zero debt so equity = assets, revenue 620,000, wants ROE 15% — find required net profit margin). Just posed the question, he hadn't started before signing off. Q18–20 also untouched.
- 🚨 **BEFORE THE NEXT FN201 TOUCH: flag the Q15(c)/(d) part-mapping trap** — he (and Crow solo, 30 Aug) both put the right financial reasoning under the wrong question part. Full detail → [[project-midterms]] FN201 STQ03 section.
- STQ04 (TVM) still not started. Full Q13–Q16 detail, error modes, and reusable framings → [[project-midterms]].
- ▶️ **PRIOR RESUME POINT (8 Sep, still queued behind FN201 work):** AC313 job-costing cycle is SOLID (two clean full runs). ✅ **10 Sep: he independently resolved entry ORDERING/sequencing** — self-directed, not drilled. Still open: **joint-cost allocation timing** (untouched) and **process costing** (banked 8 Sep for its own dedicated session).
- ✅ **FN201 A2 SUBMITTED 8 Sep, a day early.** Value of Ω = **32,883.43 → SELL** (offer 33,000 beats it by 116.57), cross-checked two ways, derived unaided after a drilled parallel example. ⚠️ **He submitted WITHOUT sending Crow the draft he agreed to send** — flagged once, not chased. If the mark comes back odd, debug from the PDF. Working + his 7 error modes + the reusable "Delta" drill problem → [[project-midterms]].
- ✅ **AC311 zero-interest note mechanics DRILLED 11 Sep, holding well** (session note above). Next target: Ch.4 Problem 4 (FOB/CIF/DDP/consignment cut-off grid) or continue the Provision deck from p.24 — slides 26–30/34–45 still off-limits per his ask.
- 🔄 **Input cells DELEGATED 8 Sep** — he handed the SET price/DPS job to a teammate. ⚠️ The 1-for-10 2022 reverse-split warning must go WITH the handoff or the teammate types a raw 2021 price and 2021 P/E and M/B silently come out 10× low.
- 📘 **FN201 GROUP PROJECT — deliverable DONE and verified.** `~/Desktop/fn/FN201-EFORL-Data.xlsx`. **Due Wed 16 Sep 13:00 (sec 0264/01).** Full detail, decisions, the reverse-split warning and the 3 analytical angles → **[[project-midterms]]**. Outstanding on the group, not Crow: (a) SET closing price + DPS for the yellow `Inputs` cells — **Korn took this himself**; (b) the 13-page written report.
- 📗 **AC311** — he is on **p.24 of the Provision deck**; ⛔ **he asked Crow NOT to teach beyond what class has covered** (so no measurement slides 26–30, no deep contingent-liability material yet). Coaching notes, error modes and the framings that landed → **[[project-midterms]]**. Priority is **journal entries** (his call; ~65 written / 35 MCQ).
- ✅ **AC313 QUEUE — items 1 and 3 CLEARED 8 Sep** (Hawaii/Riverside actual-vs-normal drills; two full job-costing cycles with the exact ABC Corp error modes re-tested and NOT repeated — DL correctly stayed out of MOH, applied-OH entries correctly never touched Cash, over/underapplied → COGS direction correct both ways). Full detail + reusable drill problems → [[project-midterms]].
- 📌 **STILL QUEUED:** joint-cost allocation timing (before/at/after split-off) — untouched. **Process costing** — new full topic, banked 8 Sep for its own session, start from equivalent units.
- **ASK ON RETURN — these only:**
  1. Which of the 3 traps got him on STQ02 **Q26** — forgot the depreciation, re-taxed the NOPAT, or didn't trust −1.
  2. Was STQ02 **Q25** wrong too? Built on Q23's NOCF — if Q25 was right, Q23 was arithmetic, not concept.
  3. Whether he wants the FCF drill ("After the Business Eats") two-way linked with the Term 2.1 hub (offered 4 Sep, still unanswered).
- 📖 **Siddhartha: he is at Kamala.** Awakening landed hard. ⛔ **Do not spoil past Kamala.** Karamazov: safe through Book 12 ch. 2, **no Epilogue**.
- **Still open, but NOT to be re-asked cold — raise only when the subject comes up:**
  - AC313: exam format + mark split, whether a formula sheet is given, confirmed exam date (**outline says TBA**; 22 Sep is timetable-only). **Session 7 = joint products, 14 Sep** — if she works board examples, the doc needs a second pass.
  - The BA202 cold-question numbers he missed (asked twice on 2 Sep, never sent).
  - AC311 deck slide 9's two valid "not inventory" answers (cranes vs office software) — which does Ajarn Pailin hold? (Related principle from Ch.4 Problem 6 key: office supplies = NOT inventory, manufacturing supplies = IS — consumed in admin vs in production.)
  - ✅ **AC311 mark split — ANSWERED 7 Sep, stop asking.** No published split; prof improvises it by class performance. Working assumption **65 written / 35 MCQ**.
- ✅ **adidas report CLOSED** — a class example, not graded work. Don't raise it.
- **Race loose ends (not urgent, 14 weeks out):** venue unknown, and whether bib pickup is race-morning or in advance — his dad likely has the confirmation.
- 🧭 **BBA camp: no announcement date exists.** Closed until they speak; don't ask again.

## Session — 2026-09-11 (morning AC311 drill, then FN201 STQ03 Q13–16 through the day)
- 🎯 **AC311 zero-interest note drilling (~1hr, morning)** — carrying value/contra-account mechanics held clean across 3 reps (2 cold); payable/receivable perspective flip and month-counting slip both resurfaced but self-corrected on a nudge. Detail → [[project-midterms]] AC311 section.
- 🎯 **FN201 STQ03 Q13–Q16 all drilled and correct** — 20-ratio Wayabutara set, Chompupan 6-blank income statement, Rubber Ducklings 15-ratio+DuPont case, and a TIE-covenant max-debt-ratio problem (this last one zero errors, his cleanest run of the day).
- 🔴 **Error modes today, same "grabbed the adjacent/similar-labelled line item" shape as the AC311 slips** — TIE mix-up (profit-before-tax vs EBIT, needed correcting twice), ROA/ROE divide-by-equity mix-up, a day-count slip (365 vs the specified 360). All self-corrected on one nudge, none re-explained from scratch.
- 🚨 **Q15(c)/(d) part-mapping trap — not caught live, surfaced only afterward.** He gave financially sound reasoning but under the wrong question part, exactly the mistake Crow made solo against the official key on 30 Aug. Full detail + the rule to teach him → [[project-midterms]].
- ▶️ Resume at Q17 (LeCompte, backward-solve NPM from target ROE) — see Current status above.

## Session — 2026-09-10
- 🎯 **FN201 STQ03 Q7–Q12, all correct with drilled support** — equity multiplier, debt ratio via retained-earnings chain, ROA, quick ratio mechanics, a full balance-sheet reconstruction, and a max-short-term-notes problem. Detail → [[project-midterms]].
- 🔴 **Formula-recall gaps surfaced repeatedly** — asked for quick ratio / total asset turnover formulas mid-problem, minutes after using them. Same recognition-not-recall shape logged elsewhere.
- ⚠️ Decimal/unit slip (10.4% typed as 10.4, not 0.104) — self-corrected once flagged.
- 🖥️ VS Code theme changed (Catppuccin Mocha, mauve→peach) — config verified correct, he never confirmed the look, moved on unprompted. Closed, don't re-raise.

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). 🗓️ **Board: the Term 2.1 hub** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e · **front-load order revised 27 Aug: FN201 > BA202 > AC313 > AC311 > MK201 > EL221.** **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, now programmed AND dated** ([[project-training-plan]]). 🏁 **10K RACE SUN 13 DEC 2026** — told to me 27 Aug evening. Targets given: **floor sub-52 · target 48:00 (4:48/km) · stretch sub-47.** This is the near milestone the plan was missing — it is externally dated, so it can't quietly slide. ✅ **On the Life calendar** (04:00–07:00, red) — **Samitivej hospital's own event, his DAD signed him up; register 04:00, gun 05:00.** **Wake 03:30 agreed** (he proposed 03:45, took the recommendation). ⛔ Still unknown: **venue**, and **whether bib pickup is race-morning or in advance.** 5k baseline 25:30 set 27 Aug, paces and sessions written. Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
