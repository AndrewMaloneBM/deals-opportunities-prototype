# front-apps read-only research: existing Deals/Opportunities feature

Source: `~/front-apps` (BackMarket/front-apps, local read-only clone, clean, on `main`, matches `origin/main` as of 2026-09-22). Inspected via grep/glob/git log/gh CLI only. **Nothing in front-apps was modified.**

This file is our own written research summary (not copied source code) and exists so the standalone prototype can be visually/structurally *informed by* the real implementation without depending on it.

## Headline finding

A real "Opportunities → Deals" feature is being actively built in `apps/back-office-seller` **this week** (commits through 2026-09-21, i.e. yesterday). It already implements almost exactly the journey this prototype needs to test:

- Route: `/bo-seller/opportunities/deals` (`ROUTE_NAMES.OPPORTUNITIES.DEALS`)
- Gated by business feature flag `isDealsOpportunitiesStep1Enabled`
- Campaign cards (`DealCampaignCard.vue`) → `DealCampaignDrawer.vue` → models table with 4 cell types (Product, Price, Status, Actions)
- **Status enum: `IN_TARGET` / `NEAR_TARGET` / `FAR_TARGET` / `NOT_LISTED`** — maps directly to this prototype's "In Deal / Near target / Above target / Not listed"
- Action copy strings already established: **"Update price"**, **"Create listing"**, **"View listing"** (note: front-apps uses "View listing", the research brief for this prototype says "See listing" — pick one and be consistent; front-apps' live copy is probably the safer choice for realism)
- A separate, older, already-shipped **Listings-page DealsBanner** (behind flag `isDealsBannerEnabled`) advertises active campaigns and links to a `DealsInfoDrawer` explaining the mechanic, plus a "Download deal details" CSV export action

## Why this matters for the prototype

1. **Visual/IA fidelity target**: front-apps' current code is a *more current and more reliable* structural reference than the ~18-month-old screenshots on Andrew's Desktop/Downloads (Feb 2025). Screenshots should still be used for overall Back Office chrome/branding, but table/card/drawer/status/action structure should follow the patterns below.
2. **Terminology**: reuse the front-apps copy patterns (see Revolve mapping below) so sellers in research sessions see language consistent with what will actually ship.
3. **Do not import or depend on this code.** It stays as read-only reference; the prototype reimplements its own mocked version with its own types/fixtures.

## Key files referenced (paths only, for our own note-taking — not copied)

- `app/scopes/opportunities/pages/tabs/deals/Deals.vue` — tab page, fetches mock campaigns, renders cards + drawer + pagination
- `app/scopes/opportunities/pages/tabs/deals/components/DealCampaignCard/DealCampaignCard.vue`
- `app/scopes/opportunities/pages/tabs/deals/components/DealCampaignDrawer/DealCampaignDrawer.vue`
- `.../ModelsTable/cells/{ProductCell,PriceCell,StatusCell,ActionsCell}/*.vue`
- `app/api/deals-opportunities/{types.ts,mocks.ts,specs.ts}` — `DealCampaign`, `DealCampaignModel` (targetPrice, listingPrice, status, listingId), `GetDealCampaignsResponse`
- `app/scopes/listings/pages/listingsV2/components/DealsBanner/DealsBanner.vue` + `DealsInfoDrawer/DealsInfoDrawer.vue` (older, shipped, behind `isDealsBannerEnabled`)
- `app/scopes/listings/pages/listingsV2/components/ListingsTable/components/ExpandedListing/ExpandedListing.vue` + `PricingStrategyCell.vue` — per-market target/minimum price editing, "Save up to {percentage}% on commission rate" copy
- `app/components/NavTabs/NavTabs.vue`, `app/components/ThePage/ThePage.vue`, `app/components/TheHeader/TheHeader.vue` — BO shell/nav patterns

## Revolve component usage confirmed in this app (import path: `@ds/components/<Name>`)

| Purpose | Component | Example import |
|---|---|---|
| Campaign card | `RevButtonCard` | `import { RevButtonCard } from '@ds/components/ButtonCard'` |
| Generic card | `RevCard` | `import { RevCard } from '@ds/components/Card'` |
| Status pill | `RevTag` | `import { RevTag } from '@ds/components/Tag'` |
| Small badge/count | `RevBadge` | `import { RevBadge } from '@ds/components/Badge'` |
| Side panel / drawer | `RevDrawer` | `import { RevDrawer } from '@ds/components/Drawer'` |
| Table | `RevTable` (+ `Column` type from `Table.constant`) | `import { RevTable } from '@ds/components/Table'` |
| Buttons | `RevButton` | `import { RevButton } from '@ds/components/Button'` |
| Pagination | `RevPagination` | `import { RevPagination } from '@ds/components/Pagination'` |
| Tabs | `RevTabs` + `RevTabItem` | `import { RevTabs } from '@ds/components/Tabs'` |
| Banner/callout | `RevMessage` / `RevInfoBlock` | `import { RevMessage } from '@ds/components/Message'` |
| Select (filters) | `RevInputSelect` / `RevInputSelectSearchable` / `RevInputMultiSelect` | `import { RevInputSelect } from '@ds/components/InputSelect'` |
| Popover (tooltip-adjacent) | `RevPopover` | `import { RevPopover } from '@ds/components/Popover'` |
| Loading state | `RevLoadingScreen` / `RevSkeleton` / `RevSpinner` | `import { RevLoadingScreen } from '@ds/components/LoadingScreen'` |
| Chip | `RevChip` | `import { RevChip } from '@ds/components/Chip'` |
| Illustration (empty states) | `RevIllustration` | `import { RevIllustration } from '@ds/components/Illustration'` |

No dedicated "Tooltip" or "Callout" component names exist; `RevPopover` and `RevMessage`/`RevInfoBlock` fill those roles respectively.

**Access constraint**: this prototype cannot install `@backmarket/design-system` as a private npm dependency without GH package registry auth (see `~/.opencode-memory/reference_revolve_npm_package.md`). See the "Dependency strategy" section of the main plan for how we handle this.

## Mock data pattern used by the real feature (for inspiration only, not reused verbatim)

`app/api/deals-opportunities/mocks.ts` defines typed constants like:
```
DEAL_CAMPAIGN_MOCK: DealCampaign
DEAL_CAMPAIGN_MODEL_MOCK_1: DealCampaignModel
DEAL_CAMPAIGNS_MOCK_RESPONSE: GetDealCampaignsResponse
```
Our prototype will follow the same *shape convention* (typed constants + factory-with-overrides) but with our own types tailored to the four-state matrix and export calculations specified in the research brief.

## Test conventions observed (for our own test strategy, not shared infra)

- Vitest, two configs: DOM (`*.spec.ts`/`*.test.ts`) and Nuxt-context (`*.nuxt.spec.ts`) using `@testing-library/vue`.
- No Storybook, no MSW, no working Playwright/Cypress e2e suite found in this app (Playwright is a declared devDependency but unused for e2e here).

## PR #11309 (`gh pr view/diff 11309 --repo BackMarket/front-apps`)

- Title: "feat(bo-seller): [GM-0000] listings page deals investigation" — CLOSED, unmerged (2025-09-05 → 2025-11-10)
- This was the original spike that introduced `DealsBanner`/`DealsInfoDrawer` and the "deal" pricing-strategy quick filter on the Listings page. The current shipped version (behind `isDealsBannerEnabled`) is a cleaned-up, i18n'd, tested descendant of this spike.
- Confirms: the Listings-page banner concept has existed since Sept 2025; the Opportunities→Deals tab (campaign browser) is much newer (Sept 2026, in progress).

## Open discrepancy to flag to Andrew

The research brief for this prototype says the CTA for "In Deal" status should read **"See listing"**. front-apps' shipped code uses **"View listing"**. Recommend using "View listing" for realism (matches what sellers will actually see), but this is a copy decision Andrew should confirm — see "Decisions to approve" in the main plan.
