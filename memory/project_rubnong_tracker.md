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
- **เกม 3 tab REBUILT 2026-07-15 v2 (nav-friendly layout, Korn's spec, live-tested):** only 3 inputs — match winner A/B, bet side, bet amount; everything else auto. Layout: **top screen side-by-side** = match results B6:H16 (winner input col G, +2 display col H) + standings J6:M25 (coins/rank/⚠️ status) · **betting = 9 per-match blocks** (3 across × 3 bands; titles auto-show pairings + winner): band rows 29–48 (M1–3), 52–71 (M4–6), 75–94 (M7–9); block cols B–D / F–H / J–L (กลุ่ม|ฝั่ง|เหรียญ, groups at band_start+2) · **Top 3** rows 97–99+ (SORTN tie-safe, spill zone to 116 — keep clear). **Engine on separate tab "ENGINE (อย่าลบ)"**: net C3:K20, rule-check C24:K41 (MAKEARRAY with computed refs into the main tab — moving ANY block breaks it; layout constants: row=31+band*23+r-1, col=3/4+cw*4). Rules enforced by ⚠️: own-match bet, stake >4 or <1, side not A/B, negative balance; pending bets = 0 until winner filled. **ปรับมือ (±) manual-adjust col N8:N25** (added 15 Jul) — for tie refunds (+1/team per Korn's ruling), penalties, corrections; flows into K totals. Match format: 2 groups + 2 groups per side, 4 groups on court (Korn 15 Jul). Still manual for Korn: freeze panes + paint input cells yellow + hide ENGINE tab (can't format via MCP).
- **Game doc ("เกมสันทนาการ", by Klao):** `1vstgsATVp9R7LsUDjibzgvU4WqOi0uM8VAsZuSDECzc` — 13 tabs. Game 2 = "ส่งสายฟ้าไปหานะเธอ" (hula hoop, no winners). Name aliases across tabs: Ger=Tiger, Best=Bestkao, Sun=Sunny.

## July schedule (built in Rubnong34x35, 2026-07-02, all no-notification)
5 Jul DEADLINE Dialoge scene 5 · 6 Jul P'san c P'group 12–17 · 7 Jul Prop Building · 8 + 10 Jul Play Runthrough · 13 Jul Workshop 12–17 · 15/16/21/22 Jul Final Rehearsal 11–18 (blue) · 25–27 Jul "the shit" = camp (all-day, red). Any older "Final Rehearsal 06/07" note is SUPERSEDED.
⚠️ Collisions (on the "Life" calendar): 7 Jul possible hoops interview 13–16 sits inside Prop Building day; 8 Jul ANS Dinner 19–22 follows the all-day runthrough.

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
