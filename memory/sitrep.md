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
*Last updated: 2026-10-19 07:58 (live). Window holds 19 Oct + 18 Oct; 17 Oct flushed to [[sessions-log]] 19 Oct. Next to flush: 18 Oct.*

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
- 🚪 **AWAY (Mon 19 Oct, ~07:57) — off to: morning stuff, then AC311 session 2 (from 'issue shares'). ASK ON RETURN: AC311 M2 date · bed by 23:30 on 18 Oct.** Tonight: home strength (long run rained out, dropped this week). Patrick interview prompt ready (`brand/Core interview prompt.md`), not sent yet.
  - Also still open (low-stakes): Siddhartha or Winter? · Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-20 (Tue)
- 07:42, driving to uni: Crow wrote 10 hard class questions for the MK201 วิ่งแลกแว่น presentation; his own pick: "can a small brand sustain this as long as a big one?" (sharpened + model answer ready). 10:31 goals set (AC313 quiz · Patrick brand talk · evening run w/ school kid · finish Karamazov). 19 Oct: AC311 s2 partial [~], home strength MISSED [-] (2nd in a row), bed ✓. AC311 M2 = Fri 13 Nov. AC313 quiz due today.

## Session — 2026-10-19 (Mon)
- 05:30 long run rained out (ledger [~]); up at 05:30 ✓. Crow: drop it this week, home strength tonight.
- Brand: blind ChatGPT interview prompt for Patrick (15 Qs, v3) → `brand/Core interview prompt.md`; explained how a clothing site works (sample → photos → IG/LINE → website). Goal: AC311 study (ledger).
- 14:47: he named it himself, drifted into procrastination; AC311 not started. Crow started it in the Room (issue shares, s22). Home strength tonight → ledger.

## Session — 2026-10-18 (Sun)
- 13:16: strength skipped last night (ledger [-]), ran 30′ @ 5:30. Called today a rest day, but the plan had Long 10 km today → he MOVED it to Mon 19 AM (lift Mon PM, easy 35′ dropped). Bed 17 Oct ✓.
- MK201 10% group presentation (วิ่งแลกแว่น, 8 slides/10 min): Crow critiqued the outline (slide 5 → name Kotler Ch 3/5/7/8, slide 7 needs evidence). **His part: slide 4 "Why did eyewear brands join the trend?"** → sketched.

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
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: safe through **Book 12 ch 10**, **no verdict, no Epilogue**.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
