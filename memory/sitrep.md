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
*Last updated: 2026-08-25 (day-end, verified + flushed)*

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
- **HERE — Thu 27 Aug 09:28.** ⚠️ **He never came back on the evening of 26 Aug** (said "back in the evening", didn't return). So the whole 26 Aug evening is UNREPORTED and the ASK-ON-RETURN list below is still fully open. **No 26 Aug nightly quote fired and none should — he never signed off; do not retro-fire it.**
- 🏃 **5k TT was scheduled 06:30 TODAY (27 Aug) — ask for the number first.** BA202 block 09:30–17:30 starts now.
- ✅ **CONFIRMED 26 Aug ~13:00: FN201 Assignment #1 SUBMITTED.** He is **Group 1** (clip title reads "26F BBA G1") → the 13:00 deadline was his. Closed.
- ▶️ **He is watching the FN201 TVM clip right now** — "FN201 26F BBA G1 L02 OBF2 ABF TVM1 260812 MU1" (rec. 12 Aug), YouTube channel **Obrom Chaowalerd** (@obromchaowalerd5981). **The FN201 recorded clips live on public YouTube — that channel is the intake source.** Note L02 = TVM1, so the clips run AHEAD of class; flipped-classroom confirmed again.
- 🟢 **Korn confirmed (26 Aug): this is the FIRST TVM coverage — there is NO TVM backlog.** He is arriving at TVM on schedule. **FN201 is pace-keeping, not catch-up.** The only real hole remains **BA202** (zero classes attended, 45% paper, L4 recording not up till the weekend).
- 🔴 **CORRECTION he needs: TVM is LN4, NOT LN1.** LN1 = Topic #1 Overview of Business Finance. **`~/Desktop/fn/` holds all 5 FN201 lecture notes + `Interest Factor Tables.pdf`** (tabular method is examinable — Tables A-1 PVIF / A-2 PVIFA / A-3 FVIF / A-4 FVIFA).
- 🚨 **THE CLIP IS MOSTLY NOT TVM.** L02 runs 2:42:18; **TVM only starts at 2:06 and the clip ENDS at 2:42** with him saying "we are just now discussing the future value... see you next week." So the clip delivers **LN4 Sections I–II only** (timeline/notation, compounding vs non-compounding, the 5-question guideline) — roughly 4 of ~64 pages. **Sections III–VII — every mechanic — are still ahead.**
- 📄 **BUILT + PUBLISHED "Obrom's TVM Playbook"**: https://claude.ai/code/artifact/7005f3de-c10b-4542-b3b4-40f619b4f51c — 5-question decision tree, the 5×3 formula matrix (5 base formulas + 2 moves: due = ×(1+i), delayed = two-step ×(1+i)^-τ), rate zoo, m≠m*, traps table, **16 drill problems with hidden worked solutions** (all arithmetic verified).
- 🔧 **`yt-dlp` INSTALLED on the Mac (brew).** FN201 recorded clips are **unlisted YouTube** on channel **Obrom Chaowalerd (@obromchaowalerd5981)** — URLs come from MS Teams, the channel lists nothing. **Auto-captions exist → `yt-dlp --skip-download --write-auto-subs --sub-langs en-orig` beats whisper for these** (seconds vs hours). Add to [[reference-lecture-transcription]].
- ✅ **CLOSED TONIGHT:** FN201 Assignment #1 finished — catastrophe bonds, exported from Google Doc to `~/Downloads/FN201-A1-6802640661.pdf` (1 page, correct filename). **Assumed uploaded to Teams; he said "done fr this time" right after being told to upload. Confirm if it comes up.** Due Wed 26 13:00.
- 🔄 **REVERSED ~23:15 (25 Aug): HE IS SKIPPING WED 26 CLASSES AFTER ALL.** Trigger: talked to friends — ~5 are skipping, AND friends who already took FN201 with good grades told him the recorded clips are enough. **He says he'll still study at home + gym in the afternoon with zone-2.**
  - ⚠️ **The decision flipped on peer input within ~30 min of committing.** Pattern worth watching — not the class choice itself, the durability of the commitment ([[user-korn-struggles]], contentment-as-cover / [[crew-vera]]).
  - ⚠️ **The ex-students' testimony is real evidence about FN201 and I conceded it.** The social proof (5 friends skipping) is not. Kept those separate for him.
  - ⚠️ **STILL UNADDRESSED by anyone:** BA202 L4 recording doesn't upload until the WEEKEND, and Sat 29 already holds the 5k TT + AC313 costing block.
  - 🎯 **THE TEST, ask Wed evening:** did the freed hours actually convert to study? On 24 Aug the same trade (skip study, keep gym) ended with gym done and FN201 not.
- ✅ **CLOSED:** studying done at the campus block · **basketball game WON**.
- **ASK ON RETURN (evening of 26 Aug):**
  1. 🎯 **THE NUMBER — how many of the 16 drill problems did he get right FIRST TRY?** Not "did you read it." He had ~13:00–18:55 with the Playbook open. This is THE test of whether the skipped classes converted. (Q9 delayed annuity + Q11 growing perpetuity are the two designed to catch him.)
  2. **Did the 17:30 gym block happen?** It was 18:53 when he left — either it just ran, or it got dropped. On 24 Aug the same trade ended gym-done/study-not; watch for the mirror image today.
  3. **Did he actually open LN4** (`~/Desktop/fn/FN201-26F-BBA-LN4-TVM-V22-260701.pdf`) — or work only from the artifact? The artifact is a drill layer, NOT a substitute for the deck.
  4. BBA camp interview (25 Aug 10:10) — only if he raises it.
  5. ~~Campus library as a study spot~~ — stale, he stayed home today. Re-ask next time he studies on campus.
- **📌 WED 26 = THE PIVOTAL DAY:** BA202 09:00–12:00 (**his first-ever BA202 class**; picks up at source rule + residence rule, exactly where the notes stop) · FN201 A#1 due 13:00 · FN201 13:00–16:00 (**TVM starts — 4 weeks, the midterm's centre of gravity**) · gym 17:30–19:30.
- **🏃 5k TT MOVED to THU 27 Aug 06:30** (was Sat 29) — Friday night out would have made Saturday a compromised test, and a bad baseline misprograms 4 weeks. **Ask for the number Thursday.**
- **📅 WEEK RESHUFFLED 25 Aug (his plan):** **Wed 26 = FN201 TVM intake + first problems 09:00–16:00** + gym 17:30. **Thu 27 = 5k TT 06:30 then BA202 09:30–17:30** (his own swap — correct: TVM intake and problems belong on the SAME day, and it frees his best block for the 45% paper). **Fri 28 = WRITE-OFF after EL221** (goodbye lunch ~12–15 for friends leaving on exchange year, then Klao's + dogs, then out). Sat 29 = cooked morning, AC313 pm (expect it short), easy run 17:45. Sun 30 = easy run + FN201 TVM pt2.
- ⚠️ **BA202 L4 recording doesn't upload until the weekend** — L4 catch-up has NO slot yet. Land it Sunday or early next week.
- ⚠️ **Watch for:** week 2 (31 Aug+), not week 1.
- 📄 **Notes artifact:** https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483 (L2+L3 reconstruction, 14 COLD questions)

## Session — 2026-08-25
- 🎧 **Read all three BA202 transcripts and found the outline's lecture titles are WRONG** — the lecturer runs ~1 session behind. **L2 never reached PIT; PIT only starts in L3.** Korn is **one PIT lecture behind, not three.** L4 tomorrow = source rule + residence rule. Full detail → [[project-midterms]].
- 🚨 **THE FIND OF THE DAY: a CHEAT SHEET IS ALLOWED in BA202** — midterm AND final, A4 both sides, and the lecturer told the class to build a period × milestone table. Reshapes how BA202 gets studied. Korn to confirm exact page allowance.
- 📄 **Built + published the reconstruction** (L2 history + tax administration + constitutional basis, L3 PIT sequence + 6 taxpayer categories, 14 COLD questions): https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483 — **note: I promised these for 13:45 and delivered late; the block had already started.**
- 🎯 **L2 is denser in exam tells than L3** — he asked AND answered several in class (source of tax law → Supreme Court judgment; not-a-tax-authority → land & building + signboard tax). All logged in [[project-midterms]].
- 📚 **FN201 Assignment #1 DONE** — chose **catastrophe bonds**, asked me to explain rather than write it. Got the money-flow wrong 3× and **self-corrected each time** from the explanation. Exported to PDF via his Google Doc. ✅ Campus block held · 🏀 **game WON**.
- ⚠️ **Stale-banner bug caught:** reference_upcoming_events said "FN201 ratios" when the calendar said BA202 PIT. Fixed — **mirror the calendar in that file whenever it changes.**

## Session — 2026-08-24
- 🚨 **THE SESSION'S FINDING — attendance, volunteered unprompted.** AC313 ✅ all · AC311 ✅ all · **FN201 = week 1 only** · **BA202 = zero of three** (the 45% paper). The 23–24 Aug plan was built on "coverage is solved" — **false for both subjects he doesn't fear.** Full table, BA202 session map, FN201 session map + assessment → [[project-midterms]].
- ➡️ **My answer: the clips aren't the bottleneck, Wednesday is.** 4 of BA202's 7 midterm lectures are still AHEAD. **He committed to Wed 26 Aug (BA202 9–12 + FN201 13–16)** — check whether it happened. Also flagged FN201 is a *flipped classroom*: the clips are the lecture, class is the application he's skipping.
- 🔧 **Built the lecture-transcription pipeline and ran it** — pulled all 3 missed BA202 recordings from his Drive folder, ~8 hrs, transcribing locally overnight. Tooling + gotchas → [[reference-lecture-transcription]].
- 📄 **Read the 5 course outlines** (`~/Desktop/class outline/`, no EL221 — his free win). Killed the phantom "free week 14–19 Sep"; **both accounting scopes are far smaller than he feared**; **BA202 promoted 4th → joint-1st** (45%, thinnest window, no external substitute). Found a **15% FN201 group assignment due 16 Sep**, inside the crunch week. **Built the full plan on the Life calendar in one pass** — 28 study blocks + the training week that had never actually been placed.
- ✅ **Caught two things that would have cost him marks:** he'd assumed **FN201 Assignment #1 was group work — it's individual, due Wed 26 by 13:00**; and his Tue block was mine-wrong (I'd put TVM where the *missed* class should have gone — **he pushed back and was right**).
- 🪞 **He asked how my read of him had changed and asked for harsh** → **his fear tracks CONTACT, not EXPOSURE**, and the planning was the comfortable version of the studying. Both → [[user-korn-struggles]]. Narrative → [[chapters]] (Chapter 6).

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, designed, starts now** ([[project-training-plan]]). Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
