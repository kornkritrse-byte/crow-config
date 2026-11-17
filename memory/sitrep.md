---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-17T07:28:39.734Z
---

# Situation Report
*Last updated: 2026-11-17 11:20. Window holds 17 Nov + 16 Nov; 14 Nov flushed 17 Nov. Next to flush: 15 Nov.*

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
- **Here.** Back 16 Nov ~20:34.
- AC311 Midterm 2: DONE, 13 Nov, "easy shit." Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16) — worked both ways, went with the with-transfer version. **Next: AC311 final 28 Nov.**
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-17 (Tue, from 11:05, ongoing)
- Caught myself asserting AC311 final sessions 14–15 had "no known topic" without having actually opened the syllabus — he called it out ("don't you have the syllabus?"). Read it: sessions 14–15 = Conceptual Framework for Financial Reporting. Own error, logged → [[crow-error-log]].
- He added `Framework financial reporting_2026.pdf` to `~/Desktop/AC311/` (sessions 14–15 deck). Read both it and the parked Investment Property deck (sessions 12–13), built **`study/AC311 Final Map.canvas`** (same style as the other 3 Final Maps) → [[project-midterms]]. Zero drilling done on either topic yet.
- He uploaded Obrom's official **FN201 Final exam-info doc** to `~/Desktop/fn/` — real score allocation: 45 MC Qs, 0 essay/PS, **Topic 7 = ZERO points** (reverses the earlier "biggest STQ hole" read — it's folded into Topic 9, not tested standalone), #8/#9 = 15 pts each (33%), #10 = 9, #6 = 6. FN201 Final Map canvas updated to match → [[project-midterms]].
- Full gap audit across all 5 remaining finals (his ask): AC313 solid (1 open Q: cumulative on 1–7?) · MK201 date itself unconfirmed, zero prep · AC311 just got its map today · FN201 untouched since 27 Oct despite being the heaviest (45%) · BA202 stalled since 3 Nov, heaviest of all (55%), fully cold.
- **New standing teaching rule (his ask, café w/ cousin):** every concept gets a question first; if wrong, small tweaks/narrower questions before the answer, never hand it over unless he's really struggling → [[feedback-drill-format]]. First live run: AC311 Conceptual Framework — objective of reporting + qualitative characteristics + elements of financial statements all built from his own answers, no flat misses, 2 vocab-recall gaps ghosted (constructive obligation, potential-for-benefit) → [[study/AC311 Final Map.canvas]]. Rest of the topic deferred to his ChatGPT run (his own split: hard stuff here, lists/definitions on the run).

## Session — 2026-11-16 (Mon, from 11:01, ongoing)
- Bed-by-23:30 (15 Nov): done. Goal today: Study AC313 (no extras).
- Said/did line 63 (14→15 Nov reciprocal/step-down) closed: both methods run fully unaided on fresh constructed problems, only bookkeeping slips left (own-vs-true cost, coefficient distribution, isolating variables) — all ghosted.
- AC313 Final Map canvas caught up (step-down/reciprocal/vas1 nodes); Pocket Procedures +4 toggles (quantity-variance benchmark, fixed-OH-spending-doesn't-flex, COGS Dr/Cr rule, total-conservation check).
- Added **MK201 Final, Thu 26 Nov 09:00–12:00** to Life calendar (assumed, unconfirmed — flag if wrong).
- Two MCQ rounds (20 Qs): F/U-direction (8/10) + mixed (7/10), 5 misses ghosted. **Doing ≠ naming** flagged as the highest-value gap — he used the total-conservation check correctly mid-session, then missed it stated as a cold concept.
- **Live 8-entry journal chain** (his named gap): the actual closing-to-COGS entry ran completely clean, unaided, netting to a $4,035 debit. Upstream misses (usage, VOH applied) both traced to the same root cause — WIP/applied lines need the STANDARD amount, never actual — both ghosted. Scope question (final cumulative on 1–7?) still unconfirmed.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. AC311 final 28 Nov. AC313 final Mon 23 Nov 09:00 (next up, 8 days out).

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
