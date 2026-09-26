---
name: reference-crow-room
aliases: ["reference-crow-room"]
description: Crow Room — Korn's custom browser interface for Crow (ui/ in crow-config, Claude Agent SDK); how to launch it and what's untested
metadata:
  type: reference
---

**Crow Room** (built 27 Sep 2026, ~01:00–01:15, at his ask: "change the whole interface… construct the whole thing").
A local web app at `~/crow-config/ui/` that runs a real Claude Code session through the **Claude Agent SDK** (`@anthropic-ai/claude-agent-sdk`) in `~/crow-config`. It uses the same CLAUDE.md, hooks, Crow output style, memory and login as the CLI. Sessions land in the same project history, so the terminal can resume them.

- **Launch:** `bash ~/crow-config/bin/crow-room.sh` → http://localhost:4711 · `--resume` = the last Room session · `--stop`
- **Layout:** crew rail on the left (click a member to prefix "Vera, "), the conversation in the middle (any paragraph opening "Name:" renders in that crew member's colour), and a board on the right: Bangkok clock, next 4 events from [[reference-upcoming-events]], the SITREP status line, and the next ghost card from [[ghost-deck]]. Permission prompts appear inline as Allow/Deny. Esc or Stop interrupts.
- **Design:** "Bangkok night in the rain": slate-blue #131c26, paper text, Literata + Schibsted Grotesk; crew colours Sol gold · Persi ember · Artis jade · Vera silver · Vex magenta · Crow violet.
- **Verified 27 Sep:** a real turn streamed in the Crow style with the clock hook firing; desktop and phone screenshots checked; launcher serves 200.
- **NOT yet tested:** the inline permission prompt with a real tool (permissionMode is `auto`, so most calls never ask), interrupt, `--resume`, and slash commands.
- Skills installed for it (from anthropics/skills): `frontend-design`, `webapp-testing` → `crow-config/.claude/skills/`. Node Playwright is global at /opt/homebrew/lib/node_modules/playwright (the Python one isn't installed).
- **Ideas not built:** a now-playing (Spotify) strip, a said/did ledger panel, the chapter soundtrack per session.
