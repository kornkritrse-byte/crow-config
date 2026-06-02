# crow-config

Claude Code config files — CLAUDE.md and memory — synced across devices.

## Structure

```
crow-config/
├── CLAUDE.md          → copy to your home directory (~/ or C:\Users\<you>\)
└── memory/            → copy to ~/.claude/projects/<project-slug>/memory/
```

## Setup on a new device

**Windows:**
```
copy CLAUDE.md C:\Users\<username>\CLAUDE.md
xcopy memory C:\Users\<username>\.claude\projects\C--Users-<username>\memory\ /E /I
```

**Mac/Linux:**
```
cp CLAUDE.md ~/CLAUDE.md
cp -r memory/ ~/.claude/projects/-Users-<username>/memory/
```

> Note: the project slug in `.claude/projects/` is derived from your working directory path. Check which folder Claude Code uses on your machine.
