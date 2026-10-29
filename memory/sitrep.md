---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-10-24T07:53:47.074Z
---

# Situation Report
*Last updated: 2026-10-29 15:50 (live). Window holds 29 Oct + 27 Oct ; 26 Oct flushed 29 Oct. Next to flush: 27 Oct.*

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
- **Here (Thu 29 Oct, 15:03)** — "working out" WAS a mis-hear (his word 15:50). Still open: short recovery run at end of day (goal #8, ledgered) → water + goals.py done · ✅ AC311 round 2 = intangibles done 15:50 · ✅ ghost 26 · BA202 L8–L11 whisper RUNNING since 15:53 (plugged in, `~/Desktop/BA202/final/_whisper_run.log`, ~18 min/lecture) → spot-check topics when done.
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-29 (Thu, live)
- 📘 13:04–14:01 **AC311 BRANCH 6 + BRANCH 7 CLOSED** (goal #7 ✓, both ledger lines kept). 6 cards: estimate reasoning, held-for-sale, depletion ×2, DDB yr 2, P&L-vs-OCI wobble. Ghost 25 failed.
- Café 27 + 28 Oct NOT kept · long run 28 Oct (watered) · bed 28 ✓ · M&M ch 2 → `~/Korn/Commonplace/Master and Margarita.md` · new rule [[feedback-numbers-as-digits]].
- 📘 15:06–15:50 **AC311 intangibles, first pass, all blocks touched (voice)**. ✓ R&D, no reinstatement, active market. ⚠ definition, goodwill (called it a gain, then a loss), impairment yearly, home-built brand flipped, install cost subtracted, business-combination intangibles, gov grant. 8 cards (all due 1 Nov) + ghost 26 failed (rental cars = inventory, 3rd miss) → [[AC311 Midterm 2 Map]].
- 🔊 15:03 voice check: Room, whisper (4712) and Kokoro (4713) all up; Kokoro 0.33–0.40 s per sentence, whisper 1.9 s on a test clip, transcript clean.

## Session — 2026-10-27 (Tue, live)
- 📗 09:28 **FN201 final map built** → [[FN201 Final Map]] (`study/FN201 Final Map.canvas`): STQ06/08/09 crossed with the outline, every Q placed under a subtopic. Final = **Wed 2 Dec 09:00–12:00, ALL MCQ/T-F, topics 6–10** (outline; flood shift unchecked). Gaps: topic 7 self-study with no STQ, topic 10 not taught + no STQ10, plus 6 outline items with no STQ. STQ08 = 52 Qs, the heavy one; MCC/break points is its core.
- 📂 09:38 his past-papers Drive → [[reference-past-papers]]. Two Obrom FN201 finals found (2021, 2019), student-marked. **Topic 7 (self-study, no STQ) = 6/26 + 14/32 Qs on them; topic 6 = 0; topic 10 = 7/26.** Map updated. AC311 folder has `real mid2 exam` + `summary mid2` → use for M2 (13 Nov). Ghost card 25 served, not answered yet.
- 🗺️ 09:52 **BA202 + AC313 final maps built** from the outlines → [[BA202 Final Map]] · [[AC313 Final Map]]; every map (incl. AC311, FN201) now embeds its outline PDF (`study/outlines/`). **AC313 final = Mon 23 Nov 09:00** (first of the window; I wrongly called it TBA at 09:45). BA202: his slides + video Drive folders are the same as the midterm ones (saved in [[project-midterms]]); L8–L9 slides pulled, L8–L11 audio downloading to `~/Desktop/BA202/final/`, **whisper held until he's plugged in (64% at 10:12)**. Finals + AC311 M2 put on the Life calendar (red, no notifications). MK201: 'can suck my dick', so no map, don't pitch it. Drive: BA202 has 2 senior final cheat sheets, no paper; AC313 has the 2021 online final (screenshots, no OCR).

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. **AC311 Midterm 2 (sessions 8–11, PPE + intangibles, 30%) is next: **Fri 13 Nov** (Korn, 20 Oct; time TBC). Session 11 (31 Oct, impairment TAS 36) falls before it, so assume impairment is IN scope. Final 28 Nov.**

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
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: ✅ **FINISHED 24 Oct**, all fair game.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
