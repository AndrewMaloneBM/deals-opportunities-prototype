import type { ListingFixture } from '~/domain/types'

/**
 * Deterministic listing fixtures. Deliberately covers every state required
 * by the research brief:
 *  - L1: In Deal (IN_TARGET)
 *  - L2: Near target (NEAR_TARGET, ~2.3% over)
 *  - L3: Above target (FAR_TARGET, ~7.9% over) — the negative-profit fixture
 *  - L4: Not listed (NOT_LISTED), eligible for Create listing
 *  - L5: Above target (FAR_TARGET, ~3.9% over) — small gap, positive-profit contrast
 *  - L6: not part of any Deal — excluded from the Deals tab and from Deal
 *        export columns entirely (PRD Use case C)
 *
 * Two product types, four markets, varied stock (0/15/25/40/60/80) and two
 * different commission-rate pairs (11%→7%, 12%→8%) — all per the brief.
 */
export const LISTINGS: ListingFixture[] = [
  {
    id: 'l1',
    productName: 'iPhone 15 128GB — Blue',
    productType: 'smartphone',
    sku: 'IP15-128-BLU-FR',
    market: 'FR',
    campaignId: 'c1',
    currentPrice: 439,
    targetPrice: 439,
    stock: 40,
  },
  {
    id: 'l2',
    productName: 'iPhone 15 128GB — Blue',
    productType: 'smartphone',
    sku: 'IP15-128-BLU-ES',
    market: 'ES',
    campaignId: 'c1',
    currentPrice: 449,
    targetPrice: 439,
    stock: 25,
  },
  {
    id: 'l3',
    productName: 'Galaxy S23 128GB — Phantom Black',
    productType: 'smartphone',
    sku: 'GS23-128-BLK-FR',
    market: 'FR',
    campaignId: 'c2',
    currentPrice: 410,
    targetPrice: 380,
    stock: 60,
  },
  {
    id: 'l4',
    productName: 'MacBook Air M2 256GB',
    productType: 'laptop',
    sku: 'MBA-M2-256-DE',
    market: 'DE',
    campaignId: 'c2',
    currentPrice: null,
    targetPrice: 720,
    stock: 0,
    eligibleForCreateListing: true,
  },
  {
    id: 'l5',
    productName: 'Galaxy S23 128GB — Phantom Black',
    productType: 'smartphone',
    sku: 'GS23-128-BLK-IT',
    market: 'IT',
    campaignId: 'c2',
    currentPrice: 395,
    targetPrice: 380,
    stock: 15,
  },
  {
    id: 'l6',
    productName: 'iPhone 13 128GB — Midnight',
    productType: 'smartphone',
    sku: 'IP13-128-MID-FR',
    market: 'FR',
    campaignId: null,
    currentPrice: 320,
    targetPrice: null,
    stock: 80,
  },
]
