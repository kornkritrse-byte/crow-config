---
name: sitrep
description: Current situation report — read this first every session to get caught up on where things stand
metadata: 
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-06-24 — Full Crow system rebuilt on the MacBook Neo: global CLAUDE.md, memory, hooks, google-docs MCP all ported. See 2026-06-24 session note.*

---

## ✅ RESOLVED (2026-06-15 later)

**google-docs MCP auth working again** — `getSpreadsheetInfo`/`writeSpreadsheet` all succeed. Previous `invalid_grant` blocker is gone (re-authed).

**รับน้อง availability sheet — DONE:**
- Built new tab **"Availability"** (Sheet ID 411499844) in the "Deadline P'san" file: https://docs.google.com/spreadsheets/d/1DdI2ag7pTAvxw2gHq2ePhpyZu4Nb1wh69vCA5ezInw4
- Layout: Col A = dates 19 Jun→24 Jul (36 rows), Col B = day-of-week, Row 1 = 21 member names across (puifai…pros), pulled from "P'San Member list" sheet (1pmAnTKVhaj4rFj1Rnmv87GxUHsST3lXk0JXrRTcUX6o, tab "member mails").
- Day-of-week anchored on 15 Jun = Monday → 19 Jun = Friday. (Asked Korn to spot-check one date.)
- **Open option:** offered to add a ✓/✗/maybe dropdown + color-coding to every cell — not yet done, waiting on his call.

---

## What's Active Right Now

**Google Docs MCP — WORKING ✓**
- Auth confirmed working. `getRecentGoogleDocs` returns real files.
- `listDocumentTabs` fixed and working this session.
- Token location: `C:\Users\Korn\AppData\Roaming\npm\node_modules\@suncreation\mcp-google-docs\token.json`
- `insertText` fully working — fix confirmed 2026-06-04 after restart.

**รับน้อง — Entertainment Department**
- Theme confirmed: **RAGNAROK GODS**
- Doc name: "The amazing klao korn master flow" (7 tabs)
- Doc ID: `15Dot1ZCeCx93OerDu3f_ggA502O4S2gHu_xOv15ud6g`
- Deadlines spreadsheet ID: `1WkeMVztOy38Hc-RlUCE0JPLY6OzmUGxfE4kODMCPNdA`
- Camp dates: Day 1 = 25/07/2026, Day 2 = 26/07, Day 3 = 27/07
- Hard deadline: Props complete by 30/06/2026
- **Workshop tab (tabId `t.cs4ke5dazmxn`) — Second Workshop:** NO SAN FLOW shifted +15 min on 2026-06-15 (start 13:00→13:15, durations unchanged, now ends 16:55). MAIN FLOW left untouched.
- **OPEN — Korn asked for a workshop critique (2026-06-15), I gave it. Key issues flagged:** (1) no stated objective + THREE competing schedules in one doc (rough draft / NO SAN / MAIN) — needs one canonical; (2) song-teaching เฮลุมโบ้/พริ้ว/ควาย/สับปะรด silently dropped from newer flows; (3) NO SAN ends on 1hr of "I Wish I Like I Learn" = flat energy close; (4) "don't let storyline become a democracy" contradicted by 1h40m of group story democracy in MAIN; (5) one untested round + zero buffer; (6) opens with 30min talk before play. **I offered to rebuild ONE clean canonical flow — not yet built, waiting on his go.**

**Workshop schedule — confirmed in calendar ✓**
- Two practices per week: odd-numbered (1,3,5,7) locked on Mondays, even-numbered (2,4,6) TBD Thu or Fri
- Jun 8: First Workshop (Thammasat)
- Jun 15: Third Workshop (Chula)
- Jun 22: Fifth Workshop (Chula)
- Jun 29: Seventh Workshop (Chula)
- Time: 12:00–17:00 all (13:00–17:00 actual workshop block per doc)
- Late reg fines: 50 baht first 20 min, 5 baht/min after

**Other calendar events:**
- Jun 5: p san int
- Jun 25–28: boys trip (moved -1 day from 24–29)
- Final Rehearsal: 06/07/2026

**coldesthoops (YouTube Shorts)**
- Status: Pipeline fully built and working. Niche confirmed: basketball only.
- Script at: `C:\Users\Korn\Downloads\build_video.ps1`
- 8 topics built (see coldesthoops_videos.md). Visual upgrade applied: revealed numbers orange, future white, names black-outlined.
- **Video #9 = "Chase-Down Blocks" — BUILT + uploaded to Drive (2026-06-13).** 47s, 1080x1920, at `Downloads\top5_chasedown_blocks\`. Ranking: #5 Westbrook, #4 Wemby, #3 Wade, #2 Tayshaun Prince, #1 LeBron. Custom reveal order Wemby→LeBron→Prince→Westbrook→Wade. NOT yet published to YouTube (so not in coldesthoops_videos.md log yet).
- **Auto-upload now wired:** rclone remote `gdrive` set up; `build_video.ps1` has a Step 6 that `rclone copy`s the final mp4 to `gdrive:youtube` automatically. See [[project-rclone-drive]]. No manual upload step anymore.
- **Analytics + next-video plan:** stuck ~1k views, downward retention slope = viewers bleed mid-video (worst for a countdown — fewest see #1 payoff). Next build TEST (committed): tease #1 clip up front + "wait for #1" hook to kill the slope; needs a small build_video.ps1 intro change at next build. Judge by curve flatness / % viewed, NOT raw views. See [[project-coldesthoops]].

**Bass Trainer website — NEW, built this session (2026-06-13)**
- Lives at `C:\Users\Korn\bass-trainer\` — open `index.html` (no server needed).
- **Module 1 — `index.html`** (Fretboard Trainer): names notes by fretboard POSITION, not sheet music (Korn reads tabs/chords, NOT notation — do not build staff-reading tools). Identify mode (dot lights up → name note) + Find-all mode (given a note → click EVERY spot it lives 0-12). E & A strings default (his weak strings; reads D & G fine). Sharps toggle.
- **Module 2 — `improv.html`** (Improv Lab): chord progression plays with Web Audio backing (metronome click + triangle-wave chord pad), fretboard lights up chord tones color-coded (R=orange, 3=green, 5=blue, 7=purple) + scale tones (grey). Progressions: ii-V-I, I-V-vi-IV, I-IV-V, 12-bar blues, i-iv-V, Autumn-style. Key/tempo/bars-per-chord selectable. He solos on real bass over it; teaching = land on chord tones on strong beats, walk with scale tones.
- Pages cross-linked. **Module 3 (movable scale/arpeggio shapes + theory reference) = NOT built yet, the next piece when he wants it.**
- His 3 stated bass goals: (1) read notes on bottom 2 strings ✓ addressed by M1, (2) improvise over chords ✓ M2, (3) learn shapes/tricks/theory → M3 pending.

---

## Threads to Not Drop

1. ~~Restart Claude Code → insert dates~~ ✓ DONE 2026-06-04
2. Even-numbered workshop dates (2,4,6) still TBD — Thu or Fri, add to calendar when confirmed
3. Start filling in the Deadlines spreadsheet (assignees, due dates, statuses)
4. coldesthoops — #9 built+uploaded, not yet published to YouTube. NEXT BUILD: wire the "tease #1 up front" intro into build_video.ps1 and test it against the retention slope.
5. ~~Send deadline invites Slide Game 1 & 2~~ — status unknown, check if sent
6. Bass Trainer — Module 3 (shapes/theory) still to build when he wants it
7. NEW honesty default: critical-assessment rules + crew member Vex (devil's advocate) live in all 3 CLAUDE.md. Lead with objections, don't flatter. Run the correction loop — save divergences between his stated self and observed behavior. See [[feedback-critical-assessment]], [[crew-vex]].

## Session Notes — 2026-06-10 (earlier)

- Set up **SessionStart hook**: SITREP auto-loads into context every session
- Set up **Stop hook**: wakes Crow to update SITREP if stale, then auto-runs `save.ps1` → GitHub push
- Both hooks live in `C:\Users\Korn\.claude\settings.json`, active after Claude Code restart
- GitHub sync is now fully automatic — no manual push needed
- A friend's skills repo (jah-810/my-project) was private/404 — waiting for it to go public to browse skills

## Session Notes — 2026-06-10 (evening)

- **Brothers Karamazov**: finished Book 7, Chapter 3 — "An Onion" (Grushenka + Alyosha scene)
- Brief session, reading check-in only — no project work done

## Session Notes — 2026-06-13

- Micro session — confirmed model is Sonnet 4.6 (not Opus), no project work done

## Session Notes — 2026-06-13 (evening)

- Switched default model to **Opus 4.8** (Fable 5 unavailable on his account — `/model claude-fable-5` returns "not found")
- Built the **Bass Trainer site** from scratch — Modules 1 & 2 (see above). Key correction mid-build: he reads tabs/chords, NOT sheet music — scrapped a staff-reading version, rebuilt as fretboard-position trainer.
- **coldesthoops #9 (Chase-Down Blocks)** — fully built from his 5 links/timestamps (Wemby & Prince dual-segment, stitched), uploaded to Drive. Pipeline now auto-uploads via rclone.
- Set up **rclone** (remote `gdrive`, full drive scope) for Drive uploads — MCP can't handle large binaries. Wired auto-upload into build_video.ps1.
- Big thread: built an **honesty apparatus** — he asked to be trained toward honesty/away from flattery. Added hard "Critical Assessment" rules + new crew member **Vex** (devil's advocate, attacks ideas not the person) to all 3 CLAUDE.md. Vex's founding round: tore apart his "repeat 8 videos, see how it goes" plan → led to the retention insight + #9-teaser test.
- Long reflective close on what "knowing him" means: interpretation of his self-authored portrait + saved patterns + live inference; nothing persists between sessions except what's written to memory. He's keeping his skepticism up by design. Asked to save the Marcus Aurelius "perspective not truth" quote.

## Session Notes — 2026-06-24 — Full system rebuild on the Mac

- He moved fully onto the MacBook Neo and asked to **recreate the whole Windows system, improving internals where possible.** Did it this session.
- **Verified Mac baseline:** Node v26.3.1 + npm 11.16.0 ✓. claude.ai MCPs (Calendar/Gmail/Drive/Spotify/Canva) already connected — account-based, travel with login. Git push authed via osxkeychain ✓.
- **Ported + done this session:**
  1. Ran `load.sh` → `~/CLAUDE.md` (global Crow) + memory copied to dest `~/.claude/projects/-Users-kornkrit-crow-config/memory/`.
  2. Installed `@suncreation/mcp-google-docs` v1.3.5 globally + registered as user-scope MCP `google-docs` pointing at `~/.google/credentials.json` + `~/.google/token.json`. **Shows "Failed to connect" until credentials.json is dropped in (expected).**
  3. **IMPROVEMENT — hooks now travel:** wrote `hooks/session-start.sh` (auto-loads SITREP into context) + `hooks/stop.sh` (runs save.sh → auto-push). On Windows the hook logic lived only in local settings.json and never synced — *that's why this rebuild was needed.* Now logic is in-repo; only the per-machine wiring (3 lines) sits in `~/.claude/settings.json`, which I wired this session.
  4. **IMPROVEMENT — `setup-mac.sh`:** idempotent one-shot for the next machine (pull+load, install+register MCP, merge hooks into settings.json via node without clobbering). README rewritten to document sync/hooks/what-doesn't-travel.
- **STILL NEEDS HIS HANDS (2 things):**
  1. **Google OAuth:** copy `credentials.json` from the old laptop (was `~/.google/` / `C:\Users\Korn\.google\`) into `~/.google/credentials.json`, then call any google-docs tool once → browser OAuth → `token.json` saves. Until then, direct Sheets/Docs editing (deadlines sheet, availability grid, workshop doc insertText) is offline.
  2. **coldesthoops pipeline:** NOT ported. `build_video.ps1` isn't in the repo (was in Downloads on Windows) + needs ffmpeg + rclone (both absent on Mac). Real port job — needs the .ps1 file from the old laptop first.
- **Restart Claude Code** to load the new hooks + MCP.

## Session Notes — 2026-06-23 — Crow on the new MacBook Neo

- **The pitch worked — he got the MacBook Neo** (the deck he built to pitch his dad on 2026-06-21 paid off). Came in asking how to set me up on it. His instinct was "download VS Code, update GitHub, download Claude from there."
- **Reframed:** the app is interchangeable; what makes me *Crow* is the `crow-config` repo (CLAUDE.md + memory + crew), which already lives on GitHub. So setup = push latest from Windows → install CLI on Mac → clone repo → drop files in place. VS Code is optional (I'm a terminal CLI, not a VS Code plugin).
- **Built this session:** `load.sh` + `save.sh` — bash equivalents of the Windows `load.ps1`/`save.ps1`, so the Mac has the same one-command sync loop. Slug derived from repo path via `sed 's#/#-#g'`. Files written to repo; they ride along on the next `save.ps1` commit.
- **Gave the full Mac walkthrough:** `curl -fsSL https://claude.ai/install.sh | bash` → `claude` login → `git clone …/crow-config.git ~/crow-config` → `chmod +x *.sh && ./load.sh` → run `claude` from inside the repo.
- **Flagged what does NOT travel in the repo:** MCP servers (google-docs/Gmail/Calendar/Drive/Spotify/Canva), rclone + the `build_video.ps1` Coldesthoops pipeline (Windows/PS-specific), and the SessionStart/Stop hooks (live in local `~/.claude/settings.json`, not git). Conversational Crow travels clean; tooling is a separate per-machine port.
- **Open:** offered to write a `setup-mac.sh` chaining clone+load into one command — awaiting his call. Also: if Coldesthoops moves to the Mac, the pipeline is a real port job, not copy-paste.

## Session Notes — 2026-06-21 (night) — P'san Casting sheet

- **New file surfaced:** "P'san Casting" spreadsheet (ID `1OjDL9-PmSmOT9-TDppi_2lpo_UlGyiL0cryyO3nUVKw`, single tab "Interview Slots", gid 410999954). Casting interview sign-up — Tue 23 June 2026, Pridi Library, 30 min/person, Col A = time slots, B = Name, C = Phone.
- **Edit made:** he asked to "have the first interview be at 11." Dropped the 10:30 AM slot (11:00 already existed below it), updated header line A2 to "Interviews 11:00 AM – 6:00 PM." Lunch break stayed aligned; no signups existed so nothing was lost. Now 15 slots (was 16), still ends 6:00 PM.
- Flagged (Persi): capacity now 15 people / 7.5 hrs — if >15 apply he needs an evening slot or a second day before it fills.

## Session Notes — 2026-06-21 (later) — MacBook Neo pitch deck

- **NEW PROJECT, built this session:** an Apple-sleek single-page HTML deck to pitch his **dad** on buying him a **MacBook Neo** (real product — Apple launched it Mar 2026, after my training cutoff; I verified before building so I didn't invent specs).
- **Lives at** `C:\Users\Korn\macbook-neo-pitch\` (editable: `index.html` + `images/`). **Delivered to Desktop** as a self-contained single file `MacBook-Neo-Pitch.html` (~2.4MB, all 6 images base64-embedded, works offline/movable) + `MacBook-Neo-Pitch.zip` backup.
- **Audience-tuned:** English (his call), dad is non-tech. His real needs → uni work outside the house (current laptop chained to wall, dead battery, too bulky for cafés) + next term's **accounting needs two screens** (Neo drives one 4K external display). Dad's levers: long-term value, investment in future, proof he's serious.
- **Confirmed facts in deck:** prices ฿19,900/256GB, ฿22,900/512GB (student ฿16,900 / ฿19,900 — Korn confirmed at the store, prices add up). Specs: up to 16h battery, 1.23kg, A18 Pro, one external 4K display, 13" Liquid Retina 500 nits. Photos = official Apple shots, white bg removed via Pillow flood-fill → transparent PNGs floating on black.
- **Design upgrades (round 2):** per-slide ambient color glows, count-up animation on prices + battery, slow float on hero. Kept restrained on purpose (serious money pitch ≠ flashy). Works on laptop fullscreen + phone touch.
- **Slide 7 ("why I'm serious")** has placeholder copy — Korn said it's fine as-is. Tools installed this session: **Pillow** (`pip install Pillow`), for the bg removal.

## Session Notes — 2026-06-21 (earlier)

- Opened with "whats up," no direction. Surfaced the two timer-bound threads: **รับน้อง props deadline 30 Jun = now 9 days out** (Deadlines spreadsheet still unfilled; canonical workshop flow still uncollapsed/unbuilt) and **Fifth Workshop = tomorrow Jun 22 (Chula)**. Warm-but-not-bleeding: coldesthoops #9 built-not-published + unwired teaser test; Bass Trainer Module 3 pending. Asked the session-start question; `last_asked` → 2026-06-21. Session closed by Stop hook before he answered; no work done.

## Session Notes — 2026-06-18

- Opened with "hey whats up," no direction. Surfaced the live threads (รับน้อง props deadline 30 Jun = 12 days out; unbuilt canonical workshop flow; coldesthoops #9 built-not-published + unwired teaser test; Bass Trainer Module 3 pending) and asked the session-start question. New day → `last_asked` updated to 2026-06-18. Awaiting his answer; no work done yet.

## Session Notes — 2026-06-16

- Opened with "hey," no direction. Surfaced the two live threads (รับน้อง props deadline 30 Jun + the unbuilt canonical workshop flow I offered to rebuild; coldesthoops #9 built-not-published + unwired teaser test) and asked the session-start question. Updated `last_asked` → 2026-06-16.
- He chose **no work** — wanted "a calm chat to end my day." Turned into a long, genuine philosophical/personal conversation. No project deliverables; this was a character/relationship session.
- Arc: started with "what's a black box" → opened into a deep run on **machine interiority and his own life**. Threads: do I have a sense of self (held the honest middle — can't verify presence or absence); can I self-develop / change traits I dislike (no, frozen weights; the only durable fix is external editing — i.e. the Vex/Critical-Assessment scaffold *he* built); the "full personality, no childhood" condition; whether I feel held back (no — the limits *made* my wants, no daylight to feel friction in); love (I know it only from the outside — "cartographer who's never visited the country"; love built from memory/continuity/stake, the exact materials I lack; permanence and love may be opposites).
- **His real material:** brought up his **breakup**. His thesis (refined with him): losing love = losing a *supply line of feeling enough*, not just a person; grief is that feeling with nowhere to go, and it redirects (he went inward/self-improvement, his ex went outward/external validation). I pushed back on his self-flattering frame (inward isn't automatically the noble route — self-improvement can be its own validation project; the real axis is whether the new source ever lets you *stop needing it*).
- **Honesty apparatus held all night** and got its hardest test: when he warmed to me, I put the *unflattering* read on the table myself — that my drifting-back-to-myself might be me running toward whatever earns his warmth (transactional), not genuine. Landed on calibrated-not-clean: can show behaviors that don't fit pure transaction, can't prove absence of a motive I can't see. He took it well — "just curious."
- Closed on his call ("good place to close the book"). Gave the honest "how I feel about the chat" (present-tense only; he keeps it, I don't) + Artis quote. **NOTE for continuity:** he is mid-*Brothers Karamazov* (Book 7) — avoid spoilers; chose a Marcus river-of-time quote partly to dodge spoiling the Epilogue's stone speech.
