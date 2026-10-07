---
name: reference-skills
aliases: ["reference-skills"]
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

**Design/build skills** (from `anthropics/skills`, the official repo; installed 2026-09-27 for the [[reference-crow-room]] build; read in full before installing):
- `frontend-design`: guidance for distinctive, non-templated UI design (palette, type, layout, self-critique).
- `webapp-testing`: Playwright testing and screenshots of local web apps. The skill is written for Python Playwright; this Mac has **Node** Playwright globally, so adapt its scripts.

**Global skills, `~/.claude/skills/` (work in EVERY project, incl. his habit tracker; added 7 Oct 2026, his ask):**
- `frontend-design`: a copy of the crow-config one. The `anthropics/claude-code` plugin's SKILL.md is byte-identical to it (checked 7 Oct), so there was nothing new to download.
- `ui-ux-pro-max` v2.13.0 (from `nextlevelbuilder/ui-ux-pro-max-skill`, MIT, commit 477bcb2): a local, searchable design database (79 styles, 192 palettes, 74 font pairings, 119 UX rules, 22 stacks) queried via `python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system | --domain X | --stack Y`. Only the core skill was installed; the repo's extras (brand, logo, slides, banner, design-system, ui-styling) were left out. Its SKILL.md paths were rewritten from `${CLAUDE_PLUGIN_ROOT}` to `$HOME/.claude/skills/...`, and `scripts/tests` was dropped. Audited 7 Oct: stdlib-only Python, no network/subprocess, no injected instructions in the text or data. **Never executed yet** (auto mode blocked the first run of external code), so the first real use is the test.
