---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
---

# Situation Report
*Last updated: 2026-07-02 (night)*

## 📏 REWRITE RULE (Crow, at every session end — the Stop hook enforces this)
1. Rewrite this file before the session closes. Keep ONLY: the sections below + session notes for the last **two** sessions.
2. Tonight's note goes on top; the note that falls out of the window moves to [[sessions-log]] (condense it there — full text survives in git history).
3. Durable facts (IDs, schedules, decisions, gotchas) do NOT live here — push them into the right project/reference memory file and link it.
4. If the session was trivial, just update the date and write a one-line note. Target: this file stays under ~60 lines. Longer means something didn't get flushed.

## 🎯 Current state
- **รับน้อง = the ONLY active priority** (camp 25–27 Jul). All standing facts, IDs, July schedule, and open threads: [[project-rubnong-tracker]]. Hottest items: props deadline was 30 Jun — status unknown; Dialogue scene 5 due 5 Jul; canonical workshop flow still unbuilt (rebuild offered, waiting on his go).
- **coldesthoops PAUSED** (don't surface until he unpauses — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Possible next session (his words):** reflecting on *Brothers Karamazov* — last known position Book 7. **Ask where he is before saying anything — no spoilers** (especially the Epilogue stone speech).
- Bass Trainer Module 3 pending when he wants it ([[project-bass-trainer]]). Show with friends upcoming.

## Session — 2026-07-02 (night): SITREP goes rolling-window
- Korn asked whether the config + crew structure is efficient. Verdict delivered: crew is fine (lenses, not workers — no sixth member); the files weren't. Biggest offender: this file — 203 lines, bottom half contradicting the top (stale "coldesthoops active" section, dead Windows paths, superseded dates).
- **Rebuilt the SITREP system on his go:** rolling 2-session window + rewrite rule above; old session notes flushed to new [[sessions-log]]; standing rubnong facts consolidated into [[project-rubnong-tracker]] (now the canonical camp file); [[project-google-docs-mcp]] rewritten Mac-era (launcher, node-fetch bug, ~/.google paths).
- **`hooks/stop.sh` rewritten:** now blocks the first stop and instructs Crow to rewrite the SITREP (+ nightly quote if missed), then syncs to GitHub on the real stop. Fired for the first time at this session's own close — mechanism confirmed live end-to-end.
- Still open from tonight's structure review (flagged, not yet approved): strip the duplicated "Active Projects" status out of CLAUDE.md (memory should be the single source of truth), dedupe ~/CLAUDE.md vs repo CLAUDE.md, rename crew_artis.md → crew_rem.md.

## Session — 2026-07-02 (late afternoon): RBIS website for his mom — shipped
- One-session build: added her 18 photos (17 placed, descriptive filenames) to the RBIS one-page site, hamburger mobile nav, white/navy transparent logos generated from her `rbis logo.png` (Pillow, luminance→alpha).
- Delivered `~/Downloads/rbis-site/` (index.html + images/) + `rbis-site.zip`. **He deployed via Netlify Drop and sent his mom the public URL.** Update flow: I edit → he re-drags the folder onto the site's Deploys tab, same URL.
- Only-if-mom-asks threads: navy-shield logo needs a white chip (1 CSS line); hero photo slightly soft on 4K; view via the Netlify URL, not iOS Files/Quick Look.
