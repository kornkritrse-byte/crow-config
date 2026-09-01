---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-08-23T14:23:42.322Z
---

# Situation Report
*Last updated: 2026-09-01 (live, session in progress. Window holds 1 Sep + 31 Aug; 30 Aug due to flush to [[sessions-log]] at day-end.)*

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
- **AWAY (1 Sep, 16:29) — off to: a 20-min nap, then a BASKETBALL GAME at 18:30.** Not a day-end — he closed the *study* session, not the day. **No nightly quote has fired today.**
- **ASK ON RETURN:** how the game went, and nothing else — everything else from today is closed below.
- **ASK ON RETURN — asked 1 Sep, answered only in part:**
  1. ✅ **STQ01 — done** (he confirmed 1 Sep: "did stq 1").
  2. ✅ **AC311 caught up** 31 Aug — but the two specific questions (MCQ/entry **mark split**; deck slide 9's two valid "not inventory" answers, cranes vs office software — which does Ajarn Pailin hold?) **still not answered. Re-ask.**
  3. ✅ **CLOSED 1 Sep — and the answer is that he never did them.** He asked *"where are those"*. He had never found the drills; I'd been demanding codes for a set he couldn't locate. **My failure, not his: I named codes across three sessions and never once gave the anchor.** Locations now sent — `A1–A8` end of **§shield**, `A9` in **§capm** (note: it's A1–A9, nine not eight — my earlier count was wrong), `R1–R10` in **§drill3**, `M1–M9` in **§drill5**. → durable copy in [[reference-artifacts]].
  ⚠️ **Lesson: he goes to source material (Obrom's STQ PDFs) because it's findable. The doc's drills are buried behind anchors he's never been given. Navigation is the blocker, not willingness.**
  4. ⚠️ **He skipped the gym on 31 Aug** — Monday is a programmed gym day ([[project-training-plan]]). First logged miss since the plan was dated. Not a lecture; note it, watch for a second.
- ✅ **CLOSED 31 Aug — he does answer them.** The 30 Aug open question ("does he actually work the drills or just read them") is answered: he worked STQ01 cold and brought his misses. **Partially** — it was Obrom's own STQ PDF, not the docs' drills. The drill codes are still untested.
- ✅ **adidas report CLOSED** — a class example, not graded work. Don't raise it.
- **Race loose ends (not urgent, 15 weeks out):** venue unknown, and whether bib pickup is race-morning or in advance — his dad likely has the confirmation.

## Session — 2026-09-01
- 🏀 **Closed the study block ~15:00 for a nap + a 18:30 basketball game.** His own verdict: *"not the best progress but fair enough — got all the questions in the test ok now but maybe not the best grip on the new content."* **He asked to work the new L4 content out together in the next BA session.** That is the single live thread going into tomorrow.
- 📕 **BA202 L4 REBUILT FROM THE CLASS RECORDING** — he dropped the 26 Aug onsite mp4 (2 h 40 m) in and asked for the new content added. Transcribed on the Mac (whisper large-v3-turbo, ~30 min), read in full, **nine sections added to [[reference-artifacts]]'s "The Missed Lectures"**. The doc's own "what this doesn't cover" bullet — *her worked examples* — is now closed.
- 🔴 **Biggest catch: the 2024 remittance change is CONFIRMED** (the doc had it as a 70% guess off a blank slide title). Foreign income is now taxable in the **year you bring it in**, whatever year it was earned — by Director-General announcement, not by amending the statute. **Old past papers answer this wrong.** Full findings list in [[reference-artifacts]].
- 🧭 **His method, stated 1 Sep:** theory from my artifacts, practice from **Obrom's original STQ PDFs** (friends who took the class advised it, and I agree — his questions, his phrasing, his keys). **The hole: Topic 5 has NO STQ file**, so `M1–M9` in §drill5 are his only T5 practice. STQ02 Q21–30 are also unmarkable (Part 2/2 never posted).
- ✅ **Drill-code loop CLOSED, and the answer was on me** — he asked *"where are those"*. He'd never been given the anchors; A1–A8 have no heading and no TOC entry. Locations sent, durable copy in [[reference-artifacts]].
- ⛔ **I reported a defect in a document I hadn't read.** Told him ~50 §pretest answers were "tagged unverified" — no such tag exists; the doc says plainly it was checked against Obrom's workbooks. **Then verified all 50 anyway: they match.** The one error found is in **Obrom's own key** (STQ03 Q15, 20X2 ROE: his sheet says 20.59%, truth is 145/694 = **20.89%**, doc is right).
- ⚠️ **Stale `~/.crow-session-ending` marker fired a false day-end wrap** on his first "whats up". The 2 h staleness guard in `hooks/stop.sh` doesn't catch a corpse from a session that died minutes earlier. **Offered a SessionStart `rm -f` as the fix; he hasn't answered.** Also: he **skipped Monday's gym** (first logged miss since the race was dated) and **plain-English explanations are now a hard rule, third ask.**

## Session — 2026-08-31
- 📖 **He worked FN201 STQ01 (Topic 1) himself and brought three questions cold — Q13, Q14, Q17.** All answered and **verified against Obrom's green-coded key** in the PDF (`pymupdf` span-colour method — [[project-midterms]]). Q13 = (I) and (II) only · Q14 = Notes payable · Q17 = (II) and (III) only.
- 🔴 **This is the first confirmed self-testing** and it answers the question that was open on him since 28 Aug. But note what he tested on: **Obrom's STQ PDFs, not the drills in the docs I built.** He goes to the source material, not the instrument. Worth watching, not correcting — the source has an official key and the drills don't.
- 🧠 **Where he's soft: Topic 1 classification, not calculation.** Zero of the three were computational. On Q13 he had the causality **inverted** — thought trade AP was *caused by* working capital rather than *being a component of* it. Q14/Q17 he wanted the method, not the answer. **The uses-vs-sources T-account split and the corporation advantages/disadvantages table are the two frames that did the work.**
- 📏 **"can you dum it down" fired again — second time in three days** (30 Aug was §compensated). The plain-English-and-analogy-before-formula rule is now confirmed twice, not a one-off → [[reference-artifacts]].
- ⛔ **My miss: I never asked the ASK-ON-RETURN item.** He opened mid-question and I went straight to content — the 30 Aug drill codes (A1–A8 / R1–R10 / M1–M9) were never asked for, and neither were the two AC311 questions from a class he had *that day*. Both carried forward. **Content urgency swallowed the open loop; that's exactly what the loop exists to prevent.**

## Session — 2026-08-30
- 📕 **FN201 doc rebuilt from TVM-only to ALL FIVE topics — "Obrom's Playbook"** → https://claude.ai/code/artifact/7005f3de-c10b-4542-b3b4-40f619b4f51c (56KB → 167KB). He asked for it himself: "integrate all the shit from the notes then add to the fn artifact." **The 3-question pre-flight owed since 27 Aug is now delivered.** Detail → [[reference-artifacts]]
- 🔴 **Finding of the day: ~70% of the FN201 midterm is MCQ (25% selected + 10% constructed), and the formula sheet AND interest tables are handed out in the room.** Memorising formulas is worth nothing; breadth across topics 1,2,3,5 beats more TVM reps. → [[project-midterms]]
- ⚠️ **Two of my own claims corrected:** (1) topic numbering — the syllabus and the lecture notes disagree on topics 3/4/5; use the LN numbering. (2) **"he missed the ratios class on 19 Aug" was wrong — Analysis of Financial Reports has ZERO scheduled lecture hours, it is "full self-study" by design.** He missed nothing; nobody was ever going to teach it.
- ✅ **Group assignment (15%) CLOSED — he already has a group**, same friends since last year. Stop raising it. Also: all five lecture notes have been on his Desktop since 26 Aug — the materials blocker never existed.
- 🧭 **Read of him — Saturday went to a Japanese convention with his dad, so the AC311 §17 drill did NOT run.** He read and annotated instead and said he's "fairly sure" of the sorting, "a little more work" on entries. **That's the second build-then-don't-test in three days.** Told him plainly; every new section in the FN doc therefore ends in cold questions. **Today's plan is his own: study till 15:00, Samyan, read till 18:00, run at Suan Lumphini, read after.**
- ⛔ **Still untested: whether he actually answers the drills or just reads them.** That is the open question on him right now, not coverage.

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). 🗓️ **Board: the Term 2.1 hub** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e · **front-load order revised 27 Aug: FN201 > BA202 > AC313 > AC311 > MK201 > EL221.** **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, now programmed AND dated** ([[project-training-plan]]). 🏁 **10K RACE SUN 13 DEC 2026** — told to me 27 Aug evening. Targets given: **floor sub-52 · target 48:00 (4:48/km) · stretch sub-47.** This is the near milestone the plan was missing — it is externally dated, so it can't quietly slide. ✅ **On the Life calendar** (04:00–07:00, red) — **Samitivej hospital's own event, his DAD signed him up; register 04:00, gun 05:00.** **Wake 03:30 agreed** (he proposed 03:45, took the recommendation). ⛔ Still unknown: **venue**, and **whether bib pickup is race-morning or in advance.** 5k baseline 25:30 set 27 Aug, paces and sessions written. Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
