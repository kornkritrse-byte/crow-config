#!/usr/bin/env bash
# setup-mac.sh — one-shot Crow setup on a fresh Mac.
# Idempotent: safe to re-run. Assumes Node, npm, git, and the Claude CLI are installed
# and you've already cloned this repo to ~/crow-config (or wherever) and run from inside it.
set -euo pipefail

repoDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$repoDir"

echo "==> 1/5  Pulling latest + loading CROW.md -> ~/CLAUDE.md and memory into place"
bash load.sh

echo "==> 2/5  Installing google-docs MCP package"
npm install -g @suncreation/mcp-google-docs

echo "==> 3/5  Registering google-docs MCP server via the fetch-fix launcher (user scope)"
# The package's bundled node-fetch@2.7.0 is broken against googleapis on modern Node
# (ERR_STREAM_PREMATURE_CLOSE on every call). bin/gdocs-launcher.cjs routes it through
# Node's built-in fetch. Always register the launcher, never the raw dist/server.js.
mkdir -p "$HOME/.google"
claude mcp remove -s user google-docs >/dev/null 2>&1 || true
claude mcp add -s user google-docs \
  -e CREDENTIALS_PATH="$HOME/.google/credentials.json" \
  -e TOKEN_PATH="$HOME/.google/token.json" \
  -- node "$repoDir/bin/gdocs-launcher.cjs"

echo "==> 4/5  Making hooks executable"
chmod +x "$repoDir"/hooks/*.sh "$repoDir"/*.sh

echo "==> 5/5  Wiring SessionStart + Stop hooks into ~/.claude/settings.json (preserves existing keys)"
node - "$repoDir" <<'NODE'
const fs = require("fs");
const repoDir = process.argv[2];
const path = require("path");
const settingsPath = path.join(process.env.HOME, ".claude", "settings.json");
let s = {};
try { s = JSON.parse(fs.readFileSync(settingsPath, "utf8")); } catch {}
s.hooks = s.hooks || {};
const mk = (script) => ([{ hooks: [{ type: "command", command: `bash ${repoDir}/hooks/${script}` }] }]);
s.hooks.SessionStart = mk("session-start.sh");
s.hooks.Stop = mk("stop.sh");
fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
fs.writeFileSync(settingsPath, JSON.stringify(s, null, 2) + "\n");
console.log("    settings.json updated:", settingsPath);
NODE

echo
echo "Done. Two things still need YOUR hands (can't be automated):"
echo "  1. Drop your Google OAuth client at ~/.google/credentials.json (copy from old machine),"
echo "     then run any google-docs tool once to trigger the browser OAuth -> token.json."
echo "  2. (Only if porting coldesthoops) install ffmpeg + rclone and port build_video.ps1."
echo
echo "Restart Claude Code so the hooks + MCP server load."
