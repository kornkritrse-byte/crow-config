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
- 📌 **Post-midterms project (his call, 24 Sep): "make Obsidian cool".** Ideas Crow pitched: (1) commonplace book / reading notes (strongest fit — he collects other people's lessons) · (2) cross-term course knowledge base so study material stops dying after each exam · (3) daily/deep-night notes. Crow's objection on record: value only exists if HE writes in it; and his writing should live in a SEPARATE folder, not inside Crow's memory vault.
- 📚 **Study notes live in `study/` inside the vault** (kept apart from memory files). First one: `study/AC311 - Cost Flow and NOI.md` (25 Sep), 7 sections: flow · two-sided NOI test · ownership rules · Problem 4 (a)–(c) · SOCI write-down lines · delivery template · which number goes where + the demo key's errors. Opened via `open "obsidian://open?path=<urlencoded abs path>"`.
