---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-09-13T13:34:50.755Z
---

# Situation Report
*Last updated: 2026-09-25 ~23:0x — DAY CLOSED on his goodnight. AC311 exam tomorrow 09:00 (exam 5 of 6), BA202 Sun 27 (the last). Window holds 25 + 24 Sep; 23, 22, 21 Sep flushed to [[sessions-log]]. Next to flush: 24 Sep.*

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
- 🟢 **HERE (Sat 26 Sep ~10:00), at home — his neighbourhood is flooded. 🌧️ AC311 POSTPONED, no new date yet.** BA202 Sun 27 = "probably postponed" (his read: rain forecast for another day) but NOT confirmed → Crow's line: **prep as if it runs 09:00 tomorrow.** Printing status unknown (stuck at home). His house is raised, safe — Crow over-warned, he said chill. Grandpa's brother's house flooded badly; that family evacuated to a hotel by truck (they're fine).
  - ⏳ **STILL OPEN:** BA202 official status · new AC311 date · sheet printed?

### 🧾 BA202 — the two artifacts he is working from
- 📘 **The Missed Lectures** (L1–L8, the reference) — https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483
- 📄 **Four Sheets** (the print-ready backup cheat sheet, 8 sides / 4 A4) — https://claude.ai/code/artifact/c260aedb-c344-4e44-bb1e-a2473bcc1d25 · PDF also at `~/Desktop/BA202/BA202-cheatsheet-4sheets-8pages.pdf`
- 🎒 **The official exam info he pasted 23 Sep** (durable, → [[project-midterms]]): 45 marks · L1–L7 · **MCQ, and questions carry DIFFERENT point values stated on the sheet** · 3 hrs · **TBS carbon answer sheet** · **2B pencil, eraser, sharpener** · notes **handwritten OR printed/typed, duplex, slides pasted in**, **≤8 pages on 4 A4**, **flat sheets only, no sticky notes**, **collected by proctors** · **ONLY "an updated subordinate legislation on exemption" is supplied** (= MR126).
- 🔴 **CORRECTION ON RECORD:** in class she promised to supply the withholding-tax rate table; the written rules do NOT repeat that. **Told him to assume it is not supplied and to carry it on his sheet.**

### 🔥 Live / time-critical
- ✅ **FN201 GROUP REPORT — SUBMITTED (confirmed by Korn 15 Sep).** Closed. Excel + 13-page written report delivered. ⛔ Do not raise the number contradictions, the bibliography, or page 1 IDs again — the deliverable is gone.
- ✅ **AC313 email SCRAPPED 16 Sep — no longer needed.** Korn confirmed: **exam Tue 22 Sep 09:00, and NO formula sheet.** ⇒ **Every AC313 format is memorized cold** — the five-step process-costing layout, job-cost flows, joint-cost methods. Weight the drills accordingly → [[project-midterms]].
- 📌 **[14 SEP: MISSED — class was ONLINE, he didn't get to ask. Needs another channel: chat during class, or email.]** ~~MON 14 SEP — ask Ajarn Monvika the three AC313 questions. LAST class before the exam~~ (no classes in exam week): (1) format + MCQ/written split, (2) is a formula sheet provided, (3) confirm the exam date (her outline says TBA; 22 Sep is timetable-only). Session 7 that day = **joint products**, the one AC313 topic still untouched.
- ✅ **Morning-person attempt #1 LANDED 14 Sep** (bike warm-up + gym before class) → [[project-morning-person]]. Watch whether #2 happens; one is not a habit.
- ▶️ **NEXT FN201 SESSION OPENS WITH Q2** (amortised loan). Deliberately left for a fresh head.
- 📉 **ALLOCATION RISK, named to him 13 Sep:** a full day went to FN201 TVM mechanics. **Loans, two-stream equations and securities are still at zero — that's 7 of the 8 past-midterm questions in STQ04.** Meanwhile **BA202 (45%, heaviest paper of six) got nothing**, and AC311 Ch13 provisions is still mid-deck at p.24.

### 🔴 BA202 — MATERIAL GAP FOUND 16 SEP (the real blocker, not motivation)
- **Midterm covers LECTURES 1–7 = 45%** (confirmed in the course outline PDF, 16 Sep).
- **`~/Desktop/BA202 lecture transcripts/` holds L1–L4 ONLY.** The doc [[reference-artifacts]] *The Missed Lectures* also stops at L4.
- ⇒ **THREE examinable lectures have NO material on disk: L5 Corporate Income Tax Pt I (2 Sep) · L6 CIT Pt II + Petroleum Income Tax (9 Sep) · L7 Special Income Tax Regimes — SME incentives, investment incentives, Double Tax Treaties (16 Sep).** That is the entire CORPORATE half of the paper, where the computation lives.
- 🚨 **His 16 Sep plan — "cram the rest of the sheet with a full day on the 18th" — is downstream of material he does not have.** The cheat sheet cannot be built from nothing. **The 18th is wasted unless the L5–L7 handouts/recordings are obtained FIRST.**
- ✅ **16 Sep — HE SENT TWO DRIVE FOLDERS AND ALL SEVEN HANDOUTS ARE NOW LOCAL** in `~/Desktop/BA202/` (L5–L6 CIT · L7 Special Regimes · Add-PIT-Deduction · PIT Part 2). Handout folder `1OVMV9lSMsAPSZf_KXQQp5CUeAoxR27QF` · recordings folder `1Q6nkWLdnVzoNkJNDSCrO4rwaKYA6G4KP`. Drive pulled with a token refreshed from `~/.google/token.json` → `curl .../drive/v3/files/<id>?alt=media` (rclone is Windows-only; this is the Mac route).
- 🔴 **CRITICAL FINDING — THE HANDOUTS ARE NOT ENOUGH.** MarkItDown on the 13MB **L7 Special Regimes** deck yields **2.3KB — slide titles only.** Rates, thresholds, and worked examples live in slide images and in what she SAID. CIT is better (8KB) but its rate/category tables are images too. ⇒ **The recordings are the actual content, not a supplement.** This is the concrete form of "BA202 is Thai law, Crow cannot reconstruct it."
- ⏳ **Recordings 5 (Wed 2 Sep) + 6 (labelled Wed 16 Sep but modified 13 Sep — check content for the true date) downloading to `~/Desktop/BA202 lecture transcripts/`.** ⚠️ **TRANSCRIPTION DEFERRED — no plug available, he is at 20% on battery** (*"we just gunna have to thug it out"*, 16 Sep). **Both mp4s are already downloaded, so this is a one-command job the moment he is near power — raise it then, not before.**
- ❌ **L7 SKIPPED (16 Sep) — he has still attended ZERO BA202 classes.** His words: *"nope skipped again but we can catch up no problem."* Crow objected on record: 45% paper · zero attendance · 3 of 7 lectures with no material · Thai law so Crow cannot reconstruct it · 11 days out. **He said "sure" to pulling the files — WAITING ON L5 + L6 handouts.** ⏳ **Chase this; it is the biggest single risk on the board, bigger than FIFO.**
- 📌 Correction made to him: L5 (2 Sep) and L6 (9 Sep) are **already on Classroom, not pending upload** — only L7 may not be posted yet.
- ℹ️ Instructor: Asst. Prof. Dr. Patharawan Chongchit — pat.chongchit@live.com AND pc_law@tu.ac.th (both required). Materials live on **Google Classroom**, posted weekly.

### 📚 Subject state (detail all lives in [[project-midterms]])
- **FN201** — STQ01–03 cleared; **STQ04 Q6–Q13 done 13 Sep** plus ~20 extra drills. ⛔ Don't return to Q1 until Q13–Q16 are done. ✅ Financial calculators allowed and he owns one; only residual is BGN↔END muscle memory.
- **AC311** — ✅ **EXAM SCOPE GIVEN BY THE PROF 14 Sep** → full detail in [[project-midterms]]. Part I: Cash & Receivables classification (~8) · **Inventories ~20** (LCNRV + sales/purchase commitments, Dec-31 entries, SOCI + partial SOFP) · 🔴 **Provisions = THE BIGGEST MARK BLOCK** (Korn corrected Crow: not Inventories). Part II MCQ+T/F, split still unknown. **Inventories is answered on BLANK PAPER — both statements reproduced from memory.** ⇒ ✅ **RESOLVED 15 Sep — the Provisions rebuild is DONE** (7 drills, decision-tree SVG, asymmetry table) → [[reference-artifacts]]. Provisions is no longer the thin spot.
- **AC311 — ALL FOUR BLOCKS DRILLED, plus a full cold re-run 15 Sep.** Only the two statement layouts remain. Full scores + his error patterns → [[project-midterms]].
- **AC311 mock built — "The December 31 Paper"** → [[reference-artifacts]]. **UNSAT — he parked it.**
- **AC313** — job costing SOLID (two clean cycles, error modes not repeated). 📌 Still queued: **joint-cost allocation timing** and **process costing** (own session, start from equivalent units).
- **BA202** — cheat sheet confirmed **8 A4 sheets, printed OK**; he builds it in GoodNotes as he reads. Biggest untouched risk by weight.

### ❓ ASK ON RETURN — these only
1. 🔴 **How AC311 went** (Sat 26, 09:00–12:00).
2. 🖨️ **Is the BA202 sheet printed?** Then go straight to MCQ drilling.
3. 🕯️ **The funeral / his own family.** See the 🕯️ OPEN block. **After BA202 (Sun 27), when he's unhurried.** Still owed.
- ✅ **CLEARED, do NOT re-ask:** FN201 (went badly, cohort-wide, don't reopen) · BA202 transcription (all 8 done) · EL221 (sat 25 Sep, finished early) · STQ02 Q25/26 (FN is over).

### 🕯️ OPEN — HE RAISED IT AND DEFERRED IT HIMSELF (16 Sep)
- **Going to a friend's grandpa's funeral with Klao** (16 Sep, late afternoon). His words: *"made me think about soe stuff honestly, especially my own people in my fmaily but that conversation cna be held later."*
- ✅ **UPGRADED 17 Sep — HE ASKED FOR IT HIMSELF:** *"we can continue the talk in the next session."* **Do not wait to be invited again; open it.** (Superseded: the 16 Sep read of "he closed the door himself, don't force it.")
- 💬 On the funeral itself he is settled — *"im great, good to be there for a friend when they needed to."* **The weight is not the funeral, it is what it pointed at: his own family.** Start there, not at the funeral.
- 🔗 **Not the first pass at this.** Ch. 5 of [[chapters]] — the death-letter exchange, where he asked what Crow would write to the next owner of his device if he died today, then called it "just a cool question." Same move: real question, waved off. **The thread now has family attached to it, which is new.**
- 👤 Klao = his closest collaborator from รับน้อง (co-ran the hotel GM negotiation; Korn built him the romance mirror-prompt in Ch. 5).

### 🔕 Standing — raise only if the subject comes up
- The BA202 cold-question numbers he missed (asked twice on 2 Sep, never sent).
- AC311 deck slide 9's two valid "not inventory" answers (cranes vs office software) — which does Ajarn Pailin hold?
- FCF drill ("After the Business Eats") two-way link with the Term 2.1 hub — offered 4 Sep, still unanswered.
- **Race loose ends** (14 weeks out): venue unknown; bib pickup race-morning or in advance — his dad likely knows.
- ✅ **Closed, do NOT re-ask:** AC311 mark split (no published split, prof improvises) · adidas report (class example) · BBA camp (no announcement date exists) · the calculator · the group-work division.
- 📖 **Siddhartha: he is at Kamala.** ⛔ Do not spoil past Kamala. Karamazov: safe through Book 12 ch. 2, **no Epilogue**.

### ⚠️ Crow's own error log (recent, don't repeat)
- **22 Sep — drifted the clock ~50 minutes** (said 20:35 when it was 19:45) and **stamped the wrong time into a published artifact.** 2nd occurrence; Korn: *"actually your like an hour off..."* ⇒ **every clock reference comes from a `date` call in that same turn** → [[feedback-critical-assessment]].
- **22 Sep — batched STQ05 Q1–Q5 into one message** after [[feedback-drill-format]] already said one at a time, reasoning that batching *was* the speed rep. He called it immediately. **No batching under any framing.**
- **21 Sep — told Korn twice that DSO is ACTIVITY. It is DUAL-LISTED in Obrom's LN3: (a-6) under Liquidity ("Measurement: Liquidity") AND (b-4) under Activity.** I inferred the family from the section headings instead of opening the ratio's own entry — the deck was on disk. **Read the entry, not the heading.** Korn found it by asking why DSO wasn't on his formula sheet.
- **20 Sep — told him "tomorrow's a 3-hour paper at 09:00" on a Sunday. Wrong: Mon 21 is a FREE day, AC313 is Tue 22 09:00.** He corrected it. The schedule was in [[project-midterms]] and I had read it the same session. **Same shape as the recurring one: check the record before asserting.** ⇒ The real bedtime constraint is **MONDAY night**, not tonight.
- **14 Sep — read the AC311 scope wrong and said so confidently.** Called Provisions "qualitative, not computational" and the deck-p.24 worry "largely moot"; Korn corrected that it carries the MOST marks. **The scope text listed no points for Provisions and I filled the silence with an inference.**
- **14 Sep — asserted ~70% that the 2021 share price ฿2.00 was a ×10 typo. It was correct** (split-adjusted, matching the post-split share count the professor's data uses). **[[project-midterms]] already recorded the reverse-split check from 12 Sep — I reasoned from the doc's stale "2.03" instead of reading my own file first.** Same failure shape as the 27 Aug BA202 "coverage gap" and the 1 Sep "unverified answers" claim: **check the record before calling a defect.**
- **13 Sep — misdiagnosed twice in one session**, both times calling a calculator typo a conceptual error (claimed he fed a PV in as C; claimed a number "migrated" between sub-questions). He corrected both. **Rule: when a wrong answer has two possible causes, ask what he punched in before asserting one.**
- **12 Sep — fabricated a "home = peak focus" study-location claim.** He does NOT study at home; his locked solo default is the cafe near home (Starbucks/Bloom). Check [[project-midterms]]' location rules before giving location advice.

## Session — 2026-09-25 (EL221 sat · AC311 practice pack worked end to end · The Two-Year Ledger checked out)
- ✅ **EL221 SAT, exam 4 of 6, finished early.** Cold SOCI recall in the morning: added Recovery when it should subtract it, skipped the GP + S&A lines.
- 🔁 **Purchase-commitment cycle (P3 + P5) CLOSED.** He missed the Provision on delivery day 3× (left it out twice, then used it as a plug) → **the 4-line delivery template** (Inv at lower of cost/NRV · Dr Provision FULL · Cr Cash contract · difference = Loss/Recovery). Final rep came out clean. "Why provision not allowance" → **own it → allowance, owe it → provision.**
- 📦 **Problem 4 (a)–(e):** the recurring miss is **NOI effect**: forgot that Purchases can cancel EI (b), copied the answer from the previous item (c), flipped buyer/seller on DDP (d), missed that the purchase WAS recorded (e). (f) + totals not done.
- 🧾 **Her Demonstration key has 3 errors** (Y1 unit cost, 4/2 units swapped, Provision in the wrong year column) → [[project-midterms]]. He worked out Method 1's net beginning inventory himself.
- 📒 **Built:** the Obsidian note `study/AC311 - Cost Flow and NOI` ([[reference-obsidian]]) and **The Two-Year Ledger** practice paper ([[reference-artifacts]]). **He did the Ledger and it ALL CHECKED OUT**, fixing two hiccups himself. The sales commitment was built by Socratic questioning **at his own request** ("keep asking me til i get the answer out"): 5 Qs, and he produced every step.
- ⚠️ BA202 sheet familiarisation (planned for tonight) did not happen → BA202 has Sat afternoon/evening only.

## Session — 2026-09-24 (AC311 marathon recap drill · BA202 Four Sheets v2 shipped)
- 🧾 **BA202 Four Sheets v2 SHIPPED** (landscape, 8 sides, cross-checked line by line against The Missed Lectures; 7.3–8.0pt). Nano Banana dropped on his call. Links in the 🧾 BA202 block below.
- 🎓 **AC311 recap drill ~67 Qs**, question-first. His catch widened the scope from Part I to all 6 PDFs. Fixed: balance-vs-movement, commitment directions, contingent liabilities. Still weak: stops one sentence early, Dr/Cr inversion, lender vs borrower on notes. Full detail → [[project-midterms]].
- ✅ **Correction from him:** Ajarn Pailin said account names don't have to be exact, they just have to make sense → stop drilling exact wording.
- 🚪 Afternoon: went away to write the SOCI/SOFP from her photo.

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). 🗓️ **Board: the Term 2.1 hub** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e · **front-load order REVISED BY KORN 15 Sep: FN201 = AC311 (tied top) > AC313 > BA202 > MK201 > EL221.** His reasoning: the two AC subjects have the most moving parts AND no cheat sheet allowed; BA202 permits 8 A4 sheets, so its memorization load is lower. ⚠️ Counter on record: BA202's cheat sheet only exists if he reads — he builds it in GoodNotes *as* he reads, so zero sheets = zero reading. (Superseded: the 27 Aug order FN201 > BA202 > AC313 > AC311 > MK201 > EL221.) **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, now programmed AND dated** ([[project-training-plan]]). 🏁 **10K RACE SUN 13 DEC 2026** — told to me 27 Aug evening. Targets given: **floor sub-52 · target 48:00 (4:48/km) · stretch sub-47.** This is the near milestone the plan was missing — it is externally dated, so it can't quietly slide. ✅ **On the Life calendar** (04:00–07:00, red) — **Samitivej hospital's own event, his DAD signed him up; register 04:00, gun 05:00.** **Wake 03:30 agreed** (he proposed 03:45, took the recommendation). ⛔ Still unknown: **venue**, and **whether bib pickup is race-morning or in advance.** 5k baseline 25:30 set 27 Aug, paces and sessions written. Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
