---
name: ""
metadata:
  node_type: memory
  aliases:
    - ac311-cost-flow-noi
  tags:
    - ac311
    - inventories
    - midterm
  originSessionId: fbfede16-b727-4838-a921-ed5b0b518a2f
  modified: 2026-09-25T07:41:09.596Z
---

# AC311: Cost Flow and NOI

Part of [[project-midterms]]. Built 25 Sep 2026 during the Problem 4 drill.

## 1. The flow

```
Beg Inv
+ Purchases
= Cost of Goods Available for Sale (COGAS)
− Ending Inv
= COGS
```

```
Sales
− COGS
= Gross Profit
− S&A expenses
− Loss on Purchase / Sales Commitment
= Net Operating Income (NOI)
```

> [!tip] The one rule
> **EI and NOI move in the same direction.**
> EI too high → COGS too low → NOI too high.
> EI too low → COGS too high → NOI too low.

## 2. The two-sided test (run it on EVERY item)

Before calling an NOI effect, check **both** lines:

| Purchases | Ending Inv | NOI effect |
|---|---|---|
| wrong by X | wrong by X, **same direction** | **None**, they cancel (COGS is right) |
| correct | overstated by X | NOI **overstated** by X → fix **decreases** NOI |
| correct | understated by X | NOI **understated** by X → fix **increases** NOI |
| overstated by X | correct | COGS too high → NOI **understated** by X |
| understated by X | correct | COGS too low → NOI **overstated** by X |

> [!warning] His trap (25 Sep)
> Copying the answer from the previous item. (b) cancelled, (c) didn't. Test each one fresh.

## 3. Who owns it (her rules)

| Situation | Whose inventory? |
|---|---|
| **FOB**: in transit | **Buyer's** once loaded (she does NOT split shipping-point / destination) |
| **CIF**: in transit | **Buyer's** once loaded |
| **DDP**: in transit | **Seller's** until delivered |
| Consigned OUT (we're consignor, goods at the consignee) | **Ours**, include |
| Held FOR someone on consignment (we're consignee) | **Not ours**, exclude |

Include: freight-in, manufacturing supplies.
Exclude: borrowing cost, advertising, office supplies.

## 4. Worked: Problem 4 (a)–(c)

Count = ฿76,050

| Item | In EI? | Adjustment | Why | NOI if not fixed |
|---|---|---|---|---|
| (a) ฿11k consigned out, included | Yes | 0 | Consignor keeps title | No effect |
| (b) ฿27k bought FOB, shipped 30 Dec, not counted, purchase recorded 2021 | Yes | **+27,000** | FOB = ours once loaded | **No effect**: Purchases AND EI both understated → cancel |
| (c) ฿18k sold CIF, shipped 30 Dec, included | No | **−18,000** | CIF = customer's once loaded | EI overstated → NOI **overstated 18k** → fix **decreases** NOI |

(d)–(f): drill still running, filled in after.

## 5. Where the inventory write-downs sit in the SOCI

```
  COGAS
− Ending Inv
+ Loss from Decline in Inventory Value      ← ADD (more cost)
− Recovery of Loss from Decline in Inv Value ← SUBTRACT (he added it on 25 Sep: wrong)
= COGS
```

Commitment losses sit **below** Gross Profit, next to S&A:
`Loss on Purchase Commitment · Loss on Sales Commitment → NOI`

## 6. Purchase-commitment delivery template

1. **Dr Inventory**, at the lower of cost and NRV
2. **Dr Provision**, **FULL** balance, every time
3. **Cr Cash/AP**, the contract price
4. **The difference** → an extra debit = **Loss**, an extra credit = **Recovery** (capped at the provision)

Own it → **Allowance** (contra-asset). Owe it → **Provision** (liability).
