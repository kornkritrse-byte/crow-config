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
- **Sync-machinery fixes DONE (his go):** (1) save.sh/save.ps1 now MIRROR memory (rsync --delete / robocopy /MIR) — deletes propagate, zombie files dead, renames now safe; guarded on sitrep.md existing in the source so a wrong-slug/empty dir can never wipe the repo. (2) stop.sh skips the rewrite-block when sitrep.md was modified in the last 45 min (it nagged 4× tonight on an already-fresh sitrep); trade-off: a fresh sitrep also skips the nightly-quote reminder. (3) session-start.sh reads the LIVE sitrep, repo copy is a labeled fallback. All three paths tested live (block fires on stale, skips on fresh, sync committed clean).
- **QoL batch DONE (his go, end of night):** load.sh/load.ps1 now mirror too (deletions can't bounce back cross-machine); save.sh/save.ps1 push whenever ahead of origin (offline commits no longer strand); skills cleaned (duplicate .agents/ deleted, broken stop-slop submodule stub removed, skills-lock pruned 43→9, reference_skills.md updated); README/setup-mac.sh docs synced to reality; git identity set repo-only (commits were "kornkrit@MacBook-Neo.local"). **NEW: session-start banner** shows closest upcoming event + days-to-camp, fed by [[reference-upcoming-events]] — that file MUST be mirrored whenever calendar events change in-session; it is NOT live calendar data. All tested.
- **Needs Korn's hand:** pruning dead entries from `.claude/settings.local.json` (blocked as self-modification — the 3 lines to delete: `Read(//Users/kornkrit/Downloads/crow-config-main/**)`, `Bash(rm -rf ~/Downloads/crow-config-main)`, and the mangled `__CMDSUB_OUTPUT__` grep entry; also the one-off `Bash(grep -iA3 -E ...)` line).
- **Parked by Korn:** Bass Trainer Mac port ("can wait" — needs the Windows laptop awake). Explicitly not worth doing: flow-sheet rename (unblocked now but cosmetic), log pruning, sixth crew member.

## Session — 2026-07-02 (late afternoon): RBIS website for his mom — shipped
- One-session build: added her 18 photos (17 placed, descriptive filenames) to the RBIS one-page site, hamburger mobile nav, white/navy transparent logos generated from her `rbis logo.png` (Pillow, luminance→alpha).
- Delivered `~/Downloads/rbis-site/` (index.html + images/) + `rbis-site.zip`. **He deployed via Netlify Drop and sent his mom the public URL.** Update flow: I edit → he re-drags the folder onto the site's Deploys tab, same URL.
- Only-if-mom-asks threads: navy-shield logo needs a white chip (1 CSS line); hero photo slightly soft on 4K; view via the Netlify URL, not iOS Files/Quick Look.
