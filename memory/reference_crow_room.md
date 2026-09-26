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
- **Design:** "Bangkok night in the rain": slate-blue #131c26, paper text, Literata + Schibsted Grotesk. **Accent = maroon** (his call 27 Sep 01:13: "make the purple accents maroon"): `#7a2436` for fills, `#c86a7a` when it has to be readable text on the dark background. Crew: Sol gold · Persi ember · Artis jade · Vera silver · **Vex steel blue** (moved off magenta so it doesn't clash with the maroon).
- **Round 2 (27 Sep 01:13–01:35):** model picker bottom-right (Opus 5.5 / Fable 5.1 / Sonnet 5 / Haiku 4.5, choice kept in `ui/.model`). Security fix: the WebSocket now accepts only the Room's own origin. Before that, any website open in the browser could have driven Crow. Crash recovery (the next message resumes in a fresh process), `--resume` reloads the visible history, links open in a new tab, AskUserQuestion is disabled (Crow asks in text), markdown libraries served locally, and the launcher's `--stop` was fixed (it was matching by path). Layout: starter chips when empty, tool steps fold into "N steps", times on his messages, a Jump to latest button, a shortcut hint, the status panel collapsed behind "Show all", and the ghost card moved above the status.
- **Diagnostics passed (27 Sep, on a test server with Haiku):** a foreign origin gets 401 · model switch really changes the model · the Allow card appears and runs the tool · Stop mid-stream, then the next turn works · killing Crow's process, then the next message recovers with memory intact · a server restart with `--resume` keeps memory · path traversal gets 404.
- **Speed:** fast mode is the only speedup that doesn't cost quality, and it's **blocked: `extra_usage_disabled`** (he's on **Claude Pro**; fast mode bills as extra usage). Turning extra usage on in claude.ai settings would unlock it, but it costs money, so that's his call. The per-turn hooks measured under 0.1s, so they aren't the bottleneck. The process is now warmed at startup.
- The SDK's `total_cost_usd` is an API-price estimate; on Pro it isn't a bill, so the Room doesn't show it.
- **Still untested:** slash commands in the Room.
- Skills installed for it (from anthropics/skills): `frontend-design`, `webapp-testing` → `crow-config/.claude/skills/`. Node Playwright is global at /opt/homebrew/lib/node_modules/playwright (the Python one isn't installed).
- **Ideas not built:** a now-playing (Spotify) strip, a said/did ledger panel, the chapter soundtrack per session.
