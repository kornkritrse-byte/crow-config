# crow-config

Claude Code config files — the Crow persona and memory — synced across devices.

## Structure

```
crow-config/
├── CROW.md            → copy to ~/CLAUDE.md (or C:\Users\<you>\CLAUDE.md)
└── memory/            → copy to ~/.claude/projects/<project-slug>/memory/
```

> **Why CROW.md and not CLAUDE.md?** The loaded copy lives at `~/CLAUDE.md`, which Claude Code
> picks up from any working directory under home — including this repo. If the repo copy were
> also named `CLAUDE.md`, sessions run from inside the repo would load the whole persona twice.
> So the repo copy is storage only, under a name Claude Code ignores.

## Daily sync

- `load.sh` / `load.ps1` — pull from GitHub, copy CROW.md → ~/CLAUDE.md + memory into place. Run when switching machines.
- `save.sh` / `save.ps1` — copy local ~/CLAUDE.md + memory into the repo, commit, push. Only commits when something changed.

## Hooks (the part that makes it automatic)

The hook *logic* lives in `hooks/` so it travels with the repo. Only the per-machine wiring sits in `~/.claude/settings.json`.

- `hooks/session-start.sh` — auto-loads the SITREP (live copy, repo fallback) + an upcoming-events banner into context at session start, so Crow wakes up caught-up.
- `hooks/stop.sh` — two-phase close: if the SITREP wasn't updated in the last 45 min, it blocks the first stop and has Crow rewrite it (rolling 2-session window); then runs `save.sh` to push memory changes to GitHub automatically.

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
copy CROW.md C:\Users\<username>\CLAUDE.md
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
