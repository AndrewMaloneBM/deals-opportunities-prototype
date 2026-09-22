/**
 * Pure calculation functions for the Deals Opportunities prototype.
 *
 * Calculation rules match the real Step 0 PRD exactly
 * (`docs/prototype-reference/prds/step-0-deal-info-in-listings-export.md`,
 * Use case A / B / C). Status boundaries match the real Step 1 PRD's
 * "Listings statuses" table exactly
 * (`docs/prototype-reference/prds/step-1-deal-opportunities-mvp.md`).
 *
 * No rounding happens inside these functions — only at the display/export
 * boundary (see `roundCurrency`) — to avoid compounding rounding errors
 * across chained calculations.
 */
import type {
  Campaign,
  DealMetrics,
  ExportRow,
  ListingFixture,
  ListingStatus,
} from './types'

const NEAR_TARGET_THRESHOLD = 1.03

/**
 * Status is always derived from price/target/existence, never stored —
 * so mocked price updates / listing creation can move a fixture between
 * states live during a research session.
 */
export function computeListingStatus(
  currentPrice: number | null,
  targetPrice: number,
): ListingStatus {
  if (currentPrice == null) return 'NOT_LISTED'
  if (currentPrice <= targetPrice) return 'IN_TARGET'
  if (currentPrice <= targetPrice * NEAR_TARGET_THRESHOLD) return 'NEAR_TARGET'
  return 'FAR_TARGET'
}

/**
 * Step 0 PRD, Use case A (at or below target) / Use case B (above target).
 * Returns null when there's no active listing (Not Listed) — no Deal
 * metrics exist for a listing that doesn't exist yet.
 */
export function computeDealMetrics(
  currentPrice: number | null,
  targetPrice: number,
  stock: number,
  originalCommissionRate: number,
  reducedCommissionRate: number,
): DealMetrics | null {
  if (currentPrice == null) return null

  const atOrBelowTarget = currentPrice <= targetPrice

  const priceGap = currentPrice - targetPrice
  const originalEarnings = currentPrice * (1 - originalCommissionRate)
  const dealEarnings = atOrBelowTarget
    ? currentPrice * (1 - reducedCommissionRate)
    : targetPrice * (1 - reducedCommissionRate)
  const profitPerUnit = dealEarnings - originalEarnings
  const totalProfit = profitPerUnit * stock

  return {
    priceGap,
    originalEarnings,
    dealEarnings,
    profitPerUnit,
    totalProfit,
    participation: atOrBelowTarget,
  }
}

export function findCampaign(
  campaigns: Campaign[],
  campaignId: string | null,
): Campaign | null {
  if (campaignId == null) return null
  return campaigns.find((c) => c.id === campaignId) ?? null
}

/** Convenience wrapper operating on a fixture + its campaign list directly. */
export function computeStatusForListing(
  listing: ListingFixture,
  campaigns: Campaign[],
): ListingStatus | null {
  const campaign = findCampaign(campaigns, listing.campaignId)
  if (!campaign || listing.targetPrice == null) return null
  return computeListingStatus(listing.currentPrice, listing.targetPrice)
}

export function computeMetricsForListing(
  listing: ListingFixture,
  campaigns: Campaign[],
): DealMetrics | null {
  const campaign = findCampaign(campaigns, listing.campaignId)
  if (!campaign || listing.targetPrice == null) return null
  return computeDealMetrics(
    listing.currentPrice,
    listing.targetPrice,
    listing.stock,
    campaign.originalCommissionRate,
    campaign.reducedCommissionRate,
  )
}

/** Round to 2 decimal places for display/export only — never used internally. */
export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100
}

/**
 * Builds one CSV export row. Deal columns are entirely omitted (not zeroed)
 * for listings with no associated campaign — PRD Use case C: "we do not
 * display the Deal information."
 */
export function toExportRow(
  listing: ListingFixture,
  campaigns: Campaign[],
): ExportRow {
  const campaign = findCampaign(campaigns, listing.campaignId)
  const base: ExportRow = {
    sku: listing.sku,
    productName: listing.productName,
    market: listing.market,
    currentPrice: listing.currentPrice,
    stock: listing.stock,
  }

  if (!campaign || listing.targetPrice == null || listing.currentPrice == null) {
    return base
  }

  const metrics = computeDealMetrics(
    listing.currentPrice,
    listing.targetPrice,
    listing.stock,
    campaign.originalCommissionRate,
    campaign.reducedCommissionRate,
  )
  if (!metrics) return base

  return {
    ...base,
    deal: {
      targetPrice: roundCurrency(listing.targetPrice),
      priceGapVsTarget: roundCurrency(metrics.priceGap),
      earningsAfterOriginalCommission: roundCurrency(metrics.originalEarnings),
      earningsAfterReducedCommission: roundCurrency(metrics.dealEarnings),
      estimatedProfitPerUnit: roundCurrency(metrics.profitPerUnit),
      estimatedTotalProfit: roundCurrency(metrics.totalProfit),
      participation: metrics.participation ? 'Yes' : 'No',
    },
  }
}
