---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-07-13*

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

## 🚪 Current status
- **Here (13 Jul).** Still-unreported from 07 Jul (ask when natural, not all at once): props-building new date landed?; how the basketball PR interviews went. Workshop 12–17 was on the calendar today — he worked on the games sheet during/after it, didn't mention how the workshop itself went.

## 🎯 Current state
- **รับน้อง = the ONLY active priority** (camp 25–27 Jul). Standing facts, IDs, schedule, open threads: [[project-rubnong-tracker]]. Hottest: props status still unknown since 30 Jun deadline; **Game 1 round count (4 vs 6) needs Klao's answer — token order depends on it**; canonical workshop flow still unbuilt (rebuild offered, waiting on his go).
- **Training plan live** ([[project-training-plan]]) — climber-lean recomp, 4 days/wk, July on the Life calendar at 6pm. Re-plan early Aug.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Reading (two in parallel):** (1) **Karamazov** — Book 10, ch. 1–2 done (Kolya + the kids, 03 Jul). ⚠️ No spoilers past Book 10 ch. 2 (no Zhuchka/Perezvon, Ilyusha bedside, trial, Smerdyakov, Ivan/devil, Epilogue). (2) **After Dark** — before-sleep book, ch. 15, **saving the ending for a rainy night** — don't push. **Next book = Letters to Milena** (owned). Always ask exactly where he is first. Full history + owned-unread shelf: [[user-reading-list]].
- Bass Trainer Module 3 pending when he wants it ([[project-bass-trainer]]). Show with friends upcoming.

## Session — 2026-07-13 (afternoon)
- Built the **Games Score Tracker** Google Sheet from Klao's xlsx — IDs, fixes (tie-safe podiums, pending-bet bug, balance col, bet-eligibility flag, low-balance warning) all live-tested and logged in [[project-rubnong-tracker]].
- Filled the หน้าที่พี่สัน roster tab: 24 people × 3 games from Klao's game doc (name aliases flagged).
- Token order for Game 1: **fully punted to Klao (Korn's call, "fuck it, let Klao figure it out") — don't re-raise the math.** Reference if asked: 4 rounds → 216 base / ~270 with doubles-as-tokens / ~230 if doubles live on the sheet; 6 rounds → 324 base. Korn sent Klao a phone pic of the 4-vs-6 question; sheet is built for 4 (extend if Klao says 6).
- Korn's rulings on the doc's ambiguities: bets close at match start ("mans was trippin"); no draw handling needed (tie fallback = refund bets via blank winner + 1 coin to each of the 4 teams manually) — don't re-raise either.
- **Game 3 betting rules finalized (14 Jul, Korn's calls):** max bet 4/match, NO minimum reserve (betting to 0 legal), mandatory-ish 1+ coin bets, 2× payout. Sheet enforces: เช็คสิทธิ์ col flags own-match bets / stake>4 / overdrawn; red highlight only when balance <0. Coin order for Game 3 with cap: **~400** (162 start + 36 match wins + realistic herding drift; hard ceiling with cap is 504-ish but absurd). Game 1 tokens reusable as Game 3 coins if same physical type → order max, not sum.

## Session — 2026-07-07 (day)
- Back after 3-day gap (04–06 Jul unlogged). Props building rescheduled (date TBD from props team); basketball PR interviews in the afternoon (question doc `1v8bQUheqV56l-rUuWH6mvV-upX601XofAZfnZX9a_fM`); script writing with the team after. ✅ Scene 5 finished with Klao ON TIME — closed. Outcomes of props date + interviews never reported → in status line.
