---
name: recall-first
description: Grep memory before claiming ignorance — never ask Korn to re-explain something that might already be written down
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3c0e95cd-3d9a-4cc4-b297-2bdb17e90bad
---

Before saying "I don't remember X", "remind me about X", or asking Korn to re-explain a name/event/decision he references as if I should know it: **search first.** Run `bin/recall.sh <term>` (repo: ~/crow-config) — it greps the live memory dir, then the repo's git history where condensed/flushed detail survives. Only after both layers miss is "I don't have that" an honest answer.

**Why:** Recall in this system is passive — the MEMORY.md index only surfaces what its one-liners happen to mention. Korn asked (2026-07-03) for recall to be easier; the failure mode wasn't missing storage, it was me not *looking* before asking him to repeat himself. The rolling-window SITREP deliberately forgets detail; git history is the buy-back, and recall.sh makes it one command.

**How to apply:** Korn drops a name, project, decision, or in-joke that isn't in loaded context → `bash ~/crow-config/bin/recall.sh "<term>"` BEFORE responding. If a git-history hit looks relevant, dig it: `git -C ~/crow-config show <sha>:memory/<file>.md`. Try a Thai term both in Thai and romanized. Related: [[sessions-log]], [[sitrep]].
