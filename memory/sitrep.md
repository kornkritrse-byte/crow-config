---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-09-13T13:34:50.755Z
---

# Situation Report
*Last updated: 2026-09-23 16:0x — L8 transcribed and IN the doc (all 8 recordings now covered). A second artifact shipped: the **Four Sheets** print-ready cheat sheet. Earlier: 14:5x — BA202 artifact rebuilt L1→L7 and republished; exam is MULTIPLE CHOICE; an 8th lecture found (his catch) and transcribing. Earlier: 13:3x — FN201 sat and went badly (cohort-wide). BA202 opened: all 7 transcripts confirmed on disk, material gap CLOSED. Earlier today: 06:3x — HERE, up early (morning #3), running LN2 axioms theory before the 09:00 FN201 paper. Previous: 2026-09-22 22:1x — DAY CLOSED on his ask. AC313 sat and good (exam #2 of 6). The official score allocation landed and reordered the night: TVM is 46% of the FN paper and holds all 18 PS points. STQ04 finished, two PS drills built and run, STQ05 done end to end, four STQ03 chained ratios. One knowledge gap all night; everything else execution. Window holds 22 + 21 Sep; the 20 Sep note is flushed to [[sessions-log]]. Next to flush: 21 Sep.*

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
- 🟢 **HERE — Wed 23 Sep ~14:5x.** **FN201 SAT AND IT WENT BADLY** (*"got my ass fucked in that exam along with my whole major"*) ⇒ cohort-wide. He moved straight past it — **do not reopen unless he does.**
- ▶️ **BA202 IS THE BOARD.** Exam **Sun 27 Sep, 45%, L1–L7, zero classes attended.** His instruction: *"add the whole thing into the doc and ill learn through it, if i have any questions ill come to ask you."* ⇒ **he studies from the artifact; Crow's job is the doc, not drilling him — until he asks.**
- 🏆 **THE ARTIFACT IS REBUILT L1→L7** — *The Missed Lectures* https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483 (details → [[reference-artifacts]]).
- 🔑 **THE FORMAT FINDING THAT REORDERS EVERYTHING: the midterm is MULTIPLE CHOICE**, 3 hours, and **part 1 is theory from LECTURE 1** (theory/policy/principle, "why tax matters to business"). Her words in L1. ⇒ recognition not reproduction; the skippable-looking lecture is a guaranteed block.
- 🎒 **CHEAT SHEET IS 4 × A4 DOUBLE-SIDED, made by himself** — NOT 8 sheets (old record was wrong). **She SUPPLIES Ministerial Regulation 126 and the withholding-tax rate table with the paper** — no sheet space on those. **He must bring s.42, the CIT exemption list, and the s.40 categories + deduction rates.**
- ✅ **L8 DONE AND IN THE DOC (23 Sep ~16:0x).** He found the 8th lecture and he was right — — `8.BA202-Taxation-AdditionalVDOClip-SpecialIncomeTaxRegime.mp4` (Drive id `1ULbhsLncw_r1_S5ly3EGQmrIPcI28Bme`, 427MB, posted 19 Sep) = SME incentives + investment incentives + **DTAs**, the topic L7 only introduced. ✅ **Transcribed 15:08 and folded into the artifact:** SME (Royal Decree 564, 3 conditions, progressive 0/15/20%) · petroleum (Petroleum Act→Energy for the licence, PITA→Finance for the tax; 3 contract types; 3 statuses) · 4 investment laws (BOI activity-based · IEAT area-based, the only one reaching VAT+excise · EEC both · Competitiveness Act) · DTAs (exemption vs credit method, the Koala example). ⚠️ First download died at exit 56 — script now uses `-C - --retry 10`.
- 🔋 **HE IS ON BATTERY, 72% and dropping ~2 hrs** with whisper on the GPU. Told him to plug in.
- ✅ **MATERIAL GAP CLOSED** — all 7 transcripts were already on disk (done 17–18 Sep); the SITREP had wrongly carried "not transcribed" for days. Blocker was never material, it is that he has read none of it.
- 🧾 **REAL SCOPE (class ran ~1 lecture behind the outline):** L1 intro/system · L2 system II + PIT I · L3 PIT II · L4 PIT III · L5 **PIT deductions + allowances** · L6 **PIT recap + CIT Pt I** · L7 **CIT Pt II + special regimes INTRO only.** ⇒ **PIT dominates. Petroleum income tax was NEVER TAUGHT.** Special regimes = light, and live only in video 8.

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
1. 🔴 **How the FN201 paper went** (09:00–11:30 Wed 23 Sep). First question of the day.
2. 🔋 **BA202 transcription** — both mp4s already downloaded; one command once he is near a plug. **Exam Sun 27, 45%, zero attendance. Raise it the moment FN is behind him.**
3. 🕯️ **The funeral / his own family** — see the 🕯️ OPEN block. **Ask once, gently, only when he is unhurried.** He deferred it, then asked for it to be reopened. Still owed.
4. Low priority: which of the 3 traps got him on STQ02 **Q26**, and whether STQ02 **Q25** was wrong too.
- ✅ **CLEARED 22 Sep, do NOT re-ask:** ~~how AC313 went~~ (good) · ~~did he pull STQ05~~ (yes, 16:37) · ~~STQ04 Q19/Q20~~ (done).

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

## Session — 2026-09-22 (AC313 sat and good · the exam outline landed and reordered the night · FN201 ground out to a 22:30 stop)
- ✅ **AC313 SAT, exam #2 of 6 — "the test was good actually," one question he thinks he missed.** Closed, don't reopen.
- 🚨 **THE OFFICIAL SCORE ALLOCATION ARRIVED** (he uploaded it 19:31) and reordered everything: **TVM = 32 of 70 points (46%) and holds ALL 18 problem-solving points**; LN1 is 4 points and was cut on his call. **~4.3 min per MC ⇒ the "speed reps" priority is retired — accuracy beats speed.** Full table + logistics in [[project-midterms]].
- 🏗️ **BIG FN SHIFT DONE:** STQ04 **finished** (Q19 44 · Q20 50.15625 · Q28 all six parts, incl. add-on interest learned from zero in 5 min) · two Crow-built PS drills — **the Bangkok Condo** and **the Grandmother's Fund** · **STQ05 end to end** (Q26–30 five for five; concept half 8/19) · four STQ03 chained ratios including **Q1, the one he said wrecked him — which he derived, not recalled.**
- 🩺 **THE DIAGNOSIS OF THE WHOLE NIGHT: ONE knowledge gap (add-on interest, closed). Everything else was EXECUTION** — off-by-one in time ×4 · right formula wrong input ×3 · grabbed the adjacent quantity ×3 · a dirty calculator that produced a wrong answer from three correct inputs. ⇒ **the four-check pre-flight** (clear the calculator · which rate grows vs discounts · what date am I on · what quantity is asked) and the artifact **[[reference-artifacts]] "Where the Marks Die."**
- 🚨🚨 **THIRD CONFIRMED INSTANCE OF OVERRIDING A CORRECT FIRST INSTINCT** — STQ05 Q11, the 1.015²⁰ hesitation, STQ03 Q7 (*"fuck my gut and like my first choice was 2"*). **Rule given for the exam: first answer stands unless he can say out loud what is wrong with it.**
- 🐛 **TWO CONFIRMED FABRICATED USER TURNS** — answers attributed to Korn that he did not type, one of which spoiled a question he was mid-way through. **Mitigation in force: he prefixes real answers `A:`.** Crow cannot detect this from its own side. Feedback draft queued for `/feedback`.
- 🧊 **THREE FORMAT CORRECTIONS FROM HIM IN ONE SESSION** — *"bro one at a time please stop forgetting this"* · *"can you shorten the explanation please"* · *"from now on give me short explanations like simple factors."* All three now hard rules in [[feedback-drill-format]].

## Session — 2026-09-21 (AC313 day closed out · FN201 LN5 built from zero · a Crow error found by his question)
- 🌅 **MORNING ATTEMPT #2 LANDED** — opened 07:23 with "hey ac313 day", first morning used for STUDY → [[project-morning-person]]. Two is not a habit; keep watching.
- 🏭 **AC313: ALL FOUR OF HER TOPICS CLOSED.** Step-4 skeleton · transferred-in cost assignment (Q14 Aragon WA **and** FIFO, ties to 242,000) · POHR/normal-vs-actual · joint costs all three methods · byproduct fork · Topic 1's five formulas rebuilt as **three tubs**. 📊 **Cold set 11/20 — journal entries 3/7 was the weak block**; the **entry-picker chart** was built for it and is now shipped as §`#j-pick` of *From Raw to Sold* → [[reference-artifacts]].
- 💰 **FN201 LN5 §8.4 BUILT FROM ZERO IN ~50 MIN** — mechanism first, names last; he produced bankruptcy/no-buyer/inflation/"incentive" from a plain lending scenario before any acronym appeared. **Example 3 closed, all five parts (3.750 · 2.000 · 3.125 · 2.500 · 11.000).** Full teaching keys in [[project-midterms]].
- 📉 **LN3: five families cold ✅, sort 4/5, two DuPont diagnoses run.** TIE retained from last night. **He gave the THEREFORE unprompted once** — first time the comparison-without-consequence pattern broke on its own.
- 🚨 **HE CHALLENGED THE DRILL AND WAS RIGHT, TWICE.** (1) *"is there really a point to this part, im kinda just reading off the formula sheet"* ⇒ **FN201 formula recall is dead as a drill** — pick and interpret only. (2) *"havnt we done st3 before?"* ⇒ he caught Crow about to re-run STQ03, closed 20/20 on 12 Sep. **He is now auditing the session plan himself. Take it seriously when he does.**
- 🔴 **CROW ERROR HE SURFACED: DSO is DUAL-LISTED in Obrom's LN3** — (a-6) under Liquidity *and* (b-4) under Activity. Crow had asserted "Activity" twice from the section headings without opening the ratio's own entry. Found only because he asked why DSO wasn't on his formula sheet. **Read the entry, not the heading.** → [[project-midterms]]
- 🧊 **TWO PACING CORRECTIONS FROM HIM: *"can you shorten the explanation please"* and *"relax bro."*** Long blocks and clock-pressure both landed as friction, not help → [[feedback-drill-format]].
- 🪤 **THE TIE-OUT FALSE-PASS, named twice tonight:** he offered 174,000 as proof when 174,000 *is the input side* and ties regardless. Same shape as the 686 bound check on 20 Sep. **A check that cannot fail is not a check.**

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). 🗓️ **Board: the Term 2.1 hub** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e · **front-load order REVISED BY KORN 15 Sep: FN201 = AC311 (tied top) > AC313 > BA202 > MK201 > EL221.** His reasoning: the two AC subjects have the most moving parts AND no cheat sheet allowed; BA202 permits 8 A4 sheets, so its memorization load is lower. ⚠️ Counter on record: BA202's cheat sheet only exists if he reads — he builds it in GoodNotes *as* he reads, so zero sheets = zero reading. (Superseded: the 27 Aug order FN201 > BA202 > AC313 > AC311 > MK201 > EL221.) **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, now programmed AND dated** ([[project-training-plan]]). 🏁 **10K RACE SUN 13 DEC 2026** — told to me 27 Aug evening. Targets given: **floor sub-52 · target 48:00 (4:48/km) · stretch sub-47.** This is the near milestone the plan was missing — it is externally dated, so it can't quietly slide. ✅ **On the Life calendar** (04:00–07:00, red) — **Samitivej hospital's own event, his DAD signed him up; register 04:00, gun 05:00.** **Wake 03:30 agreed** (he proposed 03:45, took the recommendation). ⛔ Still unknown: **venue**, and **whether bib pickup is race-morning or in advance.** 5k baseline 25:30 set 27 Aug, paces and sessions written. Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
