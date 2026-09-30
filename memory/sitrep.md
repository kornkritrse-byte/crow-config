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
*Last updated: 2026-09-29 12:2x (live). Window holds 29 + 28; 27 afternoon flushed to [[sessions-log]] on 29 Sep. Next to flush: 28. Midterms 5+6 postponed by the Bangkok flood → BA202 2 Oct, AC311 4 Oct.*

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
- 🔄 **AWAY (Wed 30 Sep, 08:58): closed the VS Code session ("save and close"). Not a day-end, no quote.** Today's plan (his, 29 Sep): boat out of the flooded area → cousin's apartment in Thonglor, band practice in the afternoon.
  - **ASK ON RETURN:** (1) **goals today?** (the first ask of 30 Sep, not done yet; goals.py) · (2) did last night's GoodNotes block + Q22 happen? (the record stops at 19:55; the Room didn't log after that) · (3) bed by 23:30 last night? (not tracked, since no goals were set on 29 Sep; ask only as part of (1))
- 🟢 (earlier) **Here (Tue 29 Sep, 12:12): BA202 lock-in day.** 19:42 he's also in VS Code with Crow on Room side-builds (drawer/cabinet).
  - ⏳ **ASK when it fits (light, one at a time):** (1) how's the head? · (2) did he ask Klao for the practice recordings ("ill tell him for sure")? · (3) the Sunday long run / Thursday quality swap: does it fit? · (4) the "ux ui skills" name · (5) BA202 sheet on paper? · (6) when unhurried: the racing question for grandpa
## 🌊 The flood (26 Sep)
- Bangkok flooded; **his whole neighbourhood is under water.** **His home (= grandpa's house) is FINE; grandpa is still there.** The one that flooded is **grandpa's brother's house next door**. He spent all of Saturday clearing their things and taking them to a hotel by truck. **In the hotel: grandpa's brother, his grandma, and her sister (the brother's wife). All fine (his word, 00:53 27 Sep).** He waded **waist-deep** to go out for food. Body: "great" (00:53).
- ⚕️ Waist-deep floodwater = **leptospirosis risk**; told him 27 Sep: fever, muscle pain (calves) or red eyes within ~2–14 days means a doctor, and say "flood water". Raise it again only if he mentions feeling ill.
- Exams moved by the flood (see below). Expect more disruption: commute, gym (Jetts Phayathai), running routes.
- 💧 27 Sep 21:23: water "creeping down, really slowly", then rain resets it. Little change. He popped in mid-break to chat, not to work.
- 🎸 **NEW 21:28: he plays a CONCERT Sat 3 Oct**, between BA202 and AC311. The flood blocks band practice. On bass, homecoming for returning exchange students, band with Klao + uni + exchange friends. "Not that hyped", thinks it'll be great WITH practice, which he has no time for. The band practises without him; he's stuck until the water drops → [[reference-upcoming-events]].

## 🎓 Midterms — 4 of 6 SAT, 2 left → [[project-midterms]]
- ✅ MK201 · AC313 · FN201 (went badly, cohort-wide, **don't reopen**) · EL221 (finished early).
- 🗓️ **BA202 → Fri 2 Oct · AC311 → Sun 4 Oct**, both 09:00–12:00 (official notice, corrected 14:41 27 Sep; the 00:33 entry had them swapped).
- **AC311 — what's left:** Problem 4 (f) + totals · cold SOCI/SOFP layouts (on 25 Sep he added Recovery, skipped GP + S&A) · the NOI-effect family (Purchases cancelling EI; DDP buyer/seller) · **The December 31 Paper** mock, unsat. His AC311 misses are seeded in [[ghost-deck]] for 28 Sep – 1 Oct.
- **BA202 (45%, heaviest; zero classes attended):** the Four Sheets exist on screen, **NOT printed (no printer at home)** → print shop, or handwritten (the rules allow it). MCQ drilling from the sheet hasn't started. 🔴 **Carry the WHT rate table on the sheet**: she promised it verbally, but the written rules don't. Exam rules (MCQ, varied points, TBS carbon sheet, 2B pencil, ≤8 pages on 4 A4, only MR126 supplied) → [[project-midterms]].
  - 📘 The Missed Lectures — https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483
  - 📄 Four Sheets — https://claude.ai/code/artifact/c260aedb-c344-4e44-bb1e-a2473bcc1d25 · PDF `~/Desktop/BA202/BA202-cheatsheet-4sheets-8pages.pdf`
- 🗓️ Hub: https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e

## 🧰 New system pieces (built 27 Sep, his pick from 8 ideas) — all fire from the session-start hook, silent unless due
- 🕐 `hooks/prompt-time.sh` stamps `[clock]` on every prompt → **use it for any time reference.**
- 🧹 `bin/lint-sitrep.py` flags rule breaks in this file → **fix whatever it prints in that session.**
- 👻 [[ghost-deck]]: one missed question served cold at session start. **Every drill miss becomes a card that turn.**
- 🪞 [[ledger-said-did]]: his dated "I'll do X"s, checked the next session; weekly % on Sundays.
- 📬 `memory/capsules/`: sealed letters. **12 Dec 2026 (race eve)** · **29 Mar 2027 (his 20th birthday)** · **16 Sep 2027 (a year after the funeral)**.
- 😈 **Vex subagent** (`.claude/agents/vex.md`): no memory, no context, attacks a plan cold. Brief it with the plan + facts only, never with his feelings about it.
- 🎵 Chapter soundtracks on Spotify (Artis): one playlist per chapter in [[chapters]].

## 🔕 Standing — raise only if it comes up
- 🌸 **Daily goals: BUILT 29 Sep 21:32–22:00** (he pulled it forward from Sun 4 Oct, with a hard stop at 23:00). The Room's flower = today's goals; the petals fall at log-off → [[reference-crow-room]] · rule [[feedback-goals-today]]. **Tomorrow's first session: ask "goals today?".**
- **Morning person:** #1 landed 14 Sep; #2 not seen yet → [[project-morning-person]].
- **Race 13 Dec:** venue unknown · bib pickup race-morning or in advance? (his dad likely knows) → [[project-training-plan]]. Training resumes after exams, and the flood may affect it.
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: safe through Book 12 ch. 2, **no Epilogue**.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**

## Session — 2026-09-29 (BA202 lock-in day)
- 12:12 back. Task #26 (Recovery on the SOCI): **pass** after a nudge on *where*.
- Said he'd get the Four Sheets onto paper "right away" → [[ledger-said-did]].
- 12:47 detoured to AC311 "to get it off my mind": Q1 classification labels 4/5, reasons 2/5 (petty cash reason = size ✗, postdated cheque = notes rec ✗, both ghosted). SOCI from memory: **all correct**. 13:1x opened Four Strings paper III → worked parts 1–2 (unit-cost miss: spread freight over 150 not 190, skipped the 380 row; walked through the sales commitment + 20X2 LCNRV split). **14:34 parked mid-paper → BA202.** Finish Four Strings (SOCI numbers + SOFP vs checkpoints) before Sun 4 Oct. Ghost #27 (allowance movement) NOT served — contaminated by the Method 2 walkthrough, serve next session.
- 15:23–16:1x **BA202 sheet → v3** on his ask ("go over all the courses… take out the how-to-read, stems, she-said stuff"): full deck + transcript audit, P1 left column replaced, 4 BOI groups, her WHT table, lots of CIT/regime additions → `~/Desktop/BA202/BA202-cheatsheet-v3-29Sep.pdf` → [[reference-artifacts]]. Next: he reviews it, then GoodNotes + drawing. Still unprinted.
- 17:03 final check of v3 vs her decks: allowances, deduction rates, brackets, right-to-elect, dividend credit all match → **no changes, sheet final**. His plan: **Wed 30** boat out of the flooded area → cousin's apartment in Thonglor, afternoon band practice · **Thu 1** BA202 revision at the cafe · **Fri 2** BA202 + practice · **Sat 3** AM AC311 revision (+ run if conditions ok), PM show · **Sun 4** AC311 → free. Sheet must be PRINTED by Thu night. · 17:19 **sheet navigation run** started → `scratch/ba202/nav-run.md`; **Finished 18:54: 15/21 (71%), all 8 pages.** Misses = stopped reading early ×2, 40(2) vs 40(7), progressive slices ×2 (PIT + SME), elect-means-no-dividend-credit; all 6 ghosted for Thu 1 Oct. Every Q had a page hint → next run: NO hints, random order. **Run 2 (no hints, 20:05–20:44): 3/6**, stopped on the agreed guess rule (Q27 wagered). Misses: WHT guess, Koala No-DTA row (a 'grid miss', his own read), 4 elements. GoodNotes notes DONE (20:30). Thu ghost load is heavy: ~9 BA202 cards due 1 Oct. Ghost #27 skipped again, still due.
- Room side-builds (VS Code): MCQ cards · real window view (whole wall, animated) · 3 desk drawers (middle = artifact box) · cabinet · **goals flower** → [[reference-crow-room]].
## Session — 2026-09-28 (rest day called · BA202 lock-in set for Tue)
- 13:53 back after reopening. Task #25 (allowance vs provision): **pass**, own it vs owe it.
- Smooth home title **kept** ("I fuck with it") → [[reference-crow-room]].
- Called a rest day. **BA202 lock-in Tue 29 Sep, full day** → [[ledger-said-did]].
- "In case I find the fire": built **AC311 practice paper III, Four Strings Co.** (2 years, Method 1, delivery-day entry, contract-units NRV trap, onerous sales commitment, Method 2 bonus) → `~/Desktop/ปีศาจ/AC311-Four-Strings-Paper.html` → [[reference-artifacts]]. Checkpoints: Y1 COGS 5,930 / NOI 2,290 · Y2 COGS 6,450 / NOI 4,010.
