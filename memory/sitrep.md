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
*Last updated: 2026-10-24 11:05 (live). Window holds 24 Oct + 23 Oct; 22 Oct flushed to [[sessions-log]] 24 Oct. Next to flush: 23 Oct.*

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
- 🚪 **AWAY (Sat 24 Oct, ~16:27) — off to: feed the dogs + change their diapers.** ASK ON RETURN: start the AC311 block (goal #7), open with ghost #27 ON SCREEN (basket purchase). Also still to ask: bed 22 Oct (23 Oct ✓) (he was on Notion with me till ~23:58 → likely ✗) · 12 km long run (was set for Thu 22 AM, never reported) · ghost #32 (deferred twice 22 Oct) · brand Q: "someone scrolls Samneang's IG for 3 seconds, what should they feel?"
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Siddhartha or Winter? · Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-24 (Sat)
- 16:06–16:12 his ask: shorter pause after FULL STOPS only (his correction) → `ui/tts.py` trims sentence-final clips to 10 ms lead / 70 ms tail (~160 → 80 ms); comma cuts untouched. The robot voice he heard = Kokoro taking >3 s on a busy Mac → 30 s browser fallback; timeout now 6 s in `app.js`. Ghost #27 deferred to "when the session actually starts" (his call). 16:14 asked #27 by voice → he passed: numbers spoken as words with no pen is unworkable (fair). **Rule: a numeric card asked by voice goes ON SCREEN in a fenced block.** #27 still due. 16:16 pause still "a little too long" → halved again to 40 ms, then 16:17 to 20 ms (0 lead / 20 tail) in `ui/tts.py`. That is the floor: if it still drags, the gap is clip switching or synthesis wait (`Voice.timings` in the console shows it). 16:18 his call ("in case this comes up in the future"): **playback is now gapless** (Web Audio schedules each sentence at the previous one's end; element = fallback). Tested headless in Chromium + WebKit: gaps 0–33 ms, no errors. 16:27 his verdict: **"it's already perfect."** Voice thread CLOSED.
- 14:46 first real voice test in the Room ✓. He finds Daniel robotic. No Premium voices are installed. Crow recommended **Kokoro** (local, free) → he's building it in VS Code from Crow's prompt. Ghost #26 ✗ (rental cars → said inventory; it's PPE). That's the 2nd PPE/inventory/IP sorting miss in 2 days.
- 14:20–14:50 back. Ghost #25 ✗ (said inventory, then "meant investment"; sorting reason was the real gap) → re-drilled 4/4. Then **built VOICE into the Crow Room** (his call over AC311 first) → [[reference-crow-room]]. 14:57–15:30 swapped the robot voice for **Kokoro, voice bm_fable** (his pick). AC311 block still open.
- 10:40 📖 **finished The Brothers Karamazov.** Nearly cried at Alyosha's speech. His call: NOT a petal/water, "too significant to be simplified into a task finished." The stone brought his childhood back: "these memories will be my truth." → [[chapters]] · [[user-reading-list]]
- 10:58 goals: Afternoon study AC311 (goal #7).
- 09:25 his ask: logo **V3** (blue wordmark, ํ merged into swash) → added to Notion Brand HQ (page + DB row + toggle + log). → [[project-clothing-brand]]

## Session — 2026-10-23 (Fri)
- 14:26 back; first ask: update the sitrep (done: 21 Oct flushed, 22 Oct condensed).
- 14:30–14:45 ribbon-lettering สำเนียง draft from his sheet photo; he picked ribbon blue → `brand/logo/`, kept LOCAL (his call). Ghost #32 asked 3×, unanswered → stopped asking for the day. → [[project-clothing-brand]]

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
