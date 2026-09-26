---
name: ghost-deck
description: Spaced-repetition deck of questions Korn MISSED in drills; session-start hook serves one due card cold via bin/ghost.py
metadata:
  node_type: memory
  aliases:
    - ghost-deck
  type: project
  originSessionId: fdcec1e9-d0f0-421a-aa68-2f9c7d4377d2
  modified: 2026-09-26T17:27:33.905Z
---

# 👻 Ghost Deck

**Why:** his gap is recognition-not-recall ([[feedback-drill-format]]). He knows it when he sees it and can't produce it from nothing. He won't choose to review, so the hook serves the card to him.

**Rules (Crow):**
- **Every miss in a drill becomes a card**, in that same turn: `python3 ~/crow-config/bin/ghost.py add "<SUBJ>" "<Q>" "<A>"`. A miss means he got it wrong, stopped one sentence early, or needed a hint. Write the Q so it can be answered **cold** with no context. The A is the exact correct answer, taken from the record, not from what I think it is.
- At session start, if the hook prints a card: **ask that question first, alone, before anything else.** No hint, no multiple choice. Then run `ghost.py pass <n>` or `ghost.py fail <n>`. If he's in a hurry or the moment is heavy (a crisis, grief), skip it and don't mention it.
- Boxes: 1 → 3d · 2 → 7d · 3 → 14d · pass out of 3 = retired. A fail sends it back to box 1.
- Seeded 27 Sep from the AC311 error record in [[project-midterms]] (exam moved to early Oct). Cards on a subject stay useful after its exam. **Retire every card for a subject once its exam is sat**, unless he wants to keep them.

## Cards
- 2026-09-28 | box 1 | AC311 | Q: A purchase commitment was provisioned last year. On delivery day, write the four lines of the entry. | A: Dr Inventory (at lower of cost/NRV, i.e. market) · Dr Provision (the FULL balance) · Cr Cash (the contract price) · the difference = Loss (Dr) or Recovery (Cr). Never use the Provision as a plug.
- 2026-09-28 | box 1 | AC311 | Q: Inventory write-down → Allowance. Purchase-commitment loss → Provision. Why the different account? | A: Own it → allowance (contra-asset against inventory you hold). Owe it → provision (liability for a contract you're bound to).
- 2026-09-29 | box 1 | AC311 | Q: On the SOCI, where does "Recovery of Loss from Decline in Inventory Value" sit, and is it added or subtracted? | A: Inside the COGS build, LESS (subtracted): after COGAS − Ending Inv, then + Loss from Decline, − Recovery → COGS.
- 2026-09-29 | box 1 | AC311 | Q: Allowance b/f is 60. Required allowance at year end is 20. What's the entry amount? | A: 40 (Recovery). The entry is the MOVEMENT, not the closing balance: required → b/f → the gap is the entry.
- 2026-09-30 | box 1 | AC311 | Q: Goods shipped DDP are still in transit on 31 Dec. Whose inventory? And FOB / CIF? | A: DDP = SELLER's until delivered. FOB and CIF = BUYER's once loaded (her rule has no shipping-point/destination split).
- 2026-09-30 | box 1 | AC311 | Q: The inventory write-down loss equals cost minus what? | A: Cost − NRV. Not cost − selling price.
- 2026-10-01 | box 1 | AC311 | Q: Can a recovery on an inventory write-down be bigger than the original loss? | A: No. The recovery is capped at the loss previously recognised, so inventory never goes back above its original cost (the cost ceiling).
- 2026-10-01 | box 1 | AC311 | Q: You HOLD a note receivable. What interest accounts do you use at year end? | A: Interest Receivable / Interest Revenue (lender). Payable/expense is the borrower's side. He flipped this twice.
- 2026-10-01 | box 1 | AC311 | Q: A law change means staff must be retrained next year. Provision now? | A: No. It's a future operating cost with no present obligation from a past event.
- 2026-10-01 | box 1 | AC311 | Q: A provision has a reimbursement (e.g. insurance) that's virtually certain. How is it shown? | A: As a SEPARATE asset, not netted against the provision. (Not in her deck.)
- 2026-10-02 | box 1 | BA202 | Q: A taxpayer dies mid-year. Is she still a natural person for PIT, and is she still liable? | A: Not a natural person (personality ends at death), but STILL liable as "a deceased person who died during the tax year".
