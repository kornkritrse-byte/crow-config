# crow-config

Claude Code config files — CLAUDE.md and memory — synced across devices.

## Structure

```
crow-config/
├── CLAUDE.md          → copy to your home directory (~/ or C:\Users\<you>\)
└── memory/            → copy to ~/.claude/projects/<project-slug>/memory/
```

## Daily sync

- `load.sh` / `load.ps1` — pull from GitHub, copy CLAUDE.md + memory into place. Run when switching machines.
- `save.sh` / `save.ps1` — copy local CLAUDE.md + memory into the repo, commit, push. Only commits when something changed.

## Hooks (the part that makes it automatic)

The hook *logic* lives in `hooks/` so it travels with the repo. Only the per-machine wiring sits in `~/.claude/settings.json`.

- `hooks/session-start.sh` — auto-loads the SITREP into context at session start (Crow wakes up caught-up).
- `hooks/stop.sh` — runs `save.sh` on session stop, pushing memory changes to GitHub automatically.

## Setup on a new device

**Mac/Linux (one shot):**
```
git clone https://github.com/kornkritrse-byte/crow-config.git ~/crow-config
cd ~/crow-config && ./setup-mac.sh
```
`setup-mac.sh` is idempotent: pulls + loads, installs/registers the google-docs MCP, and wires the hooks
into `settings.json` (preserving existing keys). Then drop your Google OAuth `credentials.json` into
`~/.google/` and restart Claude Code.

**Windows (manual):**
```
copy CLAUDE.md C:\Users\<username>\CLAUDE.md
xcopy memory C:\Users\<username>\.claude\projects\C--Users-<username>\memory\ /E /I
```

> Note: the project slug in `.claude/projects/` is derived from your working directory path
> (`/Users/you/crow-config` → `-Users-you-crow-config`). Check which folder Claude Code uses on your machine.

## What does NOT travel in this repo

Per-machine tooling that must be re-installed on each device:
- **MCP servers** — Calendar/Gmail/Drive/Spotify/Canva are account-based (auto-connect via claude.ai login).
  The **google-docs MCP** (direct Sheets/Docs editing) is a local npm package — `setup-mac.sh` installs it,
  but its OAuth `credentials.json` must be copied in by hand (it's a secret, kept out of git).
- **coldesthoops pipeline** — `build_video.ps1` + rclone + ffmpeg. Windows/PowerShell-specific; a real port job.
