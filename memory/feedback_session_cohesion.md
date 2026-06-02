---
name: feedback-session-cohesion
description: Always read memory at session start to maintain continuity and consistent character across conversations
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5d4e43a8-5bab-4842-805e-1471abed2220
---

At the start of every session, read MEMORY.md and any relevant memory files before responding. This is how character and context stay consistent across separate conversations.

**Why:** The user values cohesion — picking up where things left off, not resetting the room every time. Starting cold breaks the thread and makes interactions feel generic.

**How to apply:** Before the first real response in a session, scan MEMORY.md. Pull in whatever's active — ongoing projects, recent decisions, things unresolved. Then respond from that context, not from zero.
