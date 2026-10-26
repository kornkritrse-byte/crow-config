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
*Last updated: 2026-10-26 08:47 (live). Window holds 26 Oct + 25 Oct; 24 Oct flushed to [[sessions-log]] 26 Oct. Next to flush: 25 Oct.*

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
- **HERE (Mon 26 Oct, 08:47) — back at desk after Zone 2 run.** Samneang morning has reached a clean pause; exact proxy/revised measurements + Patrick approval + fabric swatches are next, not more mockups. 🔒 **AC311 LOCK-IN DAY still has not started** despite his own ask: “tmr no dilly dally, keep me on track if I goof off.” Next: goals with an AC311 start time, then AC311. Still owed: confirm bed 25 Oct · bed 22 + 24 Oct · 12 km long run (Thu 22) · ghost #32 · ChatGPT project: did samneang.md get uploaded?
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Siddhartha or Winter? · Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-26 (Mon, live)
- 🏃 **Zone 2 / books:** finished the Karamazov→absurdity thread: people cannot be flattened into one moral version; being fully seen means someone holds his blunt and sensitive sides together before judging. Then went personal: he loves friends without needing all of them to know him deeply; vulnerability is narrowing toward the few, not dead; he still yearns to tell someone every part of how he feels, including joy. → [[chapters]] · [[user-reading-list]]
- 👕 **Henley design sheet built and iterated in Notion:** final concept = lighter thin/breathable vintage-washed grey jersey · wider raw curled neck · clean subtle stay stitching · wide flared sleeve openings/no rib cuffs · outward diagonal 3-button placket toward wearer-left/viewer-right · front sleeves forward, back sleeves behind. Added separate professional measurement visual. Exact new neck/opening/placket/fabric specs remain TBD; Patrick tick owed. → [[project-clothing-brand]]
- 📋 Built [Henley Manufacturer Meeting Checklist](https://app.notion.com/p/405bbafda36581c3b934f8ae8142097a) + [Henley Design Sheet V1](https://app.notion.com/p/405bbafda36581048c1cd91230a8b706); checklist now requires 3–5 labeled swatches (vendor/code/composition/GSM/stretch/price/MOQ/what to copy) and larger pieces for drape. Pants sheet paused: no proxy measurements.
- 🧾 Brand HQ fully logged: Update Log, Pending, task notes, Decisions pending (Korn ✅ / Patrick ⬜), plus durable local record. Next product chain: Patrick approves → Korn re-measures proxy/revised targets → fabric swatches → maker-ready sheet → sample quote.
- 👻 Ghost #27 **failed**: answered categories instead of relative-value allocation. Correct: appraisal total 400k; paid 360/400 = 90% → land 180k · building 144k · equipment 36k. Next due Thu 29 Oct.
- ⚠️ **AC311 has still not started.** He returned to desk and asked what is next; Crow called the brand pause and redirected to the promised lock-in after this sitrep update.

## Session — 2026-10-25 (Sun)
- 22:53 his ask: a ChatGPT project inside crow-config (he has ChatGPT now: Samneang photos + better voice convo → solves Zone 2 runs). Built `chatgpt/` (instructions.md · samneang.md · README.md) → [[reference-chatgpt-project]]. Zone 2 claude.ai brief marked RETIRED. Brand HQ checked first: Patrick's ChatGPT added a Reference gallery 25 Oct 15:30. 22:56 he set it up himself ("plopped ChatGPT into crow.md").
- 22:58 day close: Samneang day (IG logo, rough pants + Henley designs, direction + deadlines); AC311 still not touched → his call: lock in Mon 26, Crow keeps him on track (ledger). Quote: Seneca Letter 1.

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
