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

## 2. Real screenshots of the live (currently flagged) Opportunities → Deals tab in front-apps

**Status: NOT available.** This feature is mid-build (commits through yesterday, 2026-09-21) and gated behind the `isDealsOpportunitiesStep1Enabled` business feature flag. I have no Back Office login/session, and even with one, the feature is likely not toggled on in any environment I could reach. No screenshot exists in Andrew's local files because the feature didn't exist yet when those screenshots were taken (Feb 2025 / Jun 2024).

**What I used instead**: the front-apps source code itself (component names, prop shapes, copy strings via `.translations.ts` files, Revolve component imports) — see `notes/front-apps-deals-feature-findings.md`. This is a stronger structural reference than a screenshot would be, but it is not a visual reference.

**Action needed from Andrew**: if he has Back Office access with the flag enabled (or Figma files linked from the PRDs — the Feb 2025 PRD references a "Figma: Listings" link), export/screenshot the real campaign card, drawer, and models table and drop them into `screenshots/` as `current-deals-page.png`, `current-campaign-drawer.png`. Until then, the prototype's visual design for these specific screens is an informed extrapolation (Revolve components + front-apps copy + the research brief's explicit field list), not a traced screenshot.

## 3. A dedicated "single listing detail" screenshot

No screenshot of an isolated listing-detail view (as opposed to the listings table's expanded row) was found locally. The front-apps `ListingDetailsDrawer.vue` (tabs: ListingInfo, SimilarListings, Alerts, Comments, PricingInsights, ProductSpecifications) is the structural reference instead. Not currently needed for the primary/secondary journeys scoped in this brief (which use the expanded row + campaign drawer, not a separate listing-detail page), so this is low priority — flagging for completeness only.

## 4. Image content verification

The vision/image-analysis tool available in this session returned `403 FreeTierError` for every image ("OpenCode's free tier can only be used from within OpenCode"), so I could not visually inspect the contents of any screenshot copied into `screenshots/`. Filenames, folder context, and file dates were used to select and label them as accurately as possible (see `REFERENCE-INVENTORY.md` for confidence levels per file), but Andrew should skim `screenshots/` directly to confirm nothing is mislabeled, especially the four files under `screenshots/pricing-margin-concepts-unverified/` — their relevance to the Deals feature specifically (versus general margin/backpricer UI exploration) is unconfirmed.

## 5. Design-system package access — ✅ RESOLVED 2026-09-22

Confirmed working: `npm view @backmarket/design-system version` returns `129.13.0` using the existing machine-level `~/.npmrc` (GH Packages registry auth, set up per `~/.opencode-memory/reference_revolve_npm_package.md`, resolved back in June 2026). The real Revolve package will be used directly in this project — no shim needed. See `../PLAN.md` §9.
