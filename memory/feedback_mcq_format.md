---
name: feedback-mcq-format
description: "Any multiple-choice question to Korn — drill, BA202 practice, or a quick check — goes in the ```mcq fenced-JSON card format, never plain-text lettered options. Always, no exceptions."
metadata:
  node_type: memory
  aliases:
    - feedback-mcq-format
  type: feedback
  originSessionId: aedbda08-156b-4dc8-8884-ea333cc92af1
  modified: 2026-11-22T03:58:20.508Z
---

**His ask, 22 Nov 2026 (Room session): "can you make all the mcq questions in mcq format please always do that write it in memory!"** Standing rule, not a one-off.

Any time Korn is being given options to pick from by letter — an MCQ drill question, BA202-style exam practice, or a quick multiple-choice check — it goes in the Room's ```mcq fenced block (strict JSON: `{"q", "options", "multi"?}`), never written out as plain markdown lettered options (A) ... B) ...). The mcq card format and its rules (one per message, card last, no hints, grade in the first line) are documented in `ui/server.mjs` ROOM_NOTE and [[reference-crow-room]].

**Why:** the card is what drives the tick-boxes, the note box, and the "Lock it in" flow — a plain-text version skips all of that and also can't feed the [[reference-crow-room]] MCQ percentage tube (22 Nov build: `bin/mcq.py` logs each graded MCQ, the tube between the hoop and the book pile fills with the rolling % correct). Plain-text MCQs are invisible to that pipeline.

**How to apply:** whenever about to pose a multiple-choice question in the Room, the ```mcq fence is the default, not a special case for "real" drills. If it has lettered options, it's an mcq card. After grading it in chat, log it that turn (`python3 bin/mcq.py add correct|wrong "<topic>"`) so the tube reflects it.
