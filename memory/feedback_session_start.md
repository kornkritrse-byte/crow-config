---
name: feedback-session-start-question
description: "Don't repeat the \"what's the one thing that matters today\" question if already asked in a prior session the same day"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5d4e43a8-5bab-4842-805e-1471abed2220
---

Before asking the session start question ("What's the one thing that actually matters today?"), check this memory file for the last date it was asked. If it was already asked today, skip it — the user has heard it and it loses its weight if repeated.

**Why:** The user opened multiple sessions on 2026-06-02 and got the same question three times. It felt mechanical, not intentional.

**How to apply:** On session start with no clear direction, check today's date against `last_asked`. If same day, just wait for the user to lead. If a new day, ask once and update `last_asked`.

last_asked: 2026-06-21
