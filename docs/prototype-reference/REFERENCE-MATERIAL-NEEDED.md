# Reference material still needed / not accessible

Per the project rules, this file lists exactly what could not be inspected or retrieved during planning, and where it should come from. Nothing below has been fabricated or guessed.

## 1. The two specific Confluence PRDs requested — ✅ RESOLVED 2026-09-22

- Step 0: https://backmarket.atlassian.net/wiki/x/j4yPlQE ("Deal information in listings export") → saved as `prds/step-0-deal-info-in-listings-export.md`
- Step 1: https://backmarket.atlassian.net/wiki/x/npWRlQE ("Deal Opportunities MVP") → saved as `prds/step-1-deal-opportunities-mvp.md`

Automated fetch failed (Atlassian login-gated, not Dust-indexed — see history below), so Andrew exported both pages to PDF and pasted them directly into the session. Both are now saved as markdown in `prds/`. They **confirm** the calculation model, status matrix, route, and action logic already designed from front-apps code + the research brief, with three small refinements incorporated into `../PLAN.md` (action copy "View listing", entry-point relevance condition, `Create listing` eligibility nuance) — see the "Confirms prototype plan" footer in each PRD file for detail.

The real PRD (Step 1) also reveals that the GH Pages "Deals Adoption" hub (`existing-prototype/`) is the **officially-linked Design reference** for Jira ticket SXP-9914, not just a personal exploration artifact — status upgraded in `REFERENCE-INVENTORY.md`.

<details><summary>Original blocker (for history)</summary>

Both URLs redirect to an Atlassian login page (HTTP 302, then a JS-gated login screen) when fetched without an authenticated browser session. Dust's Confluence connector does not have these specific pages indexed (confirmed via `dust chat -a dustBuddy`), and no browser/Confluence MCP integration is configured in this environment. Substituted at the time with the Feb 2025 PRD ancestor + Aug 2026 discovery docs + front-apps code, all of which turned out to align closely with the real PRDs once retrieved.
</details>

## 2. Real screenshots of the live Opportunities → Deals tab — ✅ RESOLVED 2026-09-22

Andrew shared 4 real screenshots directly in-session (deals list + 3 campaign drawers). Saved as:
- `screenshots/current-deals-list-2026-09.png`
- `screenshots/current-campaign-drawer-apple-2026-09.png`
- `screenshots/current-campaign-drawer-pixel-2026-09.png`
- `screenshots/current-campaign-drawer-macbook-2026-09.png`

**These revealed real discrepancies from what had been reverse-engineered from front-apps code + the written PRD**, now corrected in the build (see `../PLAN.md` §15 and the component files themselves):
1. Status labels are **"In target"** / **"Far target"**, not "In Deal" / "Above target" as the written PRD's prose said. The PRD's own table matches the brief's wording, but the real screenshots — which are the highest-priority visual source per the fidelity rules — say otherwise. **Flagging to Andrew: the written PRD text may be stale relative to what's actually shipped/designed.**
2. Near/Far target rows show **both** "Update price" (primary) and "View listing" (secondary) stacked, not just one action.
3. Price cell shows 3 lines: bold current price → "€X above target" (or "At or below target") → "Target: €X".
4. Campaign drawer is simpler than first assumed: no stats grid — just Active tag + time-left, campaign name, description, market flags, then the table. Drawer title bar says generic "Campaign details".
5. Campaign cards: no commission-rate text, no date range — just Active tag + name, with a time-left pill + "N models ›" pill + market flags on the right.
6. Time shown as relative ("Today" / "N days left"), not absolute dates.

Note: the example row data in these screenshots (e.g. a "€60.00 above target" row still labeled "In target") is internally inconsistent with the real 3% rule — almost certainly placeholder/mockup data, not meant to be business-rule-accurate. This prototype kept its own correctly-calculated fixture data and only adopted the real **labels/layout/structure** from the screenshots, not the example numbers.

## 3. A dedicated "single listing detail" screenshot

No screenshot of an isolated listing-detail view (as opposed to the listings table's expanded row) was found locally. The front-apps `ListingDetailsDrawer.vue` (tabs: ListingInfo, SimilarListings, Alerts, Comments, PricingInsights, ProductSpecifications) is the structural reference instead. Not currently needed for the primary/secondary journeys scoped in this brief (which use the expanded row + campaign drawer, not a separate listing-detail page), so this is low priority — flagging for completeness only.

## 4. Image content verification

The vision/image-analysis tool available in this session returned `403 FreeTierError` for every image ("OpenCode's free tier can only be used from within OpenCode"), so I could not visually inspect the contents of any screenshot copied into `screenshots/`. Filenames, folder context, and file dates were used to select and label them as accurately as possible (see `REFERENCE-INVENTORY.md` for confidence levels per file), but Andrew should skim `screenshots/` directly to confirm nothing is mislabeled, especially the four files under `screenshots/pricing-margin-concepts-unverified/` — their relevance to the Deals feature specifically (versus general margin/backpricer UI exploration) is unconfirmed.

## 5. Design-system package access — ✅ RESOLVED 2026-09-22

Confirmed working: `npm view @backmarket/design-system version` returns `129.13.0` using the existing machine-level `~/.npmrc` (GH Packages registry auth, set up per `~/.opencode-memory/reference_revolve_npm_package.md`, resolved back in June 2026). The real Revolve package will be used directly in this project — no shim needed. See `../PLAN.md` §9.
