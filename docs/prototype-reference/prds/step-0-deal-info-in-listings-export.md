**LEVEL CONFIDENTIAL - BM ONLY**

# (sub-prd) Step 0 - Deal info in the listings export

| | |
|---|---|
| Status | WIP |
| Topic | Boost Deals Adoption |
| OKR | OKR1 → KR1 Supply x Pricing |
| Owners | Product: Loren BOUSQUET, Adrien MOISON |
| Reviewers | Guillaume COURTET, Kylian POINT, Florian LEUX, Rigoberto RAMIREZ, Andrew MALONE, Ana Paula SOARES, Anthony SALVAT, Lluc PARES |
| Jira | INI-4086: Boost Deals Adoption (DISCOVERY); **SXP-9937: Boost Deals Adoption - Deals in CSV export (IN DEVELOPMENT)** |

Retrieved: 2026-09-22, pasted by Andrew directly (Confluence page x/j4yPlQE was auth-gated for automated fetch — see `../REFERENCE-MATERIAL-NEEDED.md` history).

## Why it matters?
Bring Deal information into the seller's existing listing export. This is the fastest way to support sellers who already manage pricing through the export.

## What does success look like?
| Field | Definition |
|---|---|
| Deal - Target price | Price required to qualify for the reduced commission |
| Deal - Price gap vs target | Current listing price − Deal target price |
| Deal - Earnings after original commission | Earning after the original current commission |
| Deal - Earnings after reduced commission | Earning after the reduced commission |
| Deal - Estimated profit per unit | Earnings after original commission − after reduced commission |
| Deal - Estimated total profit | Estimation profit per unit × nb of units (stock) |
| Deal - Participation | Yes when current price is at or below target price; No when current price is above target price |

## User Stories
- As a seller, I want Deal information to appear directly in my existing Listings export so that I do not need to reconcile separate sources manually.
- As a seller, I want to see the Deal target price for each relevant listing so that I can identify which of my listings are included in an active Deal.
- As a seller, I want to see the difference between my current price and the Deal target price so that I know whether I am already at the target price or need to decrease my price.
- As a seller, I want to see my earnings after the original commission and after the reduced Deal commission so that I can understand the financial impact of participating.
- As a seller, I want to see the estimated profit per unit so that I can assess whether the Deal is commercially worthwhile.
- As a seller, I want to see the estimated total profit based on my available stock so that I can understand the potential value of participating across my listings.
- As a seller, I want to know whether my current price already qualifies for the Deal or whether I would need to reduce my price to participate.
- As a seller, I want Deal information to remain associated with my own SKU and available quantity so that I can use the export directly in my pricing workflow.
- As the Seller XP team, we want the calculations to use the correct current price, target price, original commission and reduced commission depending on whether the listing is already at or below target.

## Use case A — Current price is already at or below target
The seller is already eligible for the reduced commission.
```
Deal - Target price
Deal - Price difference vs target = Current price − Deal target price = negative or 0
Deal - Earnings after original commission = current price × (1 − original commission)
Deal - Earnings after reduced commission = current price × (1 − reduced commission)
Deal - Estimated profit per unit = Earnings after original com − after reduced com
Deal - Estimated total profit = Estimated profit/unit × nb of units in stock
Deal - Participation = YES
```

## Use case B — Current price is above target
The seller would need to lower the price to participate.
```
Deal - Target price
Deal - Price difference vs target = Current price − Deal target price = positive
Deal - Earnings after original commission = Current price × (1 − original commission)
Deal - Earnings after reduced commission = Target price × (1 − reduced commission)
Deal - Estimated profit per unit = Earnings after original com − after reduced com
Deal - Estimated total profit = Estimated profit/unit × nb of units in stock
Deal - Participation = NO
```
> Estimated profit per unit can be positive or negative. That is important because a Deal may be attractive from a commission perspective but still reduce the seller's total value because of the price decrease.

## Use case C — Listing is not part of the Deal
We do not display the "Deal" information.

## Dependencies
No dependency.

## Appendices
- Deals Adoption - HYK presentation (linked doc, not retrieved)
- Masterfile Opportunities (EU, UK) — file update at FR 11:10am daily (linked doc, not retrieved)

---

**Confirms prototype plan §14 exactly** — no changes needed to the calculation model already designed; this is now the authoritative source (rather than the brief's paraphrase) for CSV column names, which should use these literal field labels (`Deal - Target price`, `Deal - Price gap vs target`, `Deal - Earnings after original commission`, `Deal - Earnings after reduced commission`, `Deal - Estimated profit per unit`, `Deal - Estimated total profit`, `Deal - Participation`).
