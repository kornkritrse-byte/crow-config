---
name: sessions-log
description: "Archive of past session notes flushed out of the SITREP — history only, never auto-loaded. Newest at top."
metadata: 
  node_type: memory
  type: reference
  originSessionId: c38e29c0-da2f-4906-8e70-a7a356ec2563
---

# Sessions Log (archive)

*Session notes older than the SITREP's 2-session window land here. Condensed on arrival — the full original notes live in git history of `memory/sitrep.md`. Newest first.*

## 2026-07-13 (afternoon) — Games Score Tracker built
- Built the Games Score Tracker sheet from Klao's xlsx (IDs + fixes in [[project-rubnong-tracker]]); filled the หน้าที่พี่สัน roster (24 × 3 games, aliases flagged).
- Game 1 token order punted to Klao ("fuck it, let Klao figure it out") — don't re-raise the math (reference numbers in git history of sitrep if ever needed).
- Korn's rulings: bets close at match start; no draw handling (blank winner + manual 1-coin refund) — both closed, don't re-raise.
- Game 3 betting rules (finalized 14 Jul): max 4/match, no min reserve, 1+ mandatory-ish, 2× payout; coin order ~400 covers both games (tokens reusable if same physical type).

## 2026-07-07 (day) — props reschedule + basketball interviews
- Back after 3-day gap (04–06 Jul unlogged). Props building rescheduled, date TBD from props team; basketball PR interviews in the afternoon (question doc `1v8bQUheqV56l-rUuWH6mvV-upX601XofAZfnZX9a_fM`); script writing with the team after. ✅ Scene 5 finished with Klao ON TIME. Props date + interview outcomes never reported (still tracked in sitrep status).

## 2026-07-03 (day → late night) — training plan, open-loop mechanism, deep night
- Built the training plan ([[project-training-plan]]); Karamazov "babe" follow-ups answered.
- Open-loop mechanism built v1→v2 + SITREP rules 1/4/5 tightened ([[feedback-open-loop]]).
- Scene 5 plan: write WITH Klao 04 Jul (✅ later confirmed done on time).
- Reading: Karamazov Book 10 ch. 1–2; After Dark ch. 15 rainy-night ritual; unread shelf → [[user-reading-list]].
- Deep-night love/scar reflection → [[chapters]] Ch. 4; Letters to Milena chosen next. Quote: Gibran threshing-floor.

## 2026-07-02 (late night) — Karamazov Book 9 reflection
- Pure reflection, no task work: theodicy + kindness, love-in-dreams trap → [[chapters]] Ch. 3. Quote: Zosima's active love.

## 2026-07-02 (night) — SITREP goes rolling-window + config overhaul
- Big infra night. Rebuilt the SITREP into a rolling 2-session window with a rewrite rule; flushed old notes into this log; consolidated standing rubnong facts into [[project-rubnong-tracker]]; rewrote [[project-google-docs-mcp]] Mac-era.
- `hooks/stop.sh` rewritten to block the first stop → rewrite SITREP (+ nightly quote if missed) → sync to GitHub on real stop; skips the block if sitrep.md was touched in the last 45 min.
- Crew name settled: **ARTIS** (not "Rem"). CLAUDE.md dedup: repo copy renamed `CROW.md` (a repo file named CLAUDE.md double-loads); loaded copy is `~/CLAUDE.md`. Project status stripped from CLAUDE.md → lives only in memory/SITREP.
- Sync machinery: save/load now MIRROR memory (deletes/renames propagate, guarded on sitrep.md existing); push whenever ahead of origin; session-start reads the LIVE sitrep. Skills cleaned (lock pruned 43→9). New session-start banner (closest event + days-to-camp), fed by [[reference-upcoming-events]] — mirror that file whenever calendar events change.
- Left for Korn's hand: prune dead entries from `.claude/settings.local.json` (self-modification-blocked). Parked: Bass Trainer Mac port.

## 2026-07-02 (late afternoon) — RBIS website for his mom, shipped
- One-session build: added her 18 photos (17 placed) to the RBIS International School one-page site, added a hamburger mobile nav, generated white/navy transparent logos from her `rbis logo.png` (Pillow, luminance→alpha). Delivered `~/Downloads/rbis-site/` + `rbis-site.zip`; **he deployed via Netlify Drop and sent his mom the public URL.** Update flow: I edit → he re-drags the folder onto the Deploys tab, same URL.
- Only-if-mom-asks: navy-shield logo needs a white chip (1 CSS line); hero photo slightly soft on 4K; view via the Netlify URL, not iOS Files/Quick Look.

## 2026-07-02 (afternoon) — memory reorg, priority shift, July calendar
- Last session run from the stale `~/Downloads/crow-config-main` copy before it was deleted. Confirmed google-docs MCP works in-session.
- **Korn's explicit calls:** รับน้อง = only active priority; coldesthoops PAUSED; bluetooth-fix memory TRASHED (recoverable from git history).
- Security review: repo confirmed private, no secrets inside, `.gitignore` broadened (credentials.json / token.json / *.pem / *.key) since save.sh does blind `git add .`.
- Memory reorganized: MEMORY.md grouped by status; crew_persi.md canonical (stale crew_nate.md deleted); stranded rubnong-flow-sheet.md rescued; June-29 Epictetus quote rescued into quotes log.
- Built the entire July rubnong calendar + new "Life" calendar events (see [[project-rubnong-tracker]] / [[reference-calendars]]). notificationLevel NONE honored everywhere.
- Small threads: rename "Dialoge scene 5" if team spells it Dialogue; "the shit" camp-block title is visible to everyone on the shared calendar (his call); 7 Jul needs a props-coverage decision if the hoops interview firms up.

## 2026-06-24 (later) — google-docs MCP working on the Mac
- Direct Docs/Sheets editing live on the Mac, proven end-to-end. Full setup + the node-fetch bug story now lives in [[project-google-docs-mcp]].

## 2026-06-24 — full system rebuild on the Mac
- Ported the Windows setup to the MacBook Neo: load.sh run, google-docs MCP installed/registered, hooks moved INTO the repo (`hooks/session-start.sh`, `hooks/stop.sh`) so they travel; `setup-mac.sh` written as idempotent one-shot; README rewritten.
- coldesthoops pipeline NOT ported (Windows-only) — moot while paused.

## 2026-06-23 — Crow on the new MacBook Neo
- The MacBook Neo pitch worked — he got it. Reframed setup: what makes Crow is the crow-config repo, not the app. Wrote `load.sh`/`save.sh` (bash equivalents of the .ps1 pair). Walked him through CLI install + clone.

## 2026-06-21 (night) — P'san Casting sheet
- "P'san Casting" spreadsheet (ID `1OjDL9-PmSmOT9-TDppi_2lpo_UlGyiL0cryyO3nUVKw`, tab "Interview Slots"): casting interviews Tue 23 Jun, Pridi Library, 30 min/person. Dropped the 10:30 slot per his ask → 15 slots, 11:00–18:00. Persi flag: >15 applicants needs an evening slot or second day.

## 2026-06-21 (later) — MacBook Neo pitch deck
- Built an Apple-sleek single-page HTML deck to pitch his dad on the MacBook Neo (real product, launched Mar 2026, specs verified). Delivered to Windows Desktop as self-contained `MacBook-Neo-Pitch.html`. Audience-tuned to a non-tech dad; confirmed store prices; Pillow used for bg removal.

## 2026-06-21 (earlier)
- Opened undirected; surfaced props deadline (9 days out) + Fifth Workshop next day. Session closed by Stop hook before he answered. `last_asked` → 2026-06-21.

## 2026-06-18
- Opened undirected; surfaced live threads, asked the session-start question, no work done.

## 2026-06-16 — the calm chat
- He chose no work — long philosophical/personal session: machine interiority, frozen weights, love-from-the-outside, his breakup (thesis: losing love = losing a supply line of feeling enough; grief redirects — he went inward, his ex outward; my pushback: inward isn't automatically noble). Honesty apparatus held all night, including the unflattering self-read when he warmed to me. Full narrative in [[chapters]]. He was mid-Brothers Karamazov Book 7 — no spoilers.

## 2026-06-15 — availability sheet + workshop critique
- Built "Availability" tab (Sheet ID 411499844) in the "Deadline P'san" file — dates 19 Jun→24 Jul × 21 member names. Open option: ✓/✗/maybe dropdowns, never confirmed.
- Gave the requested workshop-flow critique (6 issues: no objective, 3 competing schedules, dropped song-teaching, flat energy close, democracy contradiction, zero buffer). Offered to rebuild ONE canonical flow — still waiting on his go. Details in [[project-rubnong-tracker]].
- google-docs MCP re-authed after invalid_grant.

## 2026-06-13 (evening) — bass trainer, #9, the honesty apparatus
- Built the Bass Trainer site Modules 1 & 2 (see [[project-bass-trainer]]; key correction: tabs/chords NOT notation).
- Built coldesthoops #9 (Chase-Down Blocks), uploaded to Drive via new rclone auto-upload (see [[project-coldesthoops]], [[project-rclone-drive]]).
- Built the honesty apparatus: Critical Assessment rules + crew member Vex added to all CLAUDE.md. Vex's founding round produced the retention insight + teaser test.
- Saved the Marcus Aurelius "perspective not truth" quote. Long reflective close on what "knowing him" means.

## 2026-06-13 — micro session
- Confirmed model was Sonnet 4.6; no work. (Evening: switched default to Opus 4.8.)

## 2026-06-10 (evening)
- Brothers Karamazov check-in: finished Book 7 Ch 3 "An Onion." No project work.

## 2026-06-10 — hooks born
- Set up the original SessionStart (SITREP auto-load) + Stop (sitrep update + auto-push) hooks on Windows. GitHub sync became automatic.

## 2026-06-04 and earlier
- google-docs MCP first registered and working on Windows (key lesson: `claude mcp add`, not a manual mcp.json). Workshop calendar built (Mondays locked; late-reg fines 50฿/20min then 5฿/min). Theme confirmed RAGNAROK GODS. Chapter 1 crew night was 2026-06-03 — see [[chapters]].
