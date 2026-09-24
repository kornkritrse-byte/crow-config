---
name: reference-obsidian
aliases: ["reference-obsidian"]
description: Obsidian is installed on the Mac and opens THIS memory folder as a vault (graph view of the whole Crow system)
metadata:
  type: reference
---

Set up 24 Sep 2026 on Korn's ask (Crow objected on timing: 3 days before BA202; he overrode, fair call — zero effort on his side).
- Installed via `brew install --cask obsidian`; vault = the live memory folder, registered in `~/Library/Application Support/obsidian/obsidian.json`.
- Links here resolve by `name:` slug, not filename, so every memory file got an `aliases: ["<name>"]` frontmatter line. **Keep adding `aliases` to new memory files** or they show as unresolved nodes in the graph.
- `memory/.obsidian/` is gitignored in crow-config (UI state, not memory).
- ⚠️ Renaming a file inside Obsidian rewrites links — don't rename memory files from Obsidian.
