---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-22T12:00:49.562Z
---

# Situation Report
*Last updated: 2026-11-22 11:05 (mid-session save, not day-close). Window holds 22 Nov + 20 Nov; 19 Nov flushed to sessions_log. Note: no 21 Nov session note was written despite git syncs that day — gap not yet investigated.*

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
- **AWAY (22 Nov, ~17:22) — off to: a run.** Before it: AC313 Quiz 3 (1/2024) MCQs (`~/Desktop/pastpapers/AC313/AC313 Quiz 3 (graded, 2024+2025).pdf`), Q2–8 + hard ones Q14/16/17/19, 10/11. Only miss: Q6 material ordering → picked unit-level, it's batch (ghost card added; same gap as the setup-costs card). Skipped as easy: Q9–13, Q15, Q18. Room note: re-served Q2–3 cards stayed locked (localStorage keys on question text); tagging q with "[Quiz 3 · Qn]" fixed it.
  Back 18:57: ran intervals 4 × 800 m @ ~4:00/km (watered + goal 3 done). Long runs are Wednesdays now — don't read road-plan.json day labels.
- **AWAY (22 Nov, ~19:00) — off to: dinner.** Plan after: timed cold block of UNSEEN AC313 Final 2021 Qs until ~21:00, then last 30 min on today's misses (batch-level, materials quantity variance @ SP, reciprocal setup). Hard cut-off 21:30, his call.
  ASK ON RETURN: nothing — just start the 2021 block.
- Last here (22 Nov, from ~10:34) — full AC313 variance map covered today, 80% MCQ for the session (39/49), every miss retested clean same-day. Open scope question: is sessions 1–7 cumulative on tomorrow's AC313 final (Mon 23 Nov 09:00)? AC313 final is TOMORROW (Mon 23 Nov, 09:00, 40%) — Korn opened wanting a full AC311 day (not due till 28 Nov, 25%); Crow objected on exam proximity, he flipped to a full AC313 day instead. Built + deployed this session: the MCQ-always-format rule ([[feedback-mcq-format]]) and the MCQ percentage tube (pixel tube between the hoop and book pile, rolling % correct, [[reference-crow-room]]) — Room restarted mid-session to load it. Plan for today: MCQ block through the AC313 ghost-deck topics first, then a harder numeric block (raw numbers, he works it on paper, then reveals). AC311 Conceptual Framework drilling still stalled from 20 Nov (wanted on Notion, no connector yet); FN201 topic 9 + t8s6 still untouched.
- AC311 Midterm 2: DONE, 13 Nov, "easy shit." Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16) — worked both ways, went with the with-transfer version. **Next: AC311 final 28 Nov** (Conceptual Framework drilling still to come — summary doc built, his read-through pending).
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-22 (Sun, from 10:34 — ongoing)
- Opened wanting a full AC311 day, every topic, no passing without a full answer. Crow objected: AC313 final is tomorrow (40%), AC311 isn't due till 28 Nov (25%), and the graded Quiz 3 found 20 Nov was still undrilled. He flipped to a full AC313 day.
- Built the MCQ percentage tube (his spec: pixel tube, green fluid, between the hoop and the books, rises/falls with % correct) + `bin/mcq.py` log + reinforced the mcq-card format as an always-rule, no exceptions → [[feedback-mcq-format]], [[reference-crow-room]]. Tested clean on a throwaway server; real Room restarted mid-session to deploy it.
- First live mcq card went out as plain text by mistake (caught by him immediately, fixed same turn).
- Plan going forward today: AC313 ghost-deck topics in MCQ form first (the tube tracks it live, stays up for the rest of the block including the numeric phase), then harder numeric problems — raw numbers only, he works them on paper, then reveals for grading.

## Session — 2026-11-20 (Fri, from 11:24, restarted ~16:20 + ~18:44 + ~18:49)
- **Notion connector finally live this restart.** Built "FN201 Final — Conceptual Guide" as a sub-page under Pocket Procedures → [[reference-pocket-procedures]] — topics 6–10, conceptual layer only, pulled from the Final Map canvas; calc-heavy stuff stays in the ghost deck.
- Ghost 30 (AC313 product-sustaining activity) passed cold, box 2.
- **AC313 full re-test** (his call: the canvas's "green" wasn't earning it) — overhead/ABC, all 3 support-dept methods, standard-costing variances, mix/yield, all re-run with real exam numbers. Real gaps: benchmark-selection confusion (which hours/rate a variance uses) and a rounding-precision habit, NOT raw calc ability like the map implied. 8 ghost cards.
- **AC311 Investment Property fully mapped** — all 5 branches tested. Transfers + journal entries mostly solid (1 miss). **Subsequent measurement went 0/3** — the real weak branch, not transfers like the history implied. 5 more ghost cards.
- Built `study/AC311 Conceptual Framework - remaining topics.md` + a ChatGPT drill kit (`chatgpt/ac311-cf-drill-instructions.md` + an 18-question hard scenario bank) + wired the summary into the Room drawer (first non-claude.ai artifact, needed a small `server.mjs` MIME fix); ChatGPT drilling went badly ("being a fuckwit," his words) — switched to MCQ-in-Room instead, one question in. He now wants the CF material in his Pocket Procedures Notion page instead ("struggle with the conceptual part rn") — no Notion connector available either restart so far; offered a Google Doc as the live alternative, not yet built, hoping a 3rd restart picks up Notion access.
- Found/saved `AC313 Quiz 3 (graded, 2024+2025).pdf` (his own graded quiz, "basically like finals") → `~/Desktop/pastpapers/AC313/`. Deferred drilling from it, his call.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. AC313 final Mon 23 Nov 09:00 — **tomorrow.** AC311 final Sat 28 Nov.

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
- **Race 13 Dec:** venue unknown · bib pickup race-morning or in advance? (his dad likely knows) → [[project-training-plan]].
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: ✅ **FINISHED 24 Oct**, all fair game.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
