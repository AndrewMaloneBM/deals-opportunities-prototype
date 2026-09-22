# Deals Opportunities Research Prototype — Implementation & Hosting Plan

Status: **PLANNING COMPLETE, ALL 6 DECISIONS RESOLVED (2026-09-22) — awaiting Andrew's final go-ahead to begin Phase 1 scaffold.**

Project location: `~/Sites/deals-opportunities-prototype` (new, empty, standalone — not yet a git repo; nothing beyond `docs/` exists on disk).

---

## 0. Decisions — resolved 2026-09-22

| # | Question | Resolution |
|---|---|---|
| 1 | "See listing" (brief) vs "View listing" (front-apps code) | **Follow front-apps: "View listing."** Also matches the real Step 1 PRD's own tracking-strategy event list (the PRD's narrative section is internally inconsistent — says "See listing" once, "View listing" in its tracking list). |
| 2 | Chase real `@backmarket/design-system` access? | **Yes — and it's already working.** `npm view @backmarket/design-system version` → `129.13.0` via the existing machine-level `~/.npmrc` (resolved back in June 2026 per `~/.opencode-memory/reference_revolve_npm_package.md`). We build with the real package, no shim needed. |
| 3 | Hosting: chase `prototypes.backmarket.io` now, or ship GH Pages fallback? | **GH Pages fallback, for now.** Revisit `prototypes.backmarket.io` later — not enough time this week. |
| 4 | Proceed on brief's calculation rules + local substitute docs, or wait for real PRDs? | **Real PRDs provided directly by Andrew** (Step 0 + Step 1, pasted 2026-09-22) — saved to `docs/prototype-reference/prds/`. They confirm the calculation model and status matrix exactly, with three small refinements (see §15/§19). |
| 5 | Include "starting soon" campaign state? | **No, not this iteration — active-only.** Reason: pricing for upcoming campaigns isn't locked in time for this build — product/model list can be released ~30 days before a campaign starts, but target pricing may not be confirmed until ~1 week before, and that timing is still under internal discussion. Revisit "starting soon" once that's settled. |
| 6 | Event log: hidden/moderator-only vs visible? | **Resolved as: persistent, small, always-visible "Session log" control** (not a hidden keyboard shortcut) — most useful for research debrief without requiring the moderator to remember anything. Event taxonomy adopts the real PRD's own tracking-strategy list verbatim. See §19. |

---

## 1. Executive summary

We're building a small, fully mocked, front-end-only prototype of two Back Office surfaces — the Listings page (entry point) and the new Opportunities → Deals experience — so external sellers can be tested in 30-minute moderated sessions on: discovering a Deal, understanding a campaign, understanding the four listing statuses (In Deal / Near target / Above target / Not listed), understanding the price/commission trade-off, choosing the right action, and understanding Deal fields in a CSV export.

This isn't a cold start, and it's now doubly confirmed. `BackMarket/front-apps` already has a **real, currently-in-progress** implementation of almost this exact feature (built through 2026-09-21), using the same four-state model (`IN_TARGET`/`NEAR_TARGET`/`FAR_TARGET`/`NOT_LISTED`). The real Step 0 and Step 1 PRDs (Jira SXP-9937 and SXP-9914, both IN DEVELOPMENT, provided directly by Andrew) confirm that front-apps' implementation, the calculation rules, and the status matrix all match what was reverse-engineered from code — nothing needs correcting, only three small refinements folded in (action copy, entry-point relevance condition, Create-listing eligibility nuance; see §15/§19).

All six open decisions from the previous planning pass are now resolved (§0). Real Revolve package access is confirmed working on this machine right now. The only remaining step is Andrew's go-ahead to start Phase 1 (scaffold).

## 2. Repository boundary verification

- Current working directory (`~/Documents/Default Project`) is empty and is **not** itself a git repo of its own — `git status` there resolves to a git repo rooted at `~` (home directory) that appears to track dotfiles/config only. This home-level repo is pre-existing, unrelated to this project, and was not created or touched by this session.
- New project created at `~/Sites/deals-opportunities-prototype` — matches the convention used by all of Andrew's other standalone prototypes (`bf-preview`, `bo-home-collab`, `smartco-ui`, etc.), each of which is confirmed to be its own independent nested git repo (the home-level repo lists them as opaque untracked directories, i.e. does not recurse into them).
- **Not yet `git init`'d.** I stopped short of initializing git / creating `package.json` / scaffolding app code, since that's implementation, not planning. Will do this immediately on approval.
- Confirmed **not** a subdirectory of, or branch of: `seller-xp`, `seller-xp-team`, `prototype-hub*`, `smartco-ui`, `bo-home-collab`, `front-apps`, or any other existing repo.
- `front-apps` is already cloned locally at `~/front-apps`, clean, on `main`, in sync with `origin/main`. Inspected read-only only (grep/glob/git log/gh CLI). **Not modified.**

## 3. Reference material inventory

Full detail in `docs/prototype-reference/REFERENCE-INVENTORY.md`. Summary:

- 5 real screenshots copied in (all Feb 2025 or older — stale relative to current front-apps code, flagged)
- 4 screenshots of unconfirmed relevance (filename-only evidence, vision tool unavailable this session) copied to a clearly-labeled `unverified` subfolder
- 1 live screenshot + text capture of Andrew's own GH Pages "Deals Adoption" hub (captured today via headless Chrome — allowed as read-only inspection per the brief)
- 1 rich local HTML mockup (`deals-v1-proto.html`) — richest available interaction reference
- 4 local markdown docs (Feb 2025 PRD ancestor + 3 Aug 2026 discovery-phase docs) standing in for the two specific Confluence PRDs, which could not be retrieved (auth-gated, not indexed in Dust)
- 1 original research note written this session summarizing the real, in-progress front-apps implementation

See `REFERENCE-MATERIAL-NEEDED.md` for the precise list of what's missing and why (two Confluence PRDs, a real screenshot of the flagged-off Deals tab, image content verification).

## 4. Screenshot and coded-product findings

- **Local screenshots are ~18 months old** (Feb 2025 / Jun 2024) — predate the current Listings V2 and the Opportunities→Deals tab entirely. Useful for Back Office branding/chrome (header, logo, general color/spacing) but not for Deals-specific structure.
- **The GH Pages "Deals Adoption" hub** (Andrew's own prior concept work, inspected read-only via public URL) confirms Listings→Deals is a direction Andrew has already explored, and supplies copy/vocabulary patterns ("In deal" chip, deal status filter options, "Deal decision support" framing). It's a multi-concept comparison page, not a single fixed spec.
- **`deals-v1-proto.html`** (local file, Downloads) is the single richest reference: full IA for banner → drawer → decision-support panel → CTA, matching almost exactly what this brief asks for, including a "Deal decision support" panel per deal (relevance, eligibility/blocker, price vs target, commission before/after, estimated net outcome, margin impact, next action). Visual styling is generic CSS, not Revolve — treat as an interaction/content-structure reference, not a visual one.

## 5. Current Back Office architecture findings (from front-apps, read-only)

- App: `apps/back-office-seller` (Nuxt 4). Shell: `app/layouts/default.vue` → `TheHeader.vue` (logo, company name, BO-type selector, language, user menu) → `TabsSales.vue` (primary nav: Home, Insights, Customer Care, Listings, Orders, Opportunities, Money, Options, Seller Support) → `ThePage.vue` (generic `#pageTitle`/`#pageActions`/`#pageContent` slots) → `NavTabs.vue` (secondary tab nav built on `RevTabs`/`RevTabItem`, drives sub-routes).
- Listings: `scopes/listings/pages/listingsV2/Index.vue` → `DealsBanner` (flagged) + `NavTabs` (Active/On hold/Archived) → `ListingsTable.vue` (RevTable, product/inventory/markets/competition columns, expandable rows) → `ExpandedListing.vue` (per-market target/minimum price inputs, `PricingStrategyCell`) + `ListingDetailsDrawer.vue` (tabbed: info/similar/alerts/comments/pricing insights/specs) + `Filters.vue` (desktop/mobile variants + quick filters) + `ImportExportDrawer.vue` (CSV import/export).
- Opportunities: `scopes/opportunities/` with `NavTabs` sub-tabs Pricing / Inventory / Deals. **Deals tab** (`pages/tabs/deals/Deals.vue`, route `/bo-seller/opportunities/deals`, flag `isDealsOpportunitiesStep1Enabled`): fetches campaigns → `DealCampaignCard.vue` (RevButtonCard) → `DealCampaignDrawer.vue` (RevDrawer, size large) → models table (RevTable) with `ProductCell` / `PriceCell` / `StatusCell` (RevTag, 4-state) / `ActionsCell` (status-driven CTAs) → `Pagination.vue`.
- API contract shape (for our own types, not reused): `DealCampaign { name, markets, startDate, endDate, status, modelCount }`, `DealCampaignModel { name, backboxGrade, specialOfferTypes, market, targetPrice, listingPrice, status, listingId }`.
- Full detail: `docs/prototype-reference/notes/front-apps-deals-feature-findings.md`.

## 6. Existing components to reuse (conceptually — via Revolve, not via front-apps code)

| Need | Revolve component | Confirmed import (front-apps) |
|---|---|---|
| Campaign card | `RevButtonCard` | `@ds/components/ButtonCard` |
| Generic card / metric tile | `RevCard` | `@ds/components/Card` |
| Status pill (4 states) | `RevTag` | `@ds/components/Tag` |
| Count badge | `RevBadge` | `@ds/components/Badge` |
| Campaign drawer | `RevDrawer` | `@ds/components/Drawer` |
| Models/listings table | `RevTable` (+ `Column` type) | `@ds/components/Table` |
| Buttons (primary/secondary CTAs) | `RevButton` | `@ds/components/Button` |
| Pagination | `RevPagination` | `@ds/components/Pagination` |
| Tabs (Opportunities sub-nav, Listings Active/Archived) | `RevTabs` + `RevTabItem` | `@ds/components/Tabs` / `TabItem` |
| Banner / "how it works" callout | `RevMessage` / `RevInfoBlock` | `@ds/components/Message` |
| Filters (market, product type) | `RevInputSelect` / `RevInputMultiSelect` | `@ds/components/InputSelect` |
| Tooltip-adjacent helper text | `RevPopover` | `@ds/components/Popover` |
| Loading state | `RevLoadingScreen` / `RevSkeleton` | `@ds/components/LoadingScreen` |
| Empty state illustration | `RevIllustration` | `@ds/components/Illustration` |
| Toast (success feedback) | via `@backmarket/nuxt-module-toast` | n/a (module, not a component import) |

Before implementation, we'll re-verify each component's actual props/variants against whichever source we can access (real package if installed, else Storybook per `~/.opencode-memory/reference_revolve_storybook.md`, else the front-apps usage sites as a fallback prop reference — never invented).

## 7. Existing Deals prototype findings

Two genuinely relevant, separate artifacts (neither a dependency, both informative):

1. **front-apps `Opportunities → Deals`** (real, shipping-in-progress code) — the authoritative *structural and terminology* reference. See §5/§6.
2. **Andrew's own `deals-v1-proto.html`** and GH Pages hub — the richest *interaction and content* reference (decision-support panel content, banner copy, drawer tab structure).

PR #11309 (`gh pr view/diff 11309`) confirms the Listings-page banner concept dates to Sept 2025 (closed unmerged spike, later cleaned up and shipped behind `isDealsBannerEnabled`); the Opportunities→Deals campaign browser is much newer (Sept 2026, actively in progress, not yet shipped/enabled).

## 8. Recommended standalone architecture

- **Framework**: Nuxt 4 + TypeScript + Vue 3 (SPA-style, static-generated via `nuxt generate`). Rationale: matches Back Market's actual stack (front-apps, seller-xp, prototype-hub-template all use Nuxt), and — now confirmed — lets us consume the **real `@ds/components/*` package directly**, since registry access is already working on this machine.
- **Styling**: Tailwind (utility layer) + the real Revolve package as the design layer (`@backmarket/design-system` v129.13.0, confirmed installable). Tailwind preset comes from `@backmarket/design-system/tailwind.config` per the standalone (non-Nuxt-layer) setup documented in `~/.opencode-memory/reference_revolve_npm_package.md` — we replicate the wiring (`createRevolvePlugin`, explicit named imports, `@ds` alias) without pulling in `@backmarket/nuxt-layer-design-system` (private, workspace-only, unusable outside front-apps).
- **State**: no server, no store library needed at this scale — plain Vue `ref`/`computed` + a small set of composables (`useDealScenario`, `useListingStatus`, `useExportCalculations`) operating over static, typed, in-memory fixture data.
- **Routing**: Nuxt file-based routing mirrors the real app's route *names* conceptually (`/opportunities/deals`) without mirroring its actual folder depth/complexity.
- **No backend, no database, no auth.** All "actions" (update price, create listing, export CSV) are client-side state mutations + toast feedback, logged to an in-memory + downloadable event log.

## 9. Dependency strategy

- **Zero runtime dependency on**: Seller XP hub, any Seller XP GitHub repo, any other personal prototype repo, front-apps (source or package), any repo discovered via GitHub beyond front-apps (read-only, inspected not imported).
- **Revolve Design System — confirmed, using the real package.** `@backmarket/design-system` (currently v129.13.0) via BM's GitHub Packages registry, exactly as documented in `~/.opencode-memory/reference_revolve_npm_package.md` (scoped `.npmrc` + GH token with `read:packages`, SSO-authorized for the BM org — already configured on this machine, verified working via `npm view`). We reproduce the standalone (non-Nuxt-layer) wiring: `@ds` alias, `build.transpile`, Tailwind preset, `createRevolvePlugin`, explicit named imports — no auto-import, no dependency on `@backmarket/nuxt-layer-design-system` (private/workspace-only). `.npmrc`'s token stays machine-local (env var or gitignored), never committed. This is a **UI library only** — no runtime secrets, no BM API access, nothing that weakens the "no dependency on private repos" boundary (design-system is a published package, not a git dependency, and this project doesn't touch its source).
- **Mock data**: entirely local, typed, deterministic TypeScript fixtures — no API calls, no BigQuery, no MSW server needed (front-apps itself doesn't use MSW either, per research).
- **Build/deploy**: fully self-contained static output (`nuxt generate` → `dist/` or `.output/public/`), zero secrets in the shipped bundle, zero server dependency. The only external private dependency is the Revolve *package* at build time (not at runtime — it's compiled into the static bundle, same as front-apps ships it to end users today).

## 10. Route map

| Route | Purpose |
|---|---|
| `/` | Back Office shell → redirects to `/listings` |
| `/listings` | Listings entry point: table, filters, Deals banner (when an active/relevant campaign exists), Export drawer |
| `/opportunities/deals` | Deals Opportunities page: active campaign cards, filters (market, product type), pagination |
| `/opportunities/deals?scenario=in-deal` \| `near-target` \| `above-target` \| `not-listed` | Deterministic starting scenarios (query param selects which fixture "seller" dataset loads) |
| `/opportunities/deals/[campaignId]` (or in-page drawer state, see §25) | Campaign drawer content — implemented as a drawer overlay on the Deals page (matches front-apps pattern: `RevDrawer`, not a separate route), but deep-linkable via `?campaign=<id>` query param for reset/scenario support |
| `/reset` (or a persistent header control) | Prototype reset action — clears any local mutated state (price updates, created listings) back to the deterministic fixture baseline |

## 11. Primary seller test journey

`Listings → Deals entry point (banner) → Opportunities/Deals → Campaign card → Campaign drawer → Models table (status + filters) → Action (See/View listing, Update price, Create listing)`

Implementation notes:
- Deals banner on Listings only renders when `activeCampaigns.length > 0` for the current mock seller/scenario — this itself is a research signal (does the participant notice/click it unprompted?).
- Campaign cards on `/opportunities/deals` show only **active and validated** campaigns (matches brief). A "Starting soon" state exists in the reference mockup but is explicitly out of scope per the brief — noted as a scope decision (§23) in case Andrew wants it included for richer "Discover" testing.
- Actions are contextual per status (§15) and always mocked — confirmed via a success toast + (for price update) a visibly updated status badge, never a real network call.

## 12. Secondary export journey

Mocked CSV export triggered from the Listings page (matches front-apps' existing "Download deal details" pattern, `POST /api/seller-experience/listings/export-deals`, mocked here as a client-side CSV blob download). Per the real Step 0 PRD (`docs/prototype-reference/prds/step-0-deal-info-in-listings-export.md`), CSV columns use these **exact field labels**: `Deal - Target price`, `Deal - Price gap vs target`, `Deal - Earnings after original commission`, `Deal - Earnings after reduced commission`, `Deal - Estimated profit per unit`, `Deal - Estimated total profit`, `Deal - Participation` — computed per the two calculation branches in §14 (Use case A/B in the PRD), for every listing that has an associated Deal. Listings with no Deal (Use case C) show **no Deal columns at all** — blank/omitted cells, not zeros, per the PRD's explicit "we do not display the Deal information" instruction.

## 13. Mock data model

```ts
// domain/types.ts
type Market = 'FR' | 'ES' | 'DE' | 'IT' // ≥2 required, using 4 for realism
type ProductType = 'smartphone' | 'laptop' // ≥2 required

interface Campaign {
  id: string
  name: string          // "[Brand] [Product] — selected models" per Feb-2025 PRD naming rule
  status: 'active'      // only active+validated per brief; 'starting_soon' etc. modeled in the type but unused unless §23 scope decision changes this
  startDate: string
  endDate: string
  markets: Market[]
  modelCount: number
  originalCommissionRate: number   // e.g. 0.11
  reducedCommissionRate: number    // e.g. 0.07
  description: string
}

interface ListingFixture {
  id: string
  productName: string
  productType: ProductType
  sku: string
  market: Market
  campaignId: string | null   // null = not part of any Deal
  currentPrice: number | null // null = Not Listed
  targetPrice: number | null  // null when campaignId is null
  stock: number
  status: 'IN_DEAL' | 'NEAR_TARGET' | 'ABOVE_TARGET' | 'NOT_LISTED' // derived, not stored (see §15)
}
```

Fixture set (satisfies every brief requirement):

| id | product | type | market | campaign | price | target | stock | resulting status |
|---|---|---|---|---|---|---|---|---|
| L1 | iPhone 15 128GB | smartphone | FR | C1 | 439 | 439 | 40 | In Deal |
| L2 | iPhone 15 128GB | smartphone | ES | C1 | 449 | 439 (2.3% over) | 25 | Near target |
| L3 | Galaxy S23 128GB | smartphone | FR | C2 | 410 | 380 (7.9% over) | 60 | Above target (and this is the negative-profit fixture, see §14) |
| L4 | MacBook Air M2 | laptop | DE | C2 | — | 720 | 0 | Not listed |
| L5 | Galaxy S23 128GB | smartphone | IT | C2 | 395 | 380 (3.9% over) | 15 | Above target (small gap, positive profit — contrast case) |
| L6 | iPhone 13 128GB | smartphone | FR | null | 320 | — | 80 | (no Deal — excluded from export Deal columns) |

Two campaigns (C1: "Apple iPhones — selected models", 11%→7% commission, FR/ES; C2: "Samsung Galaxies & Apple MacBooks — selected models", 12%→8% commission, FR/DE/IT), two product types, two markets minimum (four modeled), varied stock (0/15/25/40/60/80), varied commission rates (11/7 vs 12/8) — all per brief.

## 14. Deal calculation model

Implemented as pure, unit-tested functions in `domain/calculations.ts`, per the real Step 0 PRD's Use case A/B (`docs/prototype-reference/prds/step-0-deal-info-in-listings-export.md`):

```ts
function computeDealMetrics(listing: ListingFixture, campaign: Campaign) {
  if (listing.currentPrice == null) return null // Not Listed — no export row
  const atOrBelowTarget = listing.currentPrice <= listing.targetPrice

  const priceGap = listing.currentPrice - listing.targetPrice
  const originalEarnings = listing.currentPrice * (1 - campaign.originalCommissionRate)
  const dealEarnings = atOrBelowTarget
    ? listing.currentPrice * (1 - campaign.reducedCommissionRate)
    : listing.targetPrice * (1 - campaign.reducedCommissionRate)
  const profitPerUnit = dealEarnings - originalEarnings
  const totalProfit = profitPerUnit * listing.stock
  const participation = atOrBelowTarget

  return { priceGap, originalEarnings, dealEarnings, profitPerUnit, totalProfit, participation }
}
```

Verified against the brief's worked examples using fixture L3 (Galaxy S23, price 410, target 380, commission 12%→8%, stock 60):
- priceGap = 30
- originalEarnings = 410 × 0.88 = 360.80
- dealEarnings = 380 × 0.92 = 349.60
- profitPerUnit = 349.60 − 360.80 = **−11.20** (negative, as required)
- totalProfit = −11.20 × 60 = **−672.00**
- participation = No

This confirms the calculation rules (now doubly sourced — brief + real PRD) do produce a genuinely negative-profit fixture with realistic numbers (not a contrived edge case) — which also lines up with the seller-feedback digest's Signal 2 ("deal prices too low to participate commercially").

## 15. Listing status matrix

Matches the real Step 1 PRD exactly (`docs/prototype-reference/prds/step-1-deal-opportunities-mvp.md`), including the backend enum values, which also match front-apps' shipped code:

| Status | Backend value | Definition | Action | Revolve mapping |
|---|---|---|---|---|
| In Deal | `IN_TARGET` | price ≤ target | **View listing** (resolved decision — follows front-apps code, which also matches the PRD's own tracking-event list) | `RevTag` variant=success/info |
| Near target | `NEAR_TARGET` | target < price ≤ target×1.03 | Update price | `RevTag` variant=warning |
| Above target | `FAR_TARGET` | price > target×1.03 | Update price | `RevTag` variant=critical/danger |
| Not listed | `NOT_LISTED` | no active listing for seller+product+config | Create listing — **only shown when the product is eligible** for the campaign (per PRD; `NOT_LISTED` status alone isn't sufficient) | `RevTag` variant=neutral |

Status is **always derived** from price/target/existence at render time (never stored as a field) so that the mocked "Update price" and "Create listing" actions can move a listing between states live during a session (e.g. update L3's price down to 385 → recomputes to Near target → button changes to reflect new state) — this is important for the "can sellers choose the correct next action" research question, since it lets a participant see the *consequence* of their action, not just a static screen.

## 16. Proposed file and component structure

```
deals-opportunities-prototype/
├── README.md                          # what this is, how to run, how to reset/disable, research context link
├── package.json
├── nuxt.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── .npmrc                              # Revolve registry auth — confirmed working (§9), token via env var, gitignored, never committed
├── .gitignore
├── docs/
│   ├── PLAN.md                        # this document
│   ├── prototype-reference/           # already created — source-of-truth reference material (this planning session)
│   └── visual-qa/                     # screenshot diffs, see §20
├── public/
│   └── robots.txt                     # Disallow: / (no search-engine indexing)
├── app/
│   ├── app.vue
│   ├── layouts/
│   │   └── back-office-shell.vue      # header/nav chrome — reference: front-apps TheHeader/TabsSales, screenshots
│   ├── domain/
│   │   ├── types.ts                   # Campaign, ListingFixture, ListingStatus, ExportRow (§13)
│   │   ├── calculations.ts            # computeDealMetrics, computeListingStatus (§14/§15) — pure fns, unit tested
│   │   └── calculations.spec.ts
│   ├── fixtures/
│   │   ├── campaigns.ts               # C1, C2 (§13)
│   │   ├── listings.ts                # L1–L6 (§13)
│   │   └── scenarios.ts               # maps ?scenario= query values → which fixture "view" to highlight/scroll to
│   ├── composables/
│   │   ├── useDealScenario.ts         # reads route query, seeds reactive state from fixtures + any session mutations
│   │   ├── useListingActions.ts       # mocked updatePrice(listingId, newPrice) / createListing(listingId) — mutate local reactive state only
│   │   ├── useCsvExport.ts            # builds CSV blob client-side from computeDealMetrics, triggers download
│   │   └── useEventLog.ts             # lightweight local event logging + downloadable JSON log (§19)
│   ├── components/
│   │   ├── rev/                       # thin local wrappers around real @ds/components/* (createRevolvePlugin setup, i18n/translate shims) — real Revolve, not a shim
│   │   ├── listings/
│   │   │   ├── ListingsTable.vue
│   │   │   ├── ListingsFilters.vue
│   │   │   ├── DealsBanner.vue
│   │   │   └── ExportDrawer.vue
│   │   └── deals/
│   │       ├── CampaignCard.vue
│   │       ├── CampaignFilters.vue
│   │       ├── CampaignDrawer.vue
│   │       ├── ModelsTable.vue
│   │       ├── StatusTag.vue
│   │       └── ActionButton.vue
│   └── pages/
│       ├── index.vue                  # redirect → /listings
│       ├── listings.vue
│       └── opportunities/
│           └── deals.vue
└── tests/
    └── e2e/                            # Playwright, see §21
```

Each new file's rationale/inputs/outputs is detailed in §16 above inline; none of them can reuse an existing file directly (this is a from-scratch standalone project by requirement), but each has a named reference source (front-apps component, `deals-v1-proto.html`, or the brief itself) rather than being invented — all are prototype-only, none are intended to be reusable/shared with other repos.

## 17. Revolve component mapping (per new component)

| New component | Existing equivalent (reference only) | Revolve components composed | Main props | Main states | Responsive | Test cases |
|---|---|---|---|---|---|---|
| `DealsBanner.vue` | front-apps `listings/.../DealsBanner.vue`; `deals-v1-proto.html` `.deal-banner` | `RevCard`/`RevMessage`, `RevBadge`, `RevButton` | `campaigns: Campaign[]` | hidden (0 campaigns) / collapsed / expanded | stacks CTAs on mobile per front-apps breakpoint pattern | renders nothing when no active campaign; shows count badge; "See all deals" navigates to `/opportunities/deals` |
| `CampaignCard.vue` | front-apps `DealCampaignCard.vue` | `RevButtonCard`, `RevTag`, `RevBadge` | `campaign: Campaign` | default / hover / focus | 1-col mobile, grid ≥2 cols desktop | click opens drawer with matching campaign id; shows correct market flags/model count |
| `CampaignDrawer.vue` | front-apps `DealCampaignDrawer.vue`; `deals-v1-proto.html` drawer + "decision support" panel | `RevDrawer`, `RevTable`, `RevButton` | `campaignId: string \| null` | closed / loading (brief demo delay) / loaded / empty (no eligible listings) | full-width on mobile per Revolve Drawer default | opens/closes on campaign id change; lists only listings for that campaign |
| `ModelsTable.vue` | front-apps `ModelsTable` (cells: Product/Price/Status/Actions) | `RevTable`, `StatusTag`, `ActionButton` | `listings: ListingFixture[]` | empty / populated / paginated | horizontal scroll on narrow viewports (matches front-apps table pattern) | correct status per fixture; correct action per status; pagination math |
| `StatusTag.vue` | front-apps `StatusCell.vue` | `RevTag` | `status: ListingStatus` | 4 fixed variants | n/a | maps each of the 4 statuses to correct tag variant + label |
| `ActionButton.vue` | front-apps `ActionsCell.vue` | `RevButton` | `status: ListingStatus`, `listing: ListingFixture` | 3 action types (view/update/create) | n/a | correct label+handler per status; emits mock action event to `useEventLog` |
| `ListingsTable.vue` | front-apps `ListingsTable.vue` + `ExpandedListing.vue` | `RevTable`, `RevTag` (in-deal chip) | `listings: ListingFixture[]` | collapsed/expanded rows | matches front-apps min-width + scroll pattern | in-deal chip shows only for listings with a campaignId |
| `ListingsFilters.vue` | front-apps `Filters.vue`/`QuickFilters.vue` | `RevInputSelect`, `RevInputMultiSelect`, `RevButton` | `filters: {market?, productType?}` | default / applied / reset | desktop vs mobile variants (front-apps splits these into separate components — we'll keep one responsive component for prototype simplicity, flagged as an intentional simplification) | filtering by market/type narrows table correctly; reset clears |
| `CampaignFilters.vue` | (new, matches brief's "filters for market and product type" on Deals page) | `RevInputSelect` | `filters` | same as above | same | same |
| `ExportDrawer.vue` | front-apps `ImportExportDrawer.vue`; brief's export spec | `RevDrawer`, `RevButton`, `RevInfoBlock` | `listings: ListingFixture[]` | idle / exporting (brief delay) / success (toast) | full-width mobile | triggers `useCsvExport`; produces correct 7-column CSV; blank Deal columns for non-Deal listings |

## 18. Research scenarios

Four deterministic entry points via query param, each seeding `useDealScenario` to scroll/highlight the relevant fixture without telling the participant what to do (per brief — "do not tell the participant which control to use," these only set the *starting data state*, not any UI hints):

- `?scenario=in-deal` → seller session where L1 (In Deal) is the seller's most prominent listing
- `?scenario=near-target` → L2 prominent
- `?scenario=above-target` → L3/L5 prominent (including the negative-profit case)
- `?scenario=not-listed` → L4 prominent

A neutral default (no query param) shows the full mixed fixture set, for open-ended "can they discover it themselves" sessions.

**"Starting soon" explicitly excluded this iteration** (resolved decision, §0.5): real target pricing for upcoming campaigns isn't locked in far enough ahead yet — product/model lists can be released ~30 days pre-launch, but pricing may not be confirmed until ~1 week before, and that lead-time question is still under internal discussion. Only `active`/validated campaigns are modeled in fixtures for now (matches both the brief and the real Step 1 PRD's explicit MVP scope). The `Campaign.status` type can stay open to `'starting_soon'` for a future iteration once that internal discussion resolves — no fixtures use it yet.

## 19. Event logging approach

Lightweight, local-only, no external analytics (per constraint), and — per resolved decision §0.6 — designed to be maximally useful for research debrief without needing the moderator to remember anything:

- `useEventLog.ts` pushes typed events to a reactive in-memory array. **Event names mirror the real Step 1 PRD's own tracking-strategy list verbatim** (`docs/prototype-reference/prds/step-1-deal-opportunities-mvp.md`), both for realism and so any learnings here map directly onto the real product's eventual analytics naming:
  - `deals_tab_viewed`
  - `campaign_card_opened`
  - `campaign_drawer_opened`
  - `listing_status_filtered_or_viewed`
  - `action_clicked` (payload: `'view_listing' | 'update_price' | 'create_listing'`)
  - `listing_price_updated_after_viewing_deal`
  - `export_triggered` (prototype-specific addition, not in the PRD list, but needed for the secondary journey)
- **Always-visible "Session log" control** — a small, persistent, unobtrusive button (e.g. bottom corner of the shell, styled quietly so it doesn't distract participants) rather than a hidden keyboard shortcut. Opens a lightweight panel showing the live event count + a "Download session log" action that exports the array as a timestamped JSON file. This is the most helpful option for a moderator running back-to-back 30-minute sessions — no need to remember a debug flag, and it doubles as a live progress indicator during the session.
- Explicitly no Segment/GA/Amplitude/etc. in v1, per constraint.

## 20. Visual QA approach

Fixed-viewport screenshot comparison, matching Andrew's existing patterns:
1. Fixed viewport sizes: 1440×900 (desktop, matches most BM BO screenshots) and 390×844 (mobile, iPhone-class).
2. Headless Chrome (already confirmed available on this machine, used above to capture the live GH Pages hub) drives `--screenshot` captures of each route/state (`/listings`, `/opportunities/deals`, drawer open, each of the 4 statuses, export success toast).
3. Screenshots saved to `docs/visual-qa/<date>/` and diffed manually against `docs/prototype-reference/screenshots/` + front-apps structural notes before each research session.
4. No automated pixel-diff tooling proposed for v1 (adds dependency weight disproportionate to a 30-min-session research prototype) — manual side-by-side review is sufficient at this scale; revisit if the prototype outlives its initial research window.

## 21. Test strategy

- **Unit tests** (Vitest, matching front-apps convention): `domain/calculations.spec.ts` — exhaustively tests both calculation branches (§14) including the negative-profit case, boundary conditions at exactly target price and exactly 3% over.
- **Component tests** (Vitest + `@testing-library/vue`, `*.nuxt.spec.ts` naming, matching front-apps convention): `StatusTag`, `ActionButton`, `ModelsTable` — verify correct status→label→action mapping for all 4 states.
- **E2E smoke test** (Playwright — chosen over Cypress since it's already a front-apps devDependency pattern, even though unused there for e2e; light footprint for a small app): one script per primary/secondary journey (`listings → deals → drawer → action`, `listings → export → CSV contains expected columns`) run against each of the 4 `?scenario=` starting states. This is the main "is it demo-safe" gate before each research session.
- No visual regression test framework in v1 (see §20 rationale).

## 22. Hosting and external-sharing strategy

**Investigated options:**

| Option | Status | Verdict |
|---|---|---|
| `prototypes.backmarket.io` | **NXDOMAIN from this network** (`dig`/`curl` both fail to resolve) — likely requires BM VPN/internal DNS, or the exact hostname/onboarding process needs confirming with the platform team | **Deferred (resolved decision §0.3)** — Andrew wants to pursue this in future, but not this week given the timeline. Not needed for v1. |
| `ai-prototypes.statics.backmarket.com` | Confirmed reachable, returns HTTP 302 (redirect to Okta login) | Confirmed Okta+Cloudflare gated as expected — unsuitable for external sellers regardless; not used |
| DSE (preprod) | Not investigated per brief instruction | Excluded — no reason to test real preprod behavior here |
| Vercel | Excluded per standing instruction (banned at BM, not compliant) | Excluded |
| **GH Pages (dedicated new repo)** — **chosen for v1** | Feasible immediately, zero infra dependency, matches the "own deployment" requirement | See setup below |

**v1 hosting plan (GH Pages)**:
1. New, dedicated public GitHub repo for this project only (e.g. `andrewmalonebm/deals-opportunities-prototype` or under a personal account — **not** a fork/branch of `BackMarket-SellerXP`, satisfying the repo-boundary rule). No other prototypes or hub code live in it.
2. `nuxt generate` → static output → deployed via GitHub Actions to GH Pages, same mechanism Andrew already uses for `seller-xp` (but a wholly separate repo/pipeline — no shared workflow files, no shared Pages site).
3. **Access control caveats (important, flagged clearly)**: GH Pages has no built-in password gate for public repos. We add:
   - A lightweight **client-side passphrase gate** (cosmetic only, not real security — a simple "enter the session passphrase" screen before the app loads, passphrase shared verbally/by email per session) so the URL alone isn't enough.
   - `public/robots.txt` with `Disallow: /` (no search-engine indexing).
   - An unlisted, non-guessable URL slug (not `deals-adoption` or anything discoverable).
4. This is explicitly weaker access control than `prototypes.backmarket.io` would offer — acceptable here because **all data is synthetic/mocked**, nothing sensitive is exposed, and the whole thing is easy to disable/delete instantly by unpublishing Pages or deleting the repo.

**Access assumptions**: no Back Market employee login required for sellers (satisfied trivially by GH Pages). **Protection**: passphrase gate + unlisted URL + no-index. **Disable**: unpublish GH Pages or delete the repo (instant, no platform-team dependency). **No secrets in browser**: guaranteed by the fully static, no-backend architecture (§8/§9) — verified at build time by scanning the static output for the Revolve `.npmrc` token pattern before every deploy (it should never appear; it's a build-time-only credential, not bundled into the compiled JS).

**Future**: revisit `prototypes.backmarket.io` once there's time — would need a platform/infra support request to confirm the hostname, onboarding process, and whether it supports non-BM-identity access for external research participants. Track as a follow-up, not a blocker.

## 23. Remaining risks / follow-ups (non-blocking)

1. **Image content unverified** (§3) — the 4 "pricing-margin-concepts" screenshots and general vision-tool unavailability this session mean nothing was visually confirmed by AI; Andrew should skim `docs/prototype-reference/screenshots/` directly before relying on them.
2. **`prototypes.backmarket.io` DNS failure** — could mean VPN-only, a typo, or the service doesn't exist under that exact name yet. Deferred per resolved decision §0.3; revisit later, not a blocker now.
3. **Real PRD risk callout** (Step 1 PRD, "Risk" section): large campaigns (many models) may cause >30s filtering in the real product, potentially needing campaign splitting. Not applicable to this prototype's small deterministic fixture set — noted for awareness only, not something we simulate.
4. **GH Pages passphrase gate is cosmetic, not real security** (§22) — acceptable given fully-mocked data, but worth restating to anyone who might assume otherwise.

## 24. Phased implementation plan

- **Phase 0 (this document)**: planning, reference gathering, all 6 decisions resolved — done. Ready to start Phase 1 on Andrew's go-ahead.
- **Phase 1 — Scaffold**: `git init`, Nuxt 4 + TS + Tailwind scaffold, `.gitignore`, `README.md`, empty route shell (`/listings`, `/opportunities/deals`), Back Office shell layout with static (non-functional) nav matching front-apps' nav item list. Real Revolve package installed from day one (access confirmed working) rather than deferred to a later pass. Ships to the GH Pages host immediately so the "own deployment" requirement is satisfied end-to-end early.
- **Phase 2 — Domain + fixtures**: `domain/types.ts`, `domain/calculations.ts` (+ unit tests), `fixtures/campaigns.ts`, `fixtures/listings.ts` — fully testable before any UI exists.
- **Phase 3 — Primary journey UI**: DealsBanner → CampaignCard → CampaignDrawer → ModelsTable → StatusTag/ActionButton, wired to fixtures + `?scenario=` query param + mocked actions + toasts, using real `@ds/components/*` throughout.
- **Phase 4 — Secondary journey UI**: ExportDrawer + `useCsvExport`, wired to the same fixtures, using the exact PRD field labels for CSV columns.
- **Phase 5 — Research instrumentation**: `useEventLog` (PRD-aligned event taxonomy, §19), reset action, loading/empty/error states, always-visible session-log control.
- **Phase 6 — Visual QA pass**: screenshot comparison against reference material (§20), fix any drift from front-apps/PRD structure.
- **Phase 7 — Hosting + share**: deploy to the dedicated GH Pages repo (§22), passphrase gate + noindex, share URL, dry-run a full moderated-session script end-to-end before the first real seller session.

## 25. Smallest first implementation slice

A single static route, `/opportunities/deals`, rendering:
- 2 campaign cards (C1, C2) from static fixtures, using real `RevButtonCard`/`RevTag` from day one — no drawer yet, no listings table yet.
- Clicking a card just logs an event (console) — proves the routing/fixture/component wiring end-to-end with zero risk.
- Deployed to the dedicated GH Pages repo immediately, so we validate the full "build → deploy → shareable URL" pipeline on day one, before investing in further UI.

This slice deliberately proves the riskiest unknowns first (independent repo, independent build, independent deploy, real Revolve package install, fixture data shape) before spending time on breadth of features.

## 26. Acceptance criteria

A session is "ready to run" when:
- [ ] All 4 listing statuses (`IN_TARGET`/`NEAR_TARGET`/`FAR_TARGET`/`NOT_LISTED`) are reachable via `?scenario=` and via organic navigation, with visually distinct, correctly-labeled status tags
- [ ] Each status shows exactly the correct contextual action (View listing / Update price / Create listing), and clicking it produces a mocked, visible, non-network state change + toast
- [ ] The negative-profit-per-unit fixture (L3) is visible in both the Deals models table and the CSV export, with correct (negative) numbers matching §14's worked example
- [ ] CSV export downloads client-side, contains all 7 columns using the exact PRD field labels (`Deal - Target price`, `Deal - Price gap vs target`, `Deal - Earnings after original commission`, `Deal - Earnings after reduced commission`, `Deal - Estimated profit per unit`, `Deal - Estimated total profit`, `Deal - Participation`), and omits Deal columns entirely for the one non-Deal listing (L6)
- [ ] Reset action returns all state (including any mocked price updates/listing creations) to the deterministic fixture baseline
- [ ] Loading, empty, and error states all render (can be forced via a debug flag) and look intentional, not broken
- [ ] The prototype is reachable at the GH Pages URL behind the passphrase gate, with no Back Market login required for the participant, and does not appear in search engines
- [ ] No secrets, tokens, or production data appear anywhere in the built output (the Revolve registry token is build-time-only via `.npmrc`/env var — verified absent from the static bundle before every deploy)
- [ ] A moderator can, within 60 seconds, reset the prototype to a clean state between back-to-back sessions, and can download the session event log

---

## What I found (summary)

- This is genuinely a live, currently-being-built feature in `front-apps` (not hypothetical), and the two real PRDs (provided directly by Andrew) confirm it end to end — status matrix, route, campaign card/drawer fields, action logic, and calculation rules all matched what was reverse-engineered from code, with only three small refinements needed.
- Andrew's own past work (`deals-v1-proto.html`, the GH Pages hub) contains a strong interaction-pattern reference — and the GH Pages hub turns out to be the *officially-linked* design reference for the real Jira ticket (SXP-9914), not just a personal exploration.
- Real Revolve package access is confirmed working right now on this machine (`@backmarket/design-system` v129.13.0 via the existing registry auth) — no shim needed.
- `prototypes.backmarket.io` doesn't resolve from this network and is deferred to a future iteration per Andrew's call; GH Pages is the v1 hosting plan.

## What I recommend

- Nuxt 4 + TypeScript + Tailwind, statically generated, zero backend, zero secrets, real `@backmarket/design-system` components throughout.
- Structure/terminology follows the real front-apps Deals feature + the real PRDs exactly (including the "View listing" copy decision); interaction pattern borrowed from `deals-v1-proto.html`.
- Ship the smallest slice (2 real-Revolve campaign cards) to a real deployed GH Pages URL on day one to prove the pipeline, then layer in the rest per the phased plan (§24).
- "Starting soon" campaign state deliberately deferred — revisit once the pricing-lead-time discussion (30 days for product list, ~1 week for pricing) resolves internally.

## Files I would create (Phase 1 onward — none created yet beyond this planning doc + reference folder)

See the full tree in §16.

## Ready to start Phase 1

All 6 decisions are resolved (§0), the real PRDs are saved and reconciled against the plan, and Revolve package access is confirmed working. Nothing else is blocking implementation.

**One last check before I start writing code**: shall I proceed now with Phase 1 (scaffold: `git init`, Nuxt 4 + Tailwind + real Revolve, empty route shell, first deploy to a new GH Pages repo)? If so, please confirm the GitHub account/org this new repo should live under (e.g. your personal `andrewmalonebm` account, matching the boundary rules) and I'll get started.
