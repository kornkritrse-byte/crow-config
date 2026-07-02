---
name: rubnong-flow-sheet
description: The live รับน้อง 34x35 run-of-show Google Sheet + the editing gotchas that bite every session
metadata: 
  node_type: memory
  type: reference
  originSessionId: 016bee68-bfd3-4b59-bac2-60240df18e84
---

Live run-of-show for รับน้อง camp (27–29 July 2026): **"Copy of Drafted flow RubNong 34x35"**, sheet ID `1Dc-7JKw11IdSJXSdLJj24eYmo479Gbje8XgdwgTzmgs`. Three tabs: Day 1 (gid 0), Day 2 (451205519), Day 3 (675384482). Must be shared as **Editor** with kornkritrse@gmail.com or the MCP can't write (Viewer = read-only).

Layout per row: A start / B "-" / C end (block range, sometimes merged across sub-rows) · D slot-start / E slot-end / F duration(min) · G early / H late · I activity · J detail · K note. A running "changes made:" changelog lives at the bottom of Day 1 (~row 37+).

**Gotchas (will recur):**
- **Merged cells can't be unmerged via the google-docs MCP** (no unmerge/insert-row/delete-row tools). Day 1 bottom REFLECT block (rows 32–33) and Day 3 Santanakarn (rows 15–16) are vertical 2-row merges. Adding a row shoves content into the merge bottom, which silently swallows writes (A–I). Workaround: route content past it / leave a blank row; tell Korn to right-click → Delete row or unmerge in the UI for a clean finish.
- **Time storage is inconsistent.** Most cells are plain text strings ("13:25"); some (Day 3 afternoon, rows 19–24) were time-VALUES (0.538 = 12:55) that lost formatting mid-edit and rendered as raw decimals. Fix = rewrite as RAW text strings. Always write times with `valueInputOption: RAW` so they stay literal and don't get re-parsed.

Korn iterates fast on this and likes time-neutral offsets (add X min here, cut X there to keep the end time fixed) — but confirm, he doesn't always want the offset. See [[sitrep]].
