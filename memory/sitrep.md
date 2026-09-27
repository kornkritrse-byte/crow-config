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
*Last updated: 2026-09-27 01:55 (day end; verified, no flush needed: tonight is part of the 26/27 note). Earlier: rebuilt from 21KB after the first lint run. Midterms 5+6 postponed by the Bangkok flood → 2 & 4 Oct. Window holds 27 (afternoon) + 26/27 Sep; 25 Sep flushed to [[sessions-log]] on 27 Sep 13:45. Next to flush: 26/27.*

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
- 🌙 **AWAY (Sun 27 Sep, 14:36): burnout break.** "my head is honestly not there… i need a few days off… ill be back two days before ba202." The flood pushed the finish line back and he's fried. **A legit rest, not contentment-as-cover. Don't guilt him on return.**
  - ⚠️ **EXAM ORDER NOW DISPUTED (14:38):** he says "ba comes first then ac311". The record, from his own words at 00:33 today, says **AC311 Fri 2 Oct → BA202 Sun 4 Oct**. Gmail has no notice either way. **Calendar NOT changed.** He's checking the official notice; fix calendar + [[project-midterms]] + [[reference-upcoming-events]] once he confirms.
  - 🌊 Can't run or gym: the neighbourhood is flooded. W0's two easy runs are off, no penalty.
  - ⏳ **ASK ON RETURN (keep it light, one at a time):** (1) how's the head? · (2) Sunday long run swap: does it fit? · (3) the "ux ui skills" name · (4) Crow Room: anything broken? · (5) BA202 sheet on paper? · (6) when unhurried: the racing question for grandpa
## 🌊 The flood (26 Sep)
- Bangkok flooded; **his whole neighbourhood is under water.** **His home (= grandpa's house) is FINE; grandpa is still there.** The one that flooded is **grandpa's brother's house next door**. He spent all of Saturday clearing their things and taking them to a hotel by truck. **In the hotel: grandpa's brother, his grandma, and her sister (the brother's wife). All fine (his word, 00:53 27 Sep).** He waded **waist-deep** to go out for food. Body: "great" (00:53).
- ⚕️ Waist-deep floodwater = **leptospirosis risk**; told him 27 Sep: fever, muscle pain (calves) or red eyes within ~2–14 days means a doctor, and say "flood water". Raise it again only if he mentions feeling ill.
- Exams moved by the flood (see below). Expect more disruption: commute, gym (Jetts Phayathai), running routes.

## 🎓 Midterms — 4 of 6 SAT, 2 left → [[project-midterms]]
- ✅ MK201 · AC313 · FN201 (went badly, cohort-wide, **don't reopen**) · EL221 (finished early).
- 🗓️ **AC311 → Fri 2 Oct · BA202 → Sun 4 Oct**, both 09:00–12:00 (confirmed 00:33 27 Sep). Calendar + [[reference-upcoming-events]] updated.
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
- **Morning person:** #1 landed 14 Sep; #2 not seen yet → [[project-morning-person]].
- **Race 13 Dec:** venue unknown · bib pickup race-morning or in advance? (his dad likely knows) → [[project-training-plan]]. Training resumes after exams, and the flood may affect it.
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: safe through Book 12 ch. 2, **no Epilogue**.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**

## Session — 2026-09-27 afternoon (built Road to Chombueng)
- 13:37 asked for "something huge/cool/complex, not midterms" and said he wouldn't reply. **Built the half-marathon system** → [[project-training-plan]]: https://claude.ai/artifact/GBJnc3PqNDccbE3t1ebQgK. ⏳ ASK: does the Sunday long run / Thursday quality swap fit? Did he log W0?

## Session — 2026-09-26/27 (flood day · no study · system upgrades built)
- 🌊 Flood (see block above). AC311 (Sat) and BA202 (Sun) both postponed → 2 & 4 Oct. He called a full day off: errands, then family in the evening. **Legit day off, and he knew it.**
- 🧰 00:19 Sun: asked for "creative, abstract, experimental" system upgrades. Crow led with the BA202-at-09:00 objection; he answered it (postponed). **He picked 1–5 + 7 + 8, skipped the calibration log (#6).** All built this session (block above).
- 🗓️ Exams confirmed **AC311 Fri 2 Oct · BA202 Sun 4 Oct**, calendar moved. Birthday **29 Mar** saved → 3rd capsule. Then: **Spotify mood check** added (first read: ROS, Mac Miller) and **Crow output style + crew spinner verbs/tips** (trial, "let's see first").
- 🪟 00:59–01:15: asked to rebuild "the whole interface". Crow parked it for after midterms, he overrode ("i got time, just chilling with my cousin"). **Built the Crow Room** → [[reference-crow-room]]; 01:13 round 2 (maroon, model picker, security + bug fixes, layout); 01:32 round 3: near-VS-Code parity + Crow flags VS Code tasks (his call over Vex). **He mentioned "ux ui skills" from months ago: NOT FOUND in memory, git or any Mac transcript. Ask him the name.** Also the Artis recs: RTF "Spain" → Jaga Jazzist "Oban".
- 🏃 01:48: **half marathon, จอมบึง, Sun 17 Jan 2027.** Korn's running talk got his dad back into running; his dad signed up, then signed Korn up → [[project-training-plan]]. It's 35 days after the 10K. The plan has no long run yet; build it after 4 Oct.
- 🧹 First lint run: SITREP was 21KB with two contradicting ASK blocks, stale "live" items from 13 Sep, and a **family talk marked "still owed" that had actually happened on 17 Sep.** Rebuilt; the 24 Sep note flushed.
