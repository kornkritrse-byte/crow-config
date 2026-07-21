---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-07-19 (in-session)*

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
- **Here (21 Jul).** เกม 3 win reward changed +2 → +8 on the CAMP sheet + full sim re-passed + wiped clean ([[project-rubnong-tracker]]). Waiting on his next move.
- **Ruleset LOCKED (21 Jul): win +8, bets min 1 / max 4 on M1–M7, ALL-IN on M8–M9.** Token supply: corrected my error — betting is even-money-vs-house (injects tokens when lopsided), so all-in M8/M9 could blow past 400. **Resolved:** the last 2 rounds run DIGITAL/sheet-only → 400 physical is enough. Details + scorekeeper note in [[project-rubnong-tracker]].
- Floating (when natural, not all at once): Klao handoff msg (tie-prize + MC cap line) — asked 18 Jul, no answer; เพื่อน audio bought on iTunes? (edit blocker); props status (since 30 Jun); `03f_elevator_phones` beat confirm; 20 Jul classroom shoot done?
- **Venue thread PARKED by Korn ("not our responsibility") — don't re-raise unless he does.** If it resurfaces: specs verified + the one open action (written full-hall confirmation) live in [[project-rubnong-tracker]].

## Session — 2026-07-21
- **เกม 3 win reward +2 → +8 on the CAMP sheet** (`1OyGQ…`, not the rehearsal copy) — his design goal: make winning a match outweigh good betting. Walked the math first (why bumping reward alone can't beat betting's 7-bet ceiling; landed on flat 8).
- **Couldn't read formulas via the google-docs MCP** (returns computed values even under FORMULA render — tested & confirmed). Rebuilt coin-total K8:K25 fresh from a functional probe, updated H display + B3 rules text to +8. Full 9-match sim RE-PASSED (18/18 exact, >4 auto-void+flag, ปรับมือ, tie-safe Top 3), wiped clean. Details → [[project-rubnong-tracker]].
- **Tokens:** peak ≈ 306 (162 base + 144 win bonuses); the 400 ordered still covers it. Manual chores still his: freeze panes, paint inputs yellow, hide ENGINE.

## Session — 2026-07-19
- **Built the 21 Jul rehearsal sheet on his ask ("game score tracker final rehearsal 21 Jul", ID in [[project-rubnong-tracker]]):** copy of the 16 Jul sheet; discovered the SOURCE had been flattened to values after the rehearsal → full formula rebuild (เกม 1 + เกม 3 + ENGINE).
- **His rule change built in: เกม 3 cap = max 4 for M1–M4 only, M5–M6 ALL-IN allowed;** self-betting still impossible all game (FILTER blocks). Mini-sim passed (all-in 9 paid, 5-on-M1 voided+flagged, half-fill flagged), wiped to clean 9s.
- **Rest question → pod bracket FINAL** (G1–4 odd matches, G5–8 even; every group exactly 1 match rest = max possible). Korn: brackets are Korn+Crow's, not Klao's. Still his manual chores: freeze panes, paint inputs yellow, hide ENGINE.

## Session — 2026-07-18 (morning)
- Riverside upload landed → all 13 clips inventoried + renamed into beat order: 06a/06b (bench + letter closeup), 07a (river confession), rest = montage alt takes; dup of 03d parked as `zzz_…` for him to delete; `03f_elevator_phones` beat unconfirmed ([[project-scene5-flashback]]).
- 06b letter closeup (vertical) → two 16:9 renders delivered (PANCROP recommended, BLURPAD fallback), verified on the ELSA-drawing reveal.
- เพื่อน (Polycat) download request → declined the rip, pointed to iTunes Store purchase (256k AAC, ~29฿) + same route for Let It Go; purchase not yet confirmed.

## 🎯 Current state
- **รับน้อง = the ONLY active priority** (camp 25–27 Jul). Standing facts, IDs, schedule, open threads: [[project-rubnong-tracker]]. Hottest: props status still unknown since 30 Jun deadline; canonical workshop flow still unbuilt (rebuild offered, waiting on his go). ✅ Game 1 = 4 rounds. ✅ 400 coins ordered — ample for real day (G3 start 162, sim peak ~195). ✅ **เกม 3 real day = 18 groups / 9 matches 2v2 on the OLD tracker — rebuilt + sim-passed 17 Jul, CAMP-READY** (rehearsal copy = retired 8/6 variant).
- **Scene 5 flashback video ACTIVE ([[project-scene5-flashback]])** — editing starts 18 Jul (montage beats fully shot + prepped); shoots 20 Jul (classroom) + 23 Jul 15:00 (everything else, shot order in the project file); cut deadline 23–24. Audio still needed: เพลงเพื่อน + Let It Go.
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


