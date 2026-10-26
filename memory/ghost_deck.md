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
- **24 Oct 2026, his call: the deck carries only topics still ahead of him on a test.** All 60 midterm-1 cards (BA202 + AC311 sessions 1–7: cash, receivables, inventory, provisions) PARKED to [[ghost-parked]] (`ghost_parked.md`, not deleted; the hook ignores it). Live deck = AC311 Midterm 2 (PPE onward). Bring a parked card back only if its topic turns out to be on a test (e.g. decommissioning provisions inside PPE cost, or a cumulative AC311 final).

## Cards
- 2026-10-27 | box 1 | AC311 | Q: A company OWNS an office block and rents it out to tenants. Which standard, and what's the sorting question? | A: Investment property, TAS 40 (not PPE). Sort by WHY it's held: own use (production/admin) = PPE (TAS 16); to earn rent or capital appreciation = investment property (TAS 40); for sale in the ordinary course = inventory (TAS 2). Trap: PPE's definition says 'for rental to others', but that's equipment (cars, machines); rented-out land/buildings go to TAS 40. IP IS depreciated under the cost model, not under fair value.
- 2026-10-27 | box 1 | AC311 | Q: A car-rental company owns 200 cars it rents out by the day. PPE, investment property or inventory? | A: PPE (TAS 16). They're not sold, they're USED to supply the rental service, and PPE's definition explicitly includes items held 'for rental to others'. Not investment property: TAS 40 is only land and buildings. Contrast: a car DEALER's showroom cars = inventory (held to sell).
- 2026-10-29 | box 1 | AC311 | Q: Basket purchase: pay 360,000 for land/building/equipment appraised at 200,000/160,000/40,000. Cost of each? | A: Allocate the price by appraisal share: you paid 360/400 = 90%. Land 180,000 · building 144,000 · equipment 36,000. SELF-CHECK: allocations must add up to the price paid (180+144+36 = 360). He wrote equipment 30,000 (a 10k 'discount'); the sum check catches it.
- 2026-10-29 | box 1 | AC311 | Q: Equipment cash price 250,000; you pay in instalments totalling 280,000. Cost of the equipment? What's the 30,000? | A: Cost = CASH PRICE, 250,000. The extra 30,000 is INTEREST (the price of paying later, not of the machine), recognised as interest expense over the credit period, unless capitalised under TAS 23. He said 280,000, splitting it as prepaid; his 'spread over years' instinct belongs to the interest, not the asset.
- 2026-10-20 | box 1 | AC311 | Q: Deferred payment: cash price 250,000, 50,000 down on 1 Jan, rest owed at 10%/yr on the unpaid balance. Entry on 30 June when the first 50,000 instalment is paid? | A: Dr Payable 50,000 · Dr INTEREST EXPENSE 10,000 · Cr Cash 60,000. Interest = UNPAID balance × rate × time = 200,000 × 10% × 6/12. He used the full 250,000, a full year (25,000), and 'interest PAYABLE'. Payable is only for interest owed but not yet paid; paid now and not accrued earlier = expense.
- 2026-10-22 | box 1 | AC311 | Q: Land acquired for 10,000 own shares, par ฿10, trading at ฿15 that day. Land at? Entry? | A: ฿150,000 = FV of the shares ON THE TRANSACTION DATE (par is a legal label, not value). Dr Land 150,000 / Cr Share capital 100,000 / Cr Share premium 50,000. Price moving later doesn't matter: cost is locked at acquisition.
- 2026-10-22 | box 1 | AC311 | Q: Exchange: old machine cost 200k, acc dep 120k, FV 90k, plus 30k cash for a new one. New machine cost? Gain/loss? | A: Carrying amount = cost − acc dep = 80k (NOT a sum of everything). New = FV given up 90k + cash 30k = 120k. Gain = FV 90k − CA 80k = 10k. Dr New 120k, Dr Acc dep 120k / Cr Old 200k, Cr Cash 30k, Cr Gain 10k. (He summed 200+120+90 = 410k.)
- 2026-10-22 | box 1 | AC311 | Q: Exchange: old machine cost 150k, acc dep 60k, FV 70k, plus 20k cash. Gain or loss? | A: LOSS 20k = FV 70k − carrying amount 90k. Cash is NOT in the gain/loss: it pays for the NEW machine, the old one only 'sold' for its FV. New machine = 70k + 20k = 90k. Dr New 90k, Dr Acc dep 60k, Dr Loss 20k / Cr Old 150k, Cr Cash 20k. (He compared FV+cash to CA → 'no gain or loss'.)
