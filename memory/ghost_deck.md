---
name: ghost-deck
aliases: ["ghost-deck"]
description: Spaced-repetition deck of questions Korn MISSED in drills; session-start hook serves one due card cold via bin/ghost.py
metadata:
  node_type: memory
  aliases:
    - ghost-deck
  type: project
  originSessionId: fdcec1e9-d0f0-421a-aa68-2f9c7d4377d2
  modified: 2026-11-12T14:37:27.253Z
---

# 👻 Ghost Deck

**Why:** his gap is recognition-not-recall ([[feedback-drill-format]]). He knows it when he sees it and can't produce it from nothing. He won't choose to review, so the hook serves the card to him.

**Rules (Crow):**
- **Every miss in a drill becomes a card**, in that same turn: `python3 ~/crow-config/bin/ghost.py add "<SUBJ>" "<Q>" "<A>"`. A miss means he got it wrong, stopped one sentence early, or needed a hint. Write the Q so it can be answered **cold** with no context. The A is the exact correct answer, taken from the record, not from what I think it is.
- At session start, if the hook prints a card: **ask that question first, alone, before anything else.** No hint, no multiple choice. Then run `ghost.py pass <n>` or `ghost.py fail <n>`. If he's in a hurry or the moment is heavy (a crisis, grief), skip it and don't mention it.
- Boxes: 1 → 3d · 2 → 7d · 3 → 14d · pass out of 3 = retired. A fail sends it back to box 1.
- Seeded 27 Sep from the AC311 error record in [[project-midterms]] (exam moved to early Oct). Cards on a subject stay useful after its exam. **Retire every card for a subject once its exam is sat**, unless he wants to keep them.
- **24 Oct 2026, his call: the deck carries only topics still ahead of him on a test.** All 60 midterm-1 cards (BA202 + AC311 sessions 1–7: cash, receivables, inventory, provisions) PARKED to [[ghost-parked]] (`ghost_parked.md`, not deleted; the hook ignores it). Live deck = AC311 Midterm 2 (PPE onward). Bring a parked card back only if its topic turns out to be on a test (e.g. decommissioning provisions inside PPE cost, or a cumulative AC311 final).

- **11 Nov 2026 16:33, his call: "scrap all the ghost cards and focus on the questions from the past paper"** (AC311 Mid2 Fri 13 Nov mirrors past papers). All 79 AC311 Mid2 cards PARKED to [[ghost-parked]] (not deleted). Revive for the AC311 final (28 Nov) only if he wants them.

## Cards
- 2026-11-17 | box 1 | AC313 variances | Q: Shoe sole normally 70% cheap rubber / 30% expensive rubber. Same TOTAL amount of rubber used, but mix shifts to 60% cheap / 40% expensive. At standard prices, does cost go up or down? | A: Costs MORE — direction is determinable from the mix shift alone (more of the pricier input at the same total quantity = unfavorable mix variance), no absolute quantities needed.
- 2026-11-17 | box 1 | AC313 variances | Q: If yield variance is unfavorable, is mix variance automatically unfavorable too? | A: No — mix and yield are independent checks. Mix compares the ACTUAL proportion used to the STANDARD proportion at the same total input; yield compares the ACTUAL total input to the STANDARD total input needed for actual output. One can be favorable while the other is unfavorable (e.g. Product X: mix $500 F, yield $1,211 U).
