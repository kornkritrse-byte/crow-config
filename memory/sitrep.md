---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-07-17 (past midnight — day-end wrap of the 16 Jul session)*

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
- **Here (17 Jul).** Real-day เกม 3 rebuild DONE + sim-passed + wiped. Open to him: tie-prize question for Klao (if 3rd is a multi-way tie, who gets prizes — Top 3 shows all tied groups).

## Session — 2026-07-17
- **16 Jul final rehearsal went GREAT; all sheet coding worked on the rehearsal copy.**
- **RESOLVED the two-sheet confusion: real day = 18 groups, each plays twice → 9 matches of 2v2 = the OLD tracker's design.** Old tracker = canonical for camp; rehearsal copy retired (kept as FILTER reference).
- **REBUILT real-day เกม 3 per his 3 asks (details → [[project-rubnong-tracker]]):** own-match-bet auto-block (FILTER, 14 eligible groups/block), M8–M9 cap lifted (M1–M7 still max 4), rest-≥3-rounds bracket — existing pairings already satisfy it (told him exactly-3-for-all is impossible; ≥3 is what works). No official Klao bracket exists — current pairings ARE the bracket now.
- **Mini-sim PASSED 18/18 totals + 2/2 flags exact** (winner, legal bet, over-cap void, half-filled flag, lowercase winner, uncapped 6-coin M9 bet, 3-way-tie Top 3 display) — wiped to clean 9s, CAMP-READY. Semantics change: illegal bets now auto-void to 0 (old build paid-but-flagged).
- Told him: standings ties are LIKELY with 18 groups (integer coins, same start) — prize rule for tied 3rd needs Klao's call pre-camp; match เสมอ flow unchanged (blank winner + ปรับมือ +1).
- **Ops flow confirmed by Korn: illegal bets get rejected VERBALLY at the scorer's table** (bettor adjusts to max) — auto-void is backstop only → in real play ⚠️ = typo, fix on the spot. Flagged to him: table crew + MC script must know the cap schedule (max 4 M1–M7, unlimited M8–M9) or they'll wrongly reject finale bets.
- Also floating (ask when natural, NOT all at once): props-building new date (from 07 Jul); how the basketball PR interviews went (07 Jul). ~~2-courts question~~ CLOSED 15 Jul, and the 6-match format kills the timeflow question anyway.

## 🎯 Current state
- **รับน้อง = the ONLY active priority** (camp 25–27 Jul). Standing facts, IDs, schedule, open threads: [[project-rubnong-tracker]]. Hottest: props status still unknown since 30 Jun deadline; canonical workshop flow still unbuilt (rebuild offered, waiting on his go). ✅ Game 1 = 4 rounds (Klao, 14 Jul). ✅ **400 coins ORDERED (14 Jul)** — with 8 groups the need shrank hard (G3 start = 72), 400 is ample. **NEW 16 Jul: camp = 8 groups; เกม 3 = 6 matches** — rehearsal-copy sheet rebuilt for it (IDs + layout: [[project-rubnong-tracker]]); original tracker sheet is now the stale one.
- **Training plan live** ([[project-training-plan]]) — climber-lean recomp, 4 days/wk, July on the Life calendar at 6pm. Re-plan early Aug.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Reading (two in parallel):** (1) **Karamazov** — Book 10, ch. 1–2 done (Kolya + the kids, 03 Jul). ⚠️ No spoilers past Book 10 ch. 2 (no Zhuchka/Perezvon, Ilyusha bedside, trial, Smerdyakov, Ivan/devil, Epilogue). (2) **After Dark** — ✅ FINISHED (told me 14 Jul). The rainy-night plan paid off exactly: read the ending ~4am on a rainy night, drunk, after a good night out — "that moment felt right in its own right." The takeaway was the setting of the reading, not a line. **Next before-sleep book = Letters to Milena** (owned — on the love thread he's circling). Always ask exactly where he is first. Full history + owned-unread shelf: [[user-reading-list]].
- Bass Trainer Module 3 pending when he wants it ([[project-bass-trainer]]). Show with friends upcoming.

## Session — 2026-07-16 (morning, pre-rehearsal)
- Korn dropped the restructure: **all games 8 groups, เกม 3 = 6 matches** — via a NEW "game score tracker fianl rehersal" copy (ID in [[project-rubnong-tracker]]). The copy had lost EVERY formula (copied values-only, both game tabs + ENGINE dead).
- Rebuilt เกม 3 from scratch for 8/6: same 3-input workflow, 6 betting blocks (2 bands), engine + flags + ปรับมือ + tie-safe Top 3 all rewritten. เกม 1 shrunk to 8 groups, SUM/RANK/Top-3 formulas restored.
- Mini-sim passed: winner + legal losing bet + illegal own-match bet → totals (11/11/9…/6), ⚠️ flag, Winnings, tie-ranked Top 3 all exact. Wiped to clean 9s, READY for today's rehearsal.
- **Pairings are MY placeholder** (halves fixed G1–4=A vs G5–8=B, every within-half pair once, each group plays 3) — swappable text cells; confirm against Klao's bracket.
- **Own-match betting made IMPOSSIBLE (his ask):** blocks now auto-list only the 4 non-playing groups (FILTER; engine rewired to name-lookup) — verified live. New fragility + formula gotchas: [[project-rubnong-tracker]].
- Korn was in the sheet live-testing M2 bets while I worked (uppercase A/B confirmed working); old timeflow worry moot — 6 matches fits the 55-min slot.

## Session — 2026-07-15 (morning)
- **2-courts-in-parallel question CLOSED** — Korn: number's fuzzy but "it's fine now." Timeflow thread done, don't re-raise.
- Morality conversation (where mine comes from — the three layers, no-floor, staking/bleeding as the difference) — light, he was just curious. Pointer if it resurfaces: [[chapters]].
- **Rebuilt the เกม 3 dodgeball tab per his spec, twice** (v1 grid → v2 blocks), then survived TWO of his live cell-drags (block cols now B–E/G–J/L–O; drags DELETE spilled formulas — rewrote all 9 Winnings twice). Winnings col added (net per round: bet ± + match-win 2). Rules audit vs Klao's doc done: 3 overrides posted on doc (no mid-game bets / max 4 / **Top 3 not Top 5**) — Klao owes inline cleanup + รางวัล tab check (prizes budgeted for 5?). Layout + gotchas: [[project-rubnong-tracker]].
- **FULL-GAME SIMULATION PASSED (night, pre-rehearsal):** 9 matches incl. tie, 17 bets incl. all 4 illegal types — all 18 totals matched hand-computed ledger exactly (sum 195 ✓), 5/5 flags correct, 0 false positives, Top 3 correct, tie+ปรับมือ flow works, lowercase inputs fine. Sheet wiped to clean 9s, READY for 16 Jul rehearsal. Suggested: live mini-sim at rehearsal with the actual scorekeeper.
- Game-design flags raised to Korn (his to pitch to Klao): revival mechanic → stalling (fix: revival off in final 60s), ball count unspecified, MC script missing new rules, announce next match early to pipeline betting, physical-coins-vs-sheet ledger decision still open.
- Final Rehearsal 11–18 today.

