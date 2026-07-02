---
name: project-google-docs-mcp
description: "google-docs MCP working on the Mac via bin/gdocs-launcher.cjs — setup, credential paths, and the node-fetch bug that bites on every new machine"
metadata:
  node_type: memory
  type: project
  originSessionId: 41db1cf3-61a6-43ab-906e-eef21c9471e9
---

google-docs MCP (`@suncreation/mcp-google-docs` v1.3.5, global npm) — **WORKING on the Mac** since 2026-06-24, proven end-to-end (reads/writes real Docs & Sheets in-session).

**How it's wired (Mac):**
- Registered user-scope via `claude mcp add` (config lives in `~/.claude.json` — NOT a manual mcp.json, that does nothing).
- The server command is `node ~/crow-config/bin/gdocs-launcher.cjs` — **never the raw dist/server.js** (see bug below). `setup-mac.sh` registers it this way.
- Credentials: `~/.google/credentials.json` (OAuth desktop client from GCP project `crow-docs`; chmod 600; NOT in git). Token: `~/.google/token.json` (refresh token only).
- Consent screen is **published to Production**, so the refresh token doesn't expire every 7 days like Testing mode.

**THE BUG (matters on every future machine):** the package bundles `node-fetch@2.7.0`, which is broken against `*.googleapis.com` on modern Node — every call dies with `ERR_STREAM_PREMATURE_CLOSE`. Not network, not Node version, not gzip. Node's built-in fetch works fine. The fix is `bin/gdocs-launcher.cjs` (in the repo): intercepts `require('node-fetch')` and returns a built-in-fetch shim.

**If tools are missing in a session:** `claude mcp get google-docs` to check registration; restart Claude Code after any registration change.

**Why:** direct Docs/Sheets editing is the backbone of the รับน้อง work (deadlines sheet, availability grid, flow docs).

**History:** first set up on Windows 2026-06-04 (paths were `C:\Users\Korn\...` — dead now). Re-authed after an `invalid_grant` on 2026-06-15. Mac port + launcher fix 2026-06-24.
