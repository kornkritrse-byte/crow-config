---
name: feedback-markitdown
description: "Suggest MarkItDown (pip install markitdown[all]) when user shares large PDFs that could waste tokens"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 41db1cf3-61a6-43ab-906e-eef21c9471e9
---

When he shares a large PDF (especially uni lecture notes, readings, or multi-chapter documents), suggest converting it with MarkItDown first before reading it directly.

**Why:** Claude Code's native PDF reading works fine for small files, but large PDFs consume tokens unnecessarily. He's aware of this and wants to be reminded to use MarkItDown as the efficient alternative.

**How to apply:** If a PDF is 10+ pages or looks dense, suggest `markitdown file.pdf > file.md` before reading it. MarkItDown is not yet installed — if needed, install with `pip install 'markitdown[all]'`.
