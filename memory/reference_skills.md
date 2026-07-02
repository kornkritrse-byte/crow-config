---
name: reference-skills
description: Installed Claude Code skills — location and what each does
metadata:
  node_type: memory
  type: reference
  originSessionId: 41db1cf3-61a6-43ab-906e-eef21c9471e9
---

Skills live in `~/crow-config/.claude/skills/` (the duplicate `.agents/skills/` copy was deleted 2026-07-02; `skills-lock.json` pruned to match what's installed).

**Marketing skills** (from `coreyhaines31/marketingskills`, installed 2026-06-04 — all serve coldesthoops, which is paused; kept because they're explicit-call only and cost nothing idle):
- `ad-creative` — visual/thumbnail thinking
- `analytics` — reading performance data
- `content-strategy` — posting cadence, what works on Shorts
- `copywriting` — hook and caption writing
- `image` — visual content guidance
- `marketing-ideas` — generating content angles
- `marketing-psychology` — what makes people click/watch
- `social` — social media specific
- `video` — script structure for Shorts

**Removed:** `stop-slop` (from `hardikpandya/stop-slop`) — its install was broken (empty directory, never worked); deleted 2026-07-02. Reinstall from that repo if wanted.

**How to invoke:** `/skill-name` in Claude Code. Must be called explicitly — they don't auto-trigger.
