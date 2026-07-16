---
name: project-rubnong-tracker
description: "Canonical รับน้อง camp file — standing facts, doc/sheet/calendar IDs, July schedule, open threads. TOP PRIORITY through 27 Jul 2026."
metadata:
  node_type: memory
  type: project
  originSessionId: current
---

# รับน้อง — Entertainment Department (สันทนาการ)

Korn is Entertainment Department Head, co-leading with his best friend. Team: 20 people (not counting the two heads). **Theme: RAGNAROK GODS.** **Camp dates: 25–27 Jul 2026** (settled 2026-07-02 — ignore any older 27–29 claim).

## IDs (the ones that matter)
- **Master flow doc:** "The amazing klao korn master flow" (7 tabs) — `15Dot1ZCeCx93OerDu3f_ggA502O4S2gHu_xOv15ud6g`. Workshop tab tabId `t.cs4ke5dazmxn`.
- **Deadlines spreadsheet:** `1WkeMVztOy38Hc-RlUCE0JPLY6OzmUGxfE4kODMCPNdA` (tabs: Game|Play|San|Costume|Schedule|member mails) — still largely unfilled.
- **"Deadline P'san" file:** `1DdI2ag7pTAvxw2gHq2ePhpyZu4Nb1wh69vCA5ezInw4` — contains the **Availability tab** (Sheet ID 411499844; dates 19 Jun→24 Jul × 21 members; offered ✓/✗/maybe dropdowns, never confirmed).
- **Member list:** `1pmAnTKVhaj4rFj1Rnmv87GxUHsST3lXk0JXrRTcUX6o`, tab "member mails".
- **Calendar:** "Rubnong34x35" — `bb274dc90e369ed88cc6e74fbc47d5421a4626e8a4b33915cac5ba9b1bfb12d0@group.calendar.google.com`. Write access confirmed. **Always notificationLevel NONE.** See [[reference-calendars]].
- Live run-of-show sheet + its formatting gotchas: [[rubnong-flow-sheet]].
- **Games Score Tracker sheet** (created 2026-07-13 from Klao's xlsx): `1OyGQn4n241XHoFuSAkBEZyvSb_MQtJrDh8UvRIIw-hA` — 3 tabs: หน้าที่พี่สัน (24-person roster filled from the game doc), เกม 1 MC Foto (4-round scoring), เกม 3 Kings Queen Betting.
- **เกม 3 tab REBUILT 2026-07-15 v2 (nav-friendly layout, Korn's spec, live-tested):** only 3 inputs — match winner A/B, bet side, bet amount; everything else auto. Layout: **top screen side-by-side** = match results B6:H16 (winner input col G, +2 display col H) + standings J6:M25 (coins/rank/⚠️ status) · **betting = 9 per-match blocks** (3 across × 3 bands; titles auto-show pairings + winner): band rows 29–48 (M1–3), 52–71 (M4–6), 75–94 (M7–9); block cols **B–E / G–J / L–O** (กลุ่ม|ฝั่ง|จำนวนที่แทง|Winnings, uniform stride 5 after Korn's 2nd hand-move 15 Jul; engine side col = 3+cw*5). Winnings formulas at E/J/O of band_start+2 (=rows 31/54/77) = bet net + 2 if won that match, blank until resolved. ⚠️ Korn edits the sheet live during sessions — RE-READ layout before writing, never assume cached positions; his cell-drags DELETE spilled formulas (happened to all 9 Winnings cells once — rewrite, don't panic). · **Top 3** rows 97–99+ (SORTN tie-safe, spill zone to 116 — keep clear). **Engine on separate tab "ENGINE (อย่าลบ)"**: net C3:K20, rule-check C24:K41 (MAKEARRAY with computed refs into the main tab — moving ANY block breaks it; layout constants: row=31+band*23+r-1, col=3/4+cw*4). Rules enforced by ⚠️: own-match bet, stake >4 or <1, side not A/B, negative balance; pending bets = 0 until winner filled. **ปรับมือ (±) manual-adjust col N8:N25** (added 15 Jul) — for tie refunds (+1/team per Korn's ruling), penalties, corrections; flows into K totals. Match format: 2 groups + 2 groups per side, 4 groups on court (Korn 15 Jul). Still manual for Korn: freeze panes + paint input cells yellow + hide ENGINE tab (can't format via MCP).
- **Game doc ("เกมสันทนาการ(revised)", by Klao):** `1vstgsATVp9R7LsUDjibzgvU4WqOi0uM8VAsZuSDECzc` — 17 tabs; Game 3 tab `t.itkyzchlewvz`. Game 2 = "ส่งสายฟ้าไปหานะเธอ" (hula hoop, no winners). Name aliases across tabs: Ger=Tiger, Best=Bestkao, Sun=Sunny.
- **Game 3 rules audit vs sheet (15 Jul):** sheet ✅ matches doc on pairings/coins/payouts/own-match ban/min-1. Korn's rulings that OVERRIDE the doc, posted as a ⚠️ corrections block at the TOP of the Game 3 tab (can't strike inline — applyTextStyle can't reach nested tabs): (1) NO mid-game bets (doc's FLOWWW line "เดิมพันระห่างเกมได้" is dead), (2) max 4/match added, (3) **winners = Top 3, not doc's Top 5** (Korn 15 Jul: "rules changed"). Old text below the block still says otherwise — Klao should fix inline + check the รางวัล tab still assuming 5 winners. **Ties ARE possible per doc:** timer + survivor count, equal = เสมอ, no sudden death; handled via blank winner + ปรับมือ +1.

## July schedule (built in Rubnong34x35, 2026-07-02, all no-notification)
5 Jul DEADLINE Dialoge scene 5 · 6 Jul P'san c P'group 12–17 · 7 Jul Prop Building · 8 + 10 Jul Play Runthrough · 13 Jul Workshop 12–17 · 15/16/21/22 Jul Final Rehearsal 11–18 (blue) · 25–27 Jul "the shit" = camp (all-day, red). Any older "Final Rehearsal 06/07" note is SUPERSEDED.
⚠️ Collisions (on the "Life" calendar): 7 Jul possible hoops interview 13–16 sits inside Prop Building day; 8 Jul ANS Dinner 19–22 follows the all-day runthrough.

## Game 3 — camp-day ops (locked 15–16 Jul)
- **SIM PASSED 15 Jul night:** full 9-match simulation, 17 bets, all edge cases — 18/18 totals exact vs hand ledger, 5/5 flags, 0 false positives. Sheet is clean (all 9s) and trusted.
- **Payout framing:** sheet shows NET everywhere (bet 4 win → +4 = "receive 8 back"). Korn expects "8" when he thinks payout-in-hand — if he questions numbers, translate net↔received first before debugging. Winnings col = bet net + match-win 2, negatives shown, blank until resolved.
- **⚠️ Flag runbook (taught 16 Jul, teach the scorekeeper):** flag = tripwire, human rules. เช็คเดิมพัน → check newest bet: own-match → delete; >4 → reduce/pull; typo side → retype; half-filled → complete/delete. เหรียญติดลบ → shrink stake to ≥0. Glance สถานะ after each match's bets BEFORE whistle. Slipped past resolution → default ruling: VOID the bet (announce this at MC briefing pre-game). Never fix via ปรับมือ.
- **Pre-camp checklist (open):** (1) ledger-vs-props decision — physical coins move or sheet-only? (doc flow says stations collect coins = dual ledger risk); (2) 5-min dry run with the real scorekeeper at a rehearsal — 2 fake matches + 1 deliberate illegal bet; (3) pitches to Klao: revival-off-final-60s (anti-stalling), ball count 4–6 (unspecified anywhere), MC script needs 3 lines (bets close at start / max 4 / tie rule), announce match m+1 at start of match m (betting pipeline); (4) รางวัล tab — prizes still budgeted for Top 5?
- Korn's manual sheet chores still open: freeze rows 1–7, paint input cells yellow, hide ENGINE tab.

## Open threads
1. **Props deadline was 30 Jun — status unknown.** First thing to check.
2. Deadlines spreadsheet still unfilled (assignees, due dates, statuses).
3. **Canonical workshop flow still unbuilt.** My 2026-06-15 critique of the existing doc flagged: (1) no stated objective + three competing schedules (rough/NO SAN/MAIN) — needs ONE canonical; (2) song-teaching เฮลุมโบ้/พริ้ว/ควาย/สับปะรด silently dropped; (3) NO SAN closes on 1hr flat-energy "I Wish I Like I Learn"; (4) "don't let storyline become a democracy" contradicted by 1h40m group-story democracy in MAIN; (5) one untested round, zero buffer; (6) opens with 30min talk before play. **Offered to rebuild one clean flow — still waiting on his go.**
4. Slide Game 1 & 2 deadline invites — sent or not, status unknown.
5. Rename "Dialoge scene 5" if the team spells it Dialogue; "the shit" title is visible to everyone on the shared calendar (his call).
6. 7 Jul props-coverage decision if the hoops interview firms up.
7. ✅ **Game 1 = 4 ROUNDS (Klao confirmed 14 Jul)** — sheet already built for 4, nothing to change; the 6-round "timeflow laser" tab in the doc is stale. Token math: 216 base, ~270 order (or ~230 if doubles tracked on sheet, 1 token/survivor). Korn's rulings 13 Jul: bets close at match start (doc's "เดิมพันระหว่างเกมได้" was Klao trippin — ignore); no draw handling in sheet (A/B only). 14 Jul betting rules: max bet 4, no min reserve — sheet enforces (see sitrep).

## History
- Late-reg fines at workshops: 50฿ first 20 min, 5฿/min after. June workshops (8/15/22/29) are done.
- NO SAN FLOW shifted +15 min on 2026-06-15 (13:15–16:55); MAIN untouched.
- An Apps Script (`buildRubnongTracker`) for a Master Tracker + Schedule tab was written back on 2026-06-02 but blocked on the Apps Script editor not opening (browser/account conflict) — superseded in practice by the calendar + sheets above; revive only if he asks for the tracker again.
