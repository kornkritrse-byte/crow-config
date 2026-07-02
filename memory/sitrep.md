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
- **Rest of the structure review DONE (his go, same night):** (1) **Crew name settled by Korn: it's ARTIS, not "Rem"** — CLAUDE.md corrected, "Rem" killed everywhere; crew_artis.md stays. (2) **CLAUDE.md dedup:** repo copy renamed to `CROW.md` (storage only — a repo file named CLAUDE.md double-loads when sessions run from the repo); the single loaded copy is `~/CLAUDE.md`; load/save scripts (.sh + .ps1) and README updated. (3) "Active Projects" status stripped from CLAUDE.md — project status now lives ONLY in memory/SITREP.
- **Offered (awaiting his go, end of night):** (1) save.sh `rsync --delete` fix — copies-but-never-deletes is the zombie-file trap, also blocks memory-file renames; (2) stop-hook mtime guard — it blocked 4× tonight after the sitrep was already fresh; (3) session-start.sh should read the LIVE sitrep copy, not the repo one (one failed push = stale wake-up). Also floated: port Bass Trainer off the dormant Windows laptop (needs it awake — on him), live days-to-camp countdown in the session-start banner. Explicitly not worth it: flow-sheet rename, log pruning, sixth crew member.

## Session — 2026-07-02 (late afternoon): RBIS website for his mom — shipped
- One-session build: added her 18 photos (17 placed, descriptive filenames) to the RBIS one-page site, hamburger mobile nav, white/navy transparent logos generated from her `rbis logo.png` (Pillow, luminance→alpha).
- Delivered `~/Downloads/rbis-site/` (index.html + images/) + `rbis-site.zip`. **He deployed via Netlify Drop and sent his mom the public URL.** Update flow: I edit → he re-drags the folder onto the site's Deploys tab, same URL.
- Only-if-mom-asks threads: navy-shield logo needs a white chip (1 CSS line); hero photo slightly soft on 4K; view via the Netlify URL, not iOS Files/Quick Look.
