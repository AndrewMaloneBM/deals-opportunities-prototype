# Live prototype capture: BackMarket-SellerXP "Deals Adoption" hub

- URL: https://andrewmalonebm.github.io/BackMarket-SellerXP/prototypes/deals-adoption/
- Captured: 2026-09-22 (headless Chrome screenshot: `../screenshots/live-hub-deals-adoption-2026-09.png`, window 1440x3200; text extraction via fetch below)
- Source repo (do NOT depend on / reuse code from): `BackMarket-SellerXP` GH Pages, built from Andrew's `~/Sites/seller-xp` hub — `app/pages/prototypes/deals-adoption.vue`, `app/components/OpportunitiesDeals.vue`, `app/components/ListingsDealsAfter.vue`. Explicitly out of bounds as a dependency per project rules; this page is inspected read-only via its public URL only.

## Structure observed (tab labels found in page text)

`Hub | Deals Adoption | Concept | Before/After | 1 2 3 | Pages (What's New) | Listings | Concept 1 | Hackathon V1 | PRD Step 1 — Deal visibility in the Listing page`

This is a multi-tab research/concept-comparison page (Before/After toggle, 3 numbered concepts, a "What's New" changelog view, and links back to the Feb 2025 PRD). It is Andrew's own internal exploration hub, not a single fixed prototype screen — treat findings below as **directional**, not as a pixel-accurate spec.

## "What's new" content extracted (Listings page, Concept 1)

- "See all deals" CTA in header with active deal count badge
- Deals drawer with 3 card variants (Figma original, compact improved, minimal scannable)
- Deal cards show status tags (starting soon, active, ending soon, ended, price update)
- Volume tier ladder with commission discounts and progress bars
- Per-deal models table: deal price, your price, units sold, price update indicators
- Filterable model list (search, market, grade, listing status) with sort on units sold
- "In deal" chip on listing rows for products in active deals
- BackBox price column with won (green checkmark tag) and opportunity (flame icon) states
- Sales strategy column: visibility boost / deal opportunity / no strategy available
- Deal opportunity strategy shows deal price, commission savings, and "set deal price" CTA
- Deal status filter in "more filters": In an active deal / Deal opportunity / Not in a deal

## Pros/cons noted on the page itself (useful framing, already synthesized by Andrew)

**Pros**
- Deals work commercially when sellers participate: +9% GMV uplift, 60% adoption at deal price (Apr 2025 campaign)
- Listing page is the natural surface where sellers already manage pricing — no new navigation needed
- Deal visibility is the #1 blocker: 0.2% click rate on deal email vs 60% on save; deals invisible to API sellers (74% of GMV)

**Cons**
- Deal prices too low for many sellers to participate commercially (SSM + seller feedback, Jul 2026)
- Commission discount display confusing: "up to 4% discount" is ambiguous — seller must reduce price significantly (Nefix International feedback)
- Automated pricing systems can overwrite deal prices for integrated sellers, creating financial risk

## Full listings table row content extracted (illustrative fixture data used in that hub — for tone/format reference only, do not copy verbatim)

Products used: iPhone 13 Pro, Samsung Galaxy S20, OnePlus 7T, Sony Xperia 5, Xiaomi 9T, iPhone 13, Samsung Galaxy A7, LG G7, Nokia 3310, iPhone 16, Samsung Galaxy S24. Columns: Product / Inventory / Market(s) (13 EU markets shown as flag row: AT BE FI FR DE GR IE IT NL PT SK ES SE) / Competition (Last 7 days, Low/Medium/Very low/None). "In deal" chip appears on rows for iPhone 16, iPhone 15, Samsung Galaxy S24 in the "after" state. Filter bar includes: Title, SKU, Market(s), BackBox price difference, Sales strategy, Product ID, Appearance, Grade, Categories, Battery type, Inventory, BackBox, Competition level, and (in the deals concept) an "All deal statuses" filter with options In an active deal / Deal opportunity / Not in a deal.

## Relationship to this prototype

This hub is Andrew's own prior exploration (pros/cons framing, concept comparison), not a finished spec, and not the same feature as the front-apps `Opportunities → Deals` build (see `../notes/front-apps-deals-feature-findings.md`). Use it for:
- Tone/voice of deal-related copy ("In deal" chip, deal status vocabulary)
- Confirmation that "Listings page as entry point to Deals" is a validated direction Andrew has already explored
- Filter vocabulary patterns (deal status filter options)

Do NOT use it as the primary layout spec — the front-apps live code (real, currently shipping, uses Revolve) is the more trustworthy structural reference for the actual Back Office shell/table/drawer.
