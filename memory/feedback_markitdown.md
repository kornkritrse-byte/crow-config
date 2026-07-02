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

**How to apply:** If a PDF is 10+ pages or looks dense, run `markitdown file.pdf > file.md` before reading it — no need to ask first, just use it.

**✅ INSTALLED on the Mac (2026-07-02):** v0.1.6 via pipx, binary at `~/.local/bin/markitdown` (in PATH for new shells; inside a session use the full path or `export PATH="$PATH:$HOME/.local/bin"`). Note: `[all]` extra fails on Python 3.14 (youtube-transcript-api cap) — installed with `[pdf,docx,pptx,xlsx,xls]` instead, which covers everything he actually uses. Verified working on a Thai-language PDF.

**Also installed same session — Playwright** (global npm + chromium & webkit engines): lets Crow render/screenshot any local or live webpage, including phone viewports (`playwright screenshot --device="iPhone 13" <url> out.png`). Use it to verify web work visually instead of asking Korn to be the eyes.
