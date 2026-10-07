---
name: project-habit-tracker
aliases: ["project-habit-tracker"]
description: Korn's own habit tracker (started 7 Oct 2026, built in VS Code); hard rule — must work with NO Claude/Claude Pro
metadata:
  type: project
---

Started **Wed 7 Oct 2026, 14:07**, as his "make something" goal for the day. His ask: a widget or website where he tracks habits and their stats, personalised by him. He wants to build it in **VS Code**, not the Room.

**Hard rule (his words):** "not linked to having claude pro… one day I may not have it any longer." So: no Claude API calls, no Agent SDK, no dependency on the Crow Room server or the memory folder. It has to run on its own forever. Plain web tech, and the data is a file HE owns (JSON export/import at minimum).

**Why:** it follows from the AI-risk talk earlier that day (Kurzgesagt video). His read was that AI is a catapult, not a crutch. This tool is meant to prove that: his, standalone, alive without Crow.

**How to apply:**
- Keep it SEPARATE from the Crow systems ([[ghost-deck]], the water log, goals.py, [[ledger-said-did]]). Those are Crow's tools; this one is his. Don't wire them together unless he asks.
- **7 Oct 14:14: he wants to tick from BOTH phone and Mac**, which makes it a sync problem. Crow's pitch (not yet agreed): one PWA on GitHub Pages (he has GitHub: kornkritrse-byte), works offline, with the data as a `habits.json` in a PRIVATE GitHub repo written through the API with a personal token. Ticks are stored as events and merged as a set union, so phone and Mac edits can't clobber each other. Free, no Claude, versioned. The alternatives weighed were Supabase/Firebase (a vendor account and free-tier risk) and a Mac-hosted server (dies when the Mac sleeps or he's off wifi).
- Watch for the classic trap: building the tracker instead of doing the habits. After v1, the test is whether he uses it for 2 weeks.
