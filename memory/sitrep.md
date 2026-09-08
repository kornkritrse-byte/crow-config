---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-09-07T15:08:59.590Z
---

# Situation Report
*Last updated: 2026-09-07, day close (signed off for the day. Verify + flush done: window holds 7 Sep + 6 Sep; 5 Sep and 4 Sep flushed to [[sessions-log]]; FN201 group project + AC311 coaching notes pushed to [[project-midterms]].)*

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
- **Here (8 Sep, back from MK201 class).** Opened with "lets do fn" — straight into FN201 A2. Samyan long study session was the plan.
- ▶️ **RESUME EXACTLY HERE:** FN201 **A2 is SOLVED — he derived all 32,883.43 himself** (8 Sep). He is **writing up the PDF now** and agreed to **send the draft to Crow before submitting**. Due Wed 9 Sep 13:00, sec 0264/01, MS Teams, filename `FN201-A2-<StudentID>`. Full working, his 7 error modes, and the reusable "Delta" drill problem → [[project-midterms]].
- ✅ **AC311 zero-interest note — ANSWERED CORRECTLY 8 Sep, both entries + the 3/12 month count.** He needed one nudge on which number sits on Notes Payable (face, not proceeds), then got Oct 1 and Dec 31 clean and showed the fraction unprompted. **The month-count error mode from 7 Sep did NOT repeat.** Now drilling forward from here: carrying value / contra-account presentation.
- ✅ **FN201 A2 — DRILLED AND DONE 8 Sep.** Answer **32,883.43 → SELL** (offer beats value by 116.57); cross-checked two ways. He asked *what a discounted number actually is* mid-drill — PV as "the same money re-quoted on a different date" was genuinely missing and is upstream of every timing error he makes. ⚠️ **Only the write-up remains.**
- 🔄 **Input cells DELEGATED 8 Sep** — he handed the SET price/DPS job to a teammate. ⚠️ The 1-for-10 2022 reverse-split warning must go WITH the handoff or the teammate types a raw 2021 price and 2021 P/E and M/B silently come out 10× low.
- 📘 **FN201 GROUP PROJECT — deliverable DONE and verified.** `~/Desktop/fn/FN201-EFORL-Data.xlsx`. **Due Wed 16 Sep 13:00 (sec 0264/01).** Full detail, decisions, the reverse-split warning and the 3 analytical angles → **[[project-midterms]]**. Outstanding on the group, not Crow: (a) SET closing price + DPS for the yellow `Inputs` cells — **Korn took this himself**; (b) the 13-page written report.
- 📗 **AC311** — he is on **p.24 of the Provision deck**; ⛔ **he asked Crow NOT to teach beyond what class has covered** (so no measurement slides 26–30, no deep contingent-liability material yet). Coaching notes, error modes and the framings that landed → **[[project-midterms]]**. Priority is **journal entries** (his call; ~65 written / 35 MCQ).
- 📌 **QUEUED FOR NEXT AC313 SESSION (his ask, do this first, before anything else):**
  1. Re-explain **actual vs normal (predetermined-rate) costing** — which rate is calculated before vs after the period, and why normal/POHR is the default unless a question names "actual costing".
  2. Re-test him cold: POHR timing, spoilage vs rework definitions, joint-cost allocation timing (before/at/after split-off).
  3. **From the ABC Corp 9-entry journal quiz (5 Sep, his explicit ask to carry forward):** (a) routed DIRECT labor through MOH; (b) put Cash on the credit side of an applied-OH entry — applied OH only ever moves WIP↔MOH, external accounts appear on *actual*-cost entries only; (c) fumbled over/underapplied → COGS direction (over = MOH credit = COGS down; under = MOH debit = COGS up). **Re-quiz cold, don't just re-explain.**
- 📌 **STILL OPEN:** STQ03 (FN201 Topic 3) guided walkthrough — **Q1–3 done correctly, stopped mid-Q4** (which-statement-is-most-correct, P/E–ROE–M/B). Pick up at Q4.
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

## Session — 2026-09-08
- 🧮 **FN201 A2 solved by him, not for him.** Value of Ω = **32,883.43 → SELL** (offer 33,000 beats it by 116.57), cross-checked two ways. Only the write-up is left; he's on it and will send the draft before submitting. Working + his 7 error modes → [[project-midterms]].
- 🗣️ **He corrected the teaching format again, harder:** *"dont just give me fish teach me how to do it."* Crow answered "run me through it" with a fully worked parallel example; he wanted to be *questioned* through it. Built a second parallel problem ("Delta") and drilled it question-by-question — he then did the real assignment essentially unaided. [[feedback-drill-format]] updated: **"run me through it" = drill me, never solve it in front of me.**
- 🔴 **Real gap surfaced, deeper than TVM:** he asked mid-drill what a discounted number *is* ("the amount of interest earned?"). He did not hold PV as *the same money re-quoted on a different date*. That is upstream of every timing/exponent error he makes — check it's still there before 23 Sep.
- ✅ **AC311 zero-interest note answered correctly** (both entries + the 3/12 count). The 7 Sep month-count error mode did not repeat.

## Session — 2026-09-07
- 📘 **FN201 group project: the whole Excel deliverable built, verified and handed over** (guideline steps 3–7) — EFORL, 2021–2025, 10 sheets, all live formulas. All 25 IS/BS lines diffed against the source filings: exact match, 5/5 years. Detail + the 3 analytical angles → [[project-midterms]]. **Due Wed 16 Sep 13:00, sec 0264/01.** Remaining on the group: the SET price/DPS inputs (his job) and the 13-page report.
- 🧾 **Rebuilt it twice on his direction** — first into the side-by-side common-size layout of the past group's graded TKN exemplar, then again to fold in the FY2020 report he added mid-session (Company Profile sheet for report page 2, average-based ratios, and 2021 growth).
- ⚠️ **Caught a real trap:** 2020 was a loss year, so a naive % growth prints −224% for 2021 EBIT — reading as collapse when EFORL actually swung loss→profit. Growth sheet now reports net change in Baht + a guarded % that prints "n/m" on a non-positive base.
- 📗 **AC311 the rest of the evening** — Ch.5 purchase commitments + Ch.6 provisions, the material from that day's class. Round 1 went 1 clean / 1 half / 2 wrong; by round 3 he had Gate 1 across three disguises and the probable–possible–remote ladder built from his own answers. Error modes + the framings that landed → [[project-midterms]].
- 🗣️ **He asked for a format change mid-session and it was the right call** — one open question at a time, correct as he goes, no big structured explainers. Saved as [[feedback-drill-format]]; it is now the default for teaching him anything.
- 🔴 **Recognition-not-recall showed up a third time, live:** he typed the correct recognition principle unprompted in the morning and failed the textbook case of it 90 minutes later. Named to him plainly as an encoding problem, not an AC311 problem.

## Session — 2026-09-06
- 🏃 **Woke up and got the Sunday morning run in** — cleared the anxiety from the 5 Sep night sign-off. Saturday's long run was confirmed skipped (his own call, "kinda just felt like it"); Sunday's run was a straight 10k @ 5:58/km, not the prescribed quality rotation (A–D, 5:10–5:20 or faster) — **third day running the same self-directed-over-prescribed pattern** as 4/5 Sep. Named once, not re-flagged further this week.
- 📗 **Moved to FN201 STQ03** (Topic 3, ratios) for his ~1hr study window, his own call — legitimate, not drift: this topic has zero scheduled lecture hours and hadn't actually been cold-tested by him yet (STQ03's "18/20" in memory was Crow's own worked answers, not his). Switched format mid-stream to guided walkthrough (his answer + reasoning first, Crow corrects) rather than blind cold-test, since he has zero prior exposure to the material — reasonable given the full-self-study status.
- 📘 **Built + published a plain-English glossary** into "Obrom's Playbook" (`#glossary3`) — EPS/BVPS/P-E/M-B/ROE/ROA/current/quick/TIE/debt ratio/D-E/EM/BEP/margins/TAT one-liners + the two linking identities, first thing in Topic 3, nav entry added.
- **Q1–3 done correctly**, stopped mid-Q4. Resuming this evening back in Bangkok — his own stated goal for tonight: study FN201 to be group-assignment-ready.

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). 🗓️ **Board: the Term 2.1 hub** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e · **front-load order revised 27 Aug: FN201 > BA202 > AC313 > AC311 > MK201 > EL221.** **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, now programmed AND dated** ([[project-training-plan]]). 🏁 **10K RACE SUN 13 DEC 2026** — told to me 27 Aug evening. Targets given: **floor sub-52 · target 48:00 (4:48/km) · stretch sub-47.** This is the near milestone the plan was missing — it is externally dated, so it can't quietly slide. ✅ **On the Life calendar** (04:00–07:00, red) — **Samitivej hospital's own event, his DAD signed him up; register 04:00, gun 05:00.** **Wake 03:30 agreed** (he proposed 03:45, took the recommendation). ⛔ Still unknown: **venue**, and **whether bib pickup is race-morning or in advance.** 5k baseline 25:30 set 27 Aug, paces and sessions written. Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
