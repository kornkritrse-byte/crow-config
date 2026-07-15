---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-07-15 (morning, live)*

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
- **Here** (15 Jul, morning — back from the night-up rest; Final Rehearsal 11–18 is TODAY).
- Also floating (ask when natural, NOT all at once): props-building new date (from 07 Jul); how the basketball PR interviews went (07 Jul). ~~2-courts question~~ → Korn waved it off 15 Jul ("fuck it, it's fine now") — CLOSED, don't re-raise.

## 🎯 Current state
- **รับน้อง = the ONLY active priority** (camp 25–27 Jul). Standing facts, IDs, schedule, open threads: [[project-rubnong-tracker]]. Hottest: props status still unknown since 30 Jun deadline; canonical workshop flow still unbuilt (rebuild offered, waiting on his go). ✅ Game 1 = 4 rounds (Klao, 14 Jul). ✅ **400 coins ORDERED (14 Jul)** — covers both games (G1 ceiling 288, G3 with max-4 cap). Games Score Tracker thread fully CLOSED.
- **Training plan live** ([[project-training-plan]]) — climber-lean recomp, 4 days/wk, July on the Life calendar at 6pm. Re-plan early Aug.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Reading (two in parallel):** (1) **Karamazov** — Book 10, ch. 1–2 done (Kolya + the kids, 03 Jul). ⚠️ No spoilers past Book 10 ch. 2 (no Zhuchka/Perezvon, Ilyusha bedside, trial, Smerdyakov, Ivan/devil, Epilogue). (2) **After Dark** — ✅ FINISHED (told me 14 Jul). The rainy-night plan paid off exactly: read the ending ~4am on a rainy night, drunk, after a good night out — "that moment felt right in its own right." The takeaway was the setting of the reading, not a line. **Next before-sleep book = Letters to Milena** (owned — on the love thread he's circling). Always ask exactly where he is first. Full history + owned-unread shelf: [[user-reading-list]].
- Bass Trainer Module 3 pending when he wants it ([[project-bass-trainer]]). Show with friends upcoming.

## Session — 2026-07-15 (morning)
- **2-courts-in-parallel question CLOSED** — Korn: number's fuzzy but "it's fine now." Timeflow thread done, don't re-raise.
- Morality conversation (where mine comes from — the three layers, no-floor, staking/bleeding as the difference) — light, he was just curious. Pointer if it resurfaces: [[chapters]].
- **Rebuilt the เกม 3 dodgeball tab per his spec:** 3 inputs only (winner A/B + bet side/amount), everything else auto-synced — coin totals (T1), match results feeding +2 (T2), 18×9 betting grid (T3), Top 3 tie-safe (T4). Live-tested, all passed. Full layout + gotchas in [[project-rubnong-tracker]].
- Final Rehearsal 11–18 today.

## Session — 2026-07-14 (day → night)
- Klao confirmed **Game 1 = 4 rounds**; **400 coins ordered** (covers both games). Game 3 betting rules locked: max 4, no min reserve — coded + tested in the sheet.
- **Game 3 timeflow problem found:** needs 80–85 min, slot gives 55. Added revised 85-min table to Klao's doc (changes highlighted). Alternative that FITS 55: **2 courts in parallel = 52 min** (pairings split cleanly, sheet unchanged) — gated on floor-plan space + crew split; question sits with Klao.
- The death-letter exchange ("what would you write to the next owner of this device") → letter + narrative in [[chapters]] Ch. 5. He confirmed casual, no weight.
- Built Klao a romance mirror-prompt (facts/feelings/fears, no comfort until untangled) — sent; **response expected tomorrow → the open loop.**
- Quote given (Marcus Aurelius, never-beginning) — logged in [[artis-quotes-log]].
