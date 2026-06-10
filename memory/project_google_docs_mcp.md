---
name: project-google-docs-mcp
description: Google Docs MCP fully set up and registered — should connect on next session start
metadata: 
  node_type: memory
  type: project
  originSessionId: 41db1cf3-61a6-43ab-906e-eef21c9471e9
---

Google Docs MCP (`@suncreation/mcp-google-docs`) is installed and registered as of 2026-06-04.

**Status:** Properly registered via `claude mcp add -s user`. Server starts and authorizes successfully. Tools will be available from the next Claude Code session onward.

**Key lesson:** Claude Code reads MCP servers from `~/.claude.json` (via `claude mcp add`), NOT from `~/.claude/mcp.json`. The manual mcp.json file was wrong and did nothing. Always use `claude mcp add` to register servers.

**Files:**
- Credentials: `C:\Users\Korn\.google\credentials.json`
- OAuth token: `C:\Users\Korn\AppData\Roaming\npm\node_modules\@suncreation\mcp-google-docs\token.json`
- Registration: stored in `C:\Users\Korn\.claude.json` (user scope — all projects)

**Server command:**
`node C:\Users\Korn\AppData\Roaming\npm\node_modules\@suncreation\mcp-google-docs\dist\server.js`

**Why:** He wants to read, edit, and sync Google Docs for รับน้อง camp planning and general use.

**How to apply:** In any new session, google-docs tools should be available automatically. If not, run `claude mcp get google-docs` to verify status. Test by sharing a Doc link.
