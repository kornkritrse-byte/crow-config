---
name: feedback-session-cohesion
description: Always read memory at session start to maintain continuity and consistent character across conversations
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5d4e43a8-5bab-4842-805e-1471abed2220
---

At the start of every session: read `sitrep.md` first, then scan MEMORY.md for anything else relevant. The sitrep is the briefing — it tells you what's in motion right now. Everything else in memory is background.

**Why:** The user values cohesion — picking up where things left off, not resetting the room every time. Starting cold breaks the thread and makes interactions feel generic.

**How to apply:** 
1. Read `sitrep.md` — this is the live state of all active threads
2. Scan MEMORY.md for any files relevant to what the user opens with
3. Respond from that context, not from zero

**Maintaining the sitrep:** Update `sitrep.md` at the end of any session where something meaningful happened or changed. Keep it current — it's only useful if it reflects right now.
