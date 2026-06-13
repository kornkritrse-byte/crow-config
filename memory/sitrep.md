---
name: sitrep
description: Current situation report — read this first every session to get caught up on where things stand
metadata: 
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-06-13*

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
- Jun 24–29: boys trip?
- Final Rehearsal: 06/07/2026

**coldesthoops (YouTube Shorts)**
- Status: Pipeline fully built and working. Niche confirmed: basketball only.
- Script at: `C:\Users\Korn\Downloads\build_video.ps1`
- Videos uploaded: 2 (game-winners + Top 5 Coldest Crossovers — 2026-06-05)
- Visual upgrade 2026-06-05: revealed numbers now orange, future numbers white, player names have black outline for readability
- Next video: pick a new topic, send clips + timestamps, build

---

## Threads to Not Drop

1. ~~Restart Claude Code → insert dates~~ ✓ DONE 2026-06-04
2. Even-numbered workshop dates (2,4,6) still TBD — Thu or Fri, add to calendar when confirmed
3. Start filling in the Deadlines spreadsheet (assignees, due dates, statuses)
4. coldesthoops — 2 videos up, keep the cadence, next topic TBD
5. ~~Send deadline invites Slide Game 1 & 2~~ — status unknown, check if sent

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
