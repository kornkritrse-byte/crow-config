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
- 2026-09-30 | box 1 | AC311 | Q: A purchase commitment was provisioned last year. On delivery day, write the four lines of the entry. | A: Dr Inventory (at lower of cost/NRV, i.e. market) · Dr Provision (the FULL balance) · Cr Cash (the contract price) · the difference = Loss (Dr) or Recovery (Cr). Never use the Provision as a plug.
- 2026-10-05 | box 2 | AC311 | Q: Inventory write-down → Allowance. Purchase-commitment loss → Provision. Why the different account? | A: Own it → allowance (contra-asset against inventory you hold). Owe it → provision (liability for a contract you're bound to).
- 2026-10-06 | box 2 | AC311 | Q: On the SOCI, where does "Recovery of Loss from Decline in Inventory Value" sit, and is it added or subtracted? | A: Inside the COGS build, LESS (subtracted): after COGAS − Ending Inv, then + Loss from Decline, − Recovery → COGS.
- 2026-09-29 | box 1 | AC311 | Q: Allowance b/f is 60. Required allowance at year end is 20. What's the entry amount? | A: 40 (Recovery). The entry is the MOVEMENT, not the closing balance: required → b/f → the gap is the entry.
- 2026-09-30 | box 1 | AC311 | Q: Goods shipped DDP are still in transit on 31 Dec. Whose inventory? And FOB / CIF? | A: DDP = SELLER's until delivered. FOB and CIF = BUYER's once loaded (her rule has no shipping-point/destination split).
- 2026-10-04 | box 2 | AC311 | Q: The inventory write-down loss equals cost minus what? | A: Cost − NRV. Not cost − selling price.
- 2026-10-01 | box 1 | AC311 | Q: Can a recovery on an inventory write-down be bigger than the original loss? | A: No. The recovery is capped at the loss previously recognised, so inventory never goes back above its original cost (the cost ceiling).
- 2026-10-01 | box 1 | AC311 | Q: You HOLD a note receivable. What interest accounts do you use at year end? | A: Interest Receivable / Interest Revenue (lender). Payable/expense is the borrower's side. He flipped this twice.
- 2026-10-01 | box 1 | AC311 | Q: A law change means staff must be retrained next year. Provision now? | A: No. It's a future operating cost with no present obligation from a past event.
- 2026-10-01 | box 1 | AC311 | Q: A provision has a reimbursement (e.g. insurance) that's virtually certain. How is it shown? | A: As a SEPARATE asset, not netted against the provision. (Not in her deck.)
- 2026-10-02 | box 1 | BA202 | Q: A taxpayer dies mid-year. Is she still a natural person for PIT, and is she still liable? | A: Not a natural person (personality ends at death), but STILL liable as "a deceased person who died during the tax year".
- 2026-10-02 | box 1 | AC311 | Q: The office keeps ฿5,000 petty cash. Classification AND the reason? | A: Cash (inside Cash & Cash Equivalents). Reason: on hand, unrestricted, available for immediate use. NOT because it's small; size never decides classification.
- 2026-10-02 | box 1 | AC311 | Q: 28 Dec: customer gives you a cheque dated 15 Jan. What is it at 31 Dec, and why? | A: Accounts receivable (NOT notes receivable, NOT cash). Can't be cashed until 15 Jan so it isn't cash; it's still the customer's promise to pay. Not a formal promissory note, so it's AR. (Her Cash Practice key: 'reported as an accounts receivable'.)
- 2026-10-02 | box 1 | AC311 | Q: 20X2: 40 units arrive on a purchase commitment (Feb), then 150 bought in Aug @ 34. Year's Transport-in 380, Discount 190. Unit cost of the leftover Aug units? | A: 35. Load (380 − 190) ÷ ALL 190 units purchased = 1, so 34 + 1. The 40 commitment units are purchases of the year too, so don't spread over 150 (that gives 35.27).
- 2026-10-01 | box 1 | BA202 | Q: Non-listed Thai co. holds 30% of another Thai co.'s voting shares, no cross-holding, held 3m+ before and after. How much of the dividend is CIT-exempt? | A: ALL of it. Full exemption for a non-listed receiver = ≥25% voting + no cross-holding + 3m/3m. Half is only when it misses one (e.g. holds 10%). Holding % decides, not listed/non-listed alone. Sheet p1 left + p7 Exemption #1.
- 2026-10-01 | box 1 | BA202 | Q: Which is SUBORDINATE law: Revenue Code / Emergency Decree / Ministerial Regulation / Constitution? | A: Ministerial Regulation. Subordinate = the BOTTOM rung: Royal Decree, Ministerial Regulation, MoF notification, made under power delegated by an Act and valid only inside it. Constitution = the TOP. Emergency Decree = Acts tier (trap). Sheet p3 bottom right.
- 2026-10-01 | box 1 | BA202 | Q: Freelancer paid for a finished result, no control, and SHE supplies the essential materials. Which s.40 category, and what's the deduction? | A: 40(7) contract of work WITH materials → 60%, no cap. Without materials it's 40(2) → 50% max 100k. Materials are the only difference. Sheet p4 'Classify by elimination' box 2 says 'no materials?' — read to the end.
- 2026-10-01 | box 1 | BA202 | Q: Net income 800,000. Tax under Method 1? (use the brackets table's cumulative column) | A: 75,000. 800k falls in 750,001–1m (20%). Take the cumulative from the row ABOVE = 65,000 (tax on the first 750k), + (800k−750k)×20% = 10,000 → 75,000. Trap: 115,000 = your OWN row's cumulative = tax at the TOP of your bracket (1m). Sheet p6 left.
- 2026-10-01 | box 1 | BA202 | Q: Thai dividend 80,000 from a 20%-CIT co. He ELECTS the 10% final tax. Dividend credit? And why? | A: 0. Electing keeps the dividend OUT of the return; the 10% withheld (8,000) is final, so there's nothing to credit it against. The credit only exists if he INCLUDES it: gross up 80k × 100/80 = 100k into the brackets, credit 20k (the CIT the company already paid). Sheet p6 'Dividend tax credit' + p1 Silent Killers.
- 2026-10-01 | box 1 | BA202 | Q: SME (paid-up 4m, turnover 28m) with net profit 2m. CIT? | A: 255,000. SME rates are PROGRESSIVE by slice: 0–300k at 0% = 0; 300,001–3m at 15% → (2,000,000 − 300,000) × 15% = 255,000. Trap: 15% × the whole 2m = 300,000. Sheet p8 far left.
- 2026-10-01 | box 1 | BA202 | Q: Thai co. pays a 100,000 SERVICE fee to another Thai company. WHT? | A: 3,000 (3%). Her WHT table: service/professional fees 3% to both individuals and companies. 10% is the DIVIDEND row. Advertising/transport 2%/1%, rent 5%, interest to a company 1%. Sheet p6 third column, her WHT table: pick the ROW by payment type, then the COLUMN by who receives it.
- 2026-10-01 | box 1 | BA202 | Q: Koala Co. (Aus, no presence in TH) earns Thai INTEREST 100. WITH the DTA, how much does Thailand withhold? And for a DIVIDEND? | A: Interest: 0. Australia (residence) gets the right, TH pays the full 100, Aus CIT only. Dividend: TH (source) keeps it, 10% → 90, Australia exempts (exemption method). 15% on interest is the NO-DTA row. The DTA gives each income type to one country. Sheet p8 Koala box.
