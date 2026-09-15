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

**Diagram plugin** (installed 2026-09-15, Korn's call — "better to have than not at all"):
- `diagram-design@diagram-design` v2.6.23, from GitHub `cathrynlavery/diagram-design`. User scope. ~577 tok always-on, ~15.2k on invoke.
- 39 diagram types → self-contained HTML/SVG/PNG, no external deps. Study-relevant ones: **flowchart, tree, state machine, swimlane, quadrant, fishbone, Venn, pyramid/funnel, timeline, Sankey**.
- 7 skills ship with it: `diagram-design` (the main one), `export-diagram`, `import-mermaid`, `import-drawio`, `import-excalidraw`, `doctor`, `profile`.
- Installed via CLI, not the slash command: `claude plugin marketplace add <repo>` then `claude plugin install <name>@<marketplace>`. **Skills load on the NEXT session, not the one that installed them.**
- ⚠️ Third-party code, not audited.

**Considered and rejected 2026-09-15** (don't re-suggest without a reason): excalidraw skills (`coleam00`, `yctimlin`) — need uv+Playwright+Chromium; `doasfrancisco/anki-skill` — needs Anki desktop, SRS pays off over weeks not days; `maaarcooo/agent-skills` study tools — Claude.ai upload packages, not Claude Code; `WH-2099/mermaid-skill` — redundant, artifacts render Mermaid natively.

**Removed:** `stop-slop` (from `hardikpandya/stop-slop`) — its install was broken (empty directory, never worked); deleted 2026-07-02. Reinstall from that repo if wanted.

**How to invoke:** `/skill-name` in Claude Code. Must be called explicitly — they don't auto-trigger.
