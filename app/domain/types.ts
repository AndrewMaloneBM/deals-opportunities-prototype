/**
 * Domain types for the Deals Opportunities research prototype.
 *
 * Sourced from (not copied from) BackMarket/front-apps' real, in-progress
 * `Opportunities → Deals` feature and the two real PRDs saved under
 * `docs/prototype-reference/prds/`:
 *   - step-0-deal-info-in-listings-export.md (calculation model, ExportRow)
 *   - step-1-deal-opportunities-mvp.md (status matrix, Campaign fields)
 *
 * This is a from-scratch, standalone prototype. Nothing here is imported
 * from front-apps or any other Back Market repository.
 */

/** At least 2 markets required by the research brief — 4 modeled for realism. */
export type Market = 'FR' | 'ES' | 'DE' | 'IT'

/** At least 2 product types required by the research brief. */
export type ProductType = 'smartphone' | 'laptop'

/**
 * Backend status values, matching front-apps' shipped enum and the real
 * Step 1 PRD's "Listings statuses" table exactly.
 */
export type ListingStatus =
  | 'IN_TARGET'
  | 'NEAR_TARGET'
  | 'FAR_TARGET'
  | 'NOT_LISTED'

/** User-facing labels for each backend status (PRD §"Listings statuses"). */
export const STATUS_LABEL: Record<ListingStatus, string> = {
  IN_TARGET: 'In Deal',
  NEAR_TARGET: 'Near target',
  FAR_TARGET: 'Above target',
  NOT_LISTED: 'Not listed',
}

/**
 * Contextual action per status (PRD §"Actions").
 * Copy is "View listing" (not the PRD narrative's inconsistent "See listing")
 * per Andrew's resolved decision to follow front-apps' shipped code, which
 * also matches the PRD's own tracking-strategy event list.
 */
export type ActionType = 'view_listing' | 'update_price' | 'create_listing'

export const ACTION_LABEL: Record<ActionType, string> = {
  view_listing: 'View listing',
  update_price: 'Update price',
  create_listing: 'Create listing',
}

export const STATUS_ACTION: Record<ListingStatus, ActionType> = {
  IN_TARGET: 'view_listing',
  NEAR_TARGET: 'update_price',
  FAR_TARGET: 'update_price',
  NOT_LISTED: 'create_listing',
}

/** Only 'active' campaigns are modeled in this iteration (resolved decision —
 * 'starting_soon' deliberately deferred; pricing lead-time is still under
 * internal discussion). The type stays open for a future iteration. */
export type CampaignStatus = 'active' | 'starting_soon'

export interface Campaign {
  id: string
  /** "[Brand] [Product] — selected models" naming convention per the Feb 2025 PRD ancestor doc. */
  name: string
  status: CampaignStatus
  startDate: string
  endDate: string
  markets: Market[]
  modelCount: number
  /** e.g. 0.11 for 11% */
  originalCommissionRate: number
  /** e.g. 0.07 for 7% */
  reducedCommissionRate: number
  description: string
}

export interface ListingFixture {
  id: string
  productName: string
  productType: ProductType
  sku: string
  market: Market
  /** null = this listing is not part of any Deal (PRD Use case C — no Deal info shown). */
  campaignId: string | null
  /** null = Not Listed (no active listing exists for this seller/product/config). */
  currentPrice: number | null
  /** null only when campaignId is null; otherwise the Deal's target price for this listing's campaign. */
  targetPrice: number | null
  stock: number
  /** For NOT_LISTED fixtures only: whether the product is eligible for Create listing
   * (PRD: "Create listing is only shown when the product is eligible" — NOT_LISTED
   * status alone isn't sufficient). Ignored for listings that already have a price. */
  eligibleForCreateListing?: boolean
}

/**
 * Computed once per render from price/target/existence — never stored as a
 * field, so mocked "Update price" / "Create listing" actions can move a
 * listing between states live during a session (brief requirement).
 */
export interface DealMetrics {
  priceGap: number
  originalEarnings: number
  dealEarnings: number
  profitPerUnit: number
  totalProfit: number
  /** Yes when current price is at or below target price (PRD Step 0). */
  participation: boolean
}

/**
 * One row of the CSV export. Field labels are the exact strings from the
 * real Step 0 PRD ("Deal - ..."), not paraphrased.
 */
export interface ExportRow {
  sku: string
  productName: string
  market: Market
  currentPrice: number | null
  stock: number
  /** undefined when the listing has no associated Deal (PRD Use case C — omit entirely, not zero). */
  deal?: {
    targetPrice: number
    priceGapVsTarget: number
    earningsAfterOriginalCommission: number
    earningsAfterReducedCommission: number
    estimatedProfitPerUnit: number
    estimatedTotalProfit: number
    participation: 'Yes' | 'No'
  }
}
