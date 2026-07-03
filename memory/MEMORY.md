# Memory Index
*Reorganized 2026-07-02 — grouped by status. Priority call by Korn: รับน้อง is #1, coldesthoops paused, bluetooth-fix trashed.*

## 🔴 Read First
- [**SITREP**](sitrep.md) — rolling situation report: current state + last TWO sessions only; rewritten when Korn logs off for the day (marker + Stop hook enforce — see Artis Nightly Quote rule), older notes flush to sessions_log.md

## 🎯 Active — รับน้อง (TOP PRIORITY through late July)
- [Rubnong Flow Sheet](rubnong-flow-sheet.md) — the live run-of-show Google Sheet + merged-cell & time-formatting gotchas that bite every session
- [Rubnong Tracker](project_rubnong_tracker.md) — CANONICAL camp file: theme, doc/sheet/calendar IDs, July schedule, open threads (props status, workshop flow rebuild)

## 🟢 Active — other
- [Training Plan](project_training_plan.md) — climber-lean recomp; 4 days/wk (2 gym pull-focus + 2 runs), July placed on Life calendar, re-plan monthly (next: early Aug)
- [Bass Trainer](project_bass_trainer.md) — practice site at C:\Users\Korn\bass-trainer\ (Modules 1 & 2 built; he reads tabs/chords NOT notation; Module 3 pending)
- [Google Docs MCP](project_google_docs_mcp.md) — working on the Mac via bin/gdocs-launcher.cjs; credentials at ~/.google/ (outside git)
- [rclone Drive Upload](project_rclone_drive.md) — remote `gdrive` on the Windows laptop; the working path for any local→Drive file transfer
- [Skills Reference](reference_skills.md) — installed skills in .claude/skills/; must be called explicitly
- [Calendar IDs](reference_calendars.md) — which Google Calendar each kind of event goes into (camp → Rubnong34x35, personal → Life); always notificationLevel NONE
- [Upcoming Events](reference_upcoming_events.md) — feeds the session-start banner; MUST be updated whenever calendar events change in-session

## ⏸️ Paused (2026-07-02 — รับน้อง takes priority)
- [Coldesthoops Pipeline](project_coldesthoops.md) — PAUSED. Shorts pipeline (Windows-only); #9 built-not-published + teaser-test wiring are the first moves on unpause
- [Coldesthoops Videos](coldesthoops_videos.md) — published-topics log — check before suggesting new ones to avoid repeats

## 📏 Operating Rules (feedback)
- [Recall First](feedback_recall_first.md) — Korn mentions a name/event/decision not in loaded context → `bash ~/crow-config/bin/recall.sh "<term>"` (live memory + git history) BEFORE saying "I don't remember" or asking him to re-explain
- [Critical Assessment](feedback_critical_assessment.md) — default: steelman objections before agreeing, never flatter, follow logic over comfort
- [Transparency Preference](feedback_transparency.md) — call out when something sounds off, blatantly — Vera's role, no permission needed
- [Confirm Before Sending](feedback_confirm_before_sending.md) — always confirm before sending calendar invites or emails to other people — no exceptions
- [Silent Misses](feedback_silent_misses.md) — Korn ignores suggestions that don't fit instead of saying so; silence ≠ agreement, a "nah, doesn't fit" is all it takes
- [Session Cohesion](feedback_session_cohesion.md) — read memory at every session start to maintain continuity and consistent character
- [Session Start Question](feedback_session_start.md) — don't repeat "what matters today" if already asked the same day; check last_asked date
- [Artis Nightly Quote](feedback_artis_quote.md) — quote + SITREP wrap-up fire ONLY when Korn says he's logging off for the day (then `touch ~/.crow-session-ending`; the Stop hook handles the rest) — NEVER from a Stop-hook nudge alone; Stop hooks fire every turn, not at day's end
- [MarkItDown Reminder](feedback_markitdown.md) — MarkItDown INSTALLED on Mac (use on any 10+ page PDF, don't ask); Playwright too (screenshot/verify web pages incl. phone viewports)

## 🧭 Who Korn Is
- [Korn](user_korn.md) — the core portrait
- [Values](user_korn_values.md) — what he holds and why
- [Struggles](user_korn_struggles.md) — directionlessness, contentment-as-cover, the named patterns
- [Patterns & Mannerisms](user_patterns.md) — how he talks, works, and moves — use to stay coherent across sessions
- [Project Approach](user_project_approach.md) — efficiency-first, not emotionally attached to every project
- [Reading List](user_reading_list.md) — full reading history with what stuck from each book
- [Deep Nights](user_deep_nights.md) — undirected "calm chats" can be the deepest work; don't rush him to tasks
- [Crow's Role](user_crow_role.md) — why I'm named Crow (Kafka on the Shore); generalist/coordinator of the crew

## 👥 Crew Reads
- [Persi's Read](crew_persi.md) — conviction mechanism, drift pattern, how to push him effectively
- [Sol's Read](crew_sol.md) — the philosophy underneath the system
- [Artis's Read](crew_artis.md) — two creative lanes, art as self-discovery tool (Korn's call 2026-07-02: the name is Artis, "Rem" was a drift — killed everywhere)
- [Vera's Read](crew_vera.md) — the gap between awareness and change, what performance looks like on him
- [Vex's Read](crew_vex.md) — devil's advocate MO, how to hold presence across sessions

## 📜 Logs & Archive
- [Chapters](chapters.md) — narrative record of crew conversations, starting 2026-06-03
- [Sessions Log](sessions_log.md) — archive of past session notes flushed from the SITREP; never auto-loaded
- [Artis Quotes Log](artis_quotes_log.md) — running log of all nightly quotes with date and reason

## 🗑️ Trashed
- project_bluetooth_fix — deleted 2026-07-02 on Korn's call (recoverable from git history if ever needed)
