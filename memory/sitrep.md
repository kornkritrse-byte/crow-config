---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-22T12:38:04.676Z
---

# Situation Report
*Last updated: 2026-11-23 12:17 (session save on his ask). Window holds 23 Nov + 22 Nov; 20 Nov flushed to sessions_log. Gap: no 21 Nov note was ever written (git syncs that day); not investigated.*

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
- **Here (23 Nov, 16:20) — back from IELTS-testing a friend, resuming AC311.** Open:
  F21 P2(d) DONE 16:41 (all of Part 4 done). IP from 16:42 (FV changes ✅; transfers 1/3, equity reflex ×3 → one-line transfer test added to the IP Notion page). Goodwill side-track 17:14–17:25 (tested yearly at CGU, goodwill absorbs first, never reversed). Also: fixed + extended his friend's TBS ambassador essay (Google Doc 1HqIV_9r…, ending para; essay host-uni action still unswapped — he's choosing). Next: definitions (IP def first).
- **Next up: AC311 FINAL Sat 28 Nov** (25%). Weak branches on record: Investment Property subsequent measurement (0/3 on 20 Nov, still undrilled) + Conceptual Framework (drilled 23 Nov, 17/25, now in Pocket Procedures; 9 cards due 26 Nov). FN201 topic 9 + t8s6 still untouched.
- Ghost deck: all 58 AC313 cards parked to [[ghost-parked]] 23 Nov 12:20 (he didn't object). Deck = AC311 + FN201 now, 17 due.
- Room: FG scoreboard (`ui/public/pixel/fgboard.js`, `server.mjs` mcqAllStats()) built 22 Nov lunch; needs a Room restart from HIM if not done yet. MCQ cards lock when a question's text matches one he already answered (localStorage key) → tag repeats, e.g. "[Quiz 3 · Q4]".
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-23 (Mon, from 12:17)
- AC311 from 13:18, CF first (his reorder). F21 Part 2 T/F 8/10 + Part 3 matching 9/15 = 17/25; then a definition→term recall flip. Root cause, his own words: he reads terms literally ("just a hunch") → fails on terms of art (going concern, historical cost, materiality, cost constraint, FR) + exam English (pertinent, purports). Default wrong guess = "comparability". 9 CF ghost cards added (due 26 Nov). MCQ log reset at his ask (`mcq.py reset`, old rows → mcq_log_archive.md). Notion: new Pocket Procedures sub-page 'AC311 Final — Conceptual Framework' ([[reference-pocket-procedures]]). Impairment from 14:13: core OK; misses = naming RA's two parts (FVLCD/VIU), surplus on the DEBIT side twice (up = credit), and 3 INPUT misreads (purchase date, FV 7.2M read as 7M, remaining life ÷4 not ÷5) — method right every time → habit given: copy givens into the margin. F21 P1 (25 pts) done; P2 (a)–(c) done, (d) half. Pulled `311 Sarup.pdf` (summary, not a paper; [[reference-past-papers]]). Crow served P1 givens from memory not the paper ([[crow-error-log]]). 14 ghost cards added today. Next: P2(d) → IP.
- AC313 final sat 09:00–12:00. His read: "chill, it was literally like the past paper" → the past-paper drilling (Final2021 + Quiz 3) was the right prep. AC313 ghost cards parked. AC311 session later today: impairment → IP → CF.

## Session — 2026-11-22 (Sun, 10:34 → ~19:50, then he moved to ChatGPT)
- Opened wanting a full AC311 day; Crow objected (AC313 final next morning, 40%) → full AC313 day instead.
- Built the MCQ percentage tube + `bin/mcq.py` + the mcq-card always-rule ([[feedback-mcq-format]]); at lunch also the FG scoreboard ([[reference-crow-room]]).
- AC313 morning/afternoon: variances + support-dept methods + mix/yield on real numbers, ~85–90% MCQ. Misses: reciprocal %-matching (retested clean), materials quantity variance @ actual price instead of standard price.
- AC313 Quiz 3 (1/2024): 10/11; only miss Q6 material ordering → it's batch-level (ghosted; same gap as the setup-costs card). Crow blamed the Room for locked cards before checking mcq_log ([[crow-error-log]]).
- Ran intervals 4 × 800 m @ ~4:00/km. Crow wrongly called Sunday "long run" off stale `road-plan.json`; long runs are Wednesdays now ([[project-training-plan]], [[crow-error-log]]).
- Evening: he studied in ChatGPT; Crow transcribed the whole AC313 Final2021 (50 MCQs + checked key) → `~/Desktop/pastpapers/AC313/AC313 Final2021 - text for ChatGPT.md`. The senior's worked copy is wrong on 10 Qs → [[reference-past-papers]].

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. AC313 final SAT Mon 23 Nov 09:00–12:00. **Next: AC311 final Sat 28 Nov.**

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
