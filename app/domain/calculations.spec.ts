import { describe, expect, it } from 'vitest'
import {
  computeDealMetrics,
  computeListingStatus,
  roundCurrency,
  toExportRow,
} from './calculations'
import type { Campaign, ListingFixture } from './types'

describe('computeListingStatus', () => {
  it('returns IN_TARGET when price is exactly at target', () => {
    expect(computeListingStatus(439, 439)).toBe('IN_TARGET')
  })

  it('returns IN_TARGET when price is below target', () => {
    expect(computeListingStatus(400, 439)).toBe('IN_TARGET')
  })

  it('returns NEAR_TARGET when price is above target but within 3%', () => {
    // 439 * 1.03 = 452.17
    expect(computeListingStatus(449, 439)).toBe('NEAR_TARGET')
  })

  it('returns NEAR_TARGET at exactly the 3% boundary (inclusive)', () => {
    const target = 100
    expect(computeListingStatus(103, target)).toBe('NEAR_TARGET')
  })

  it('returns FAR_TARGET just above the 3% boundary', () => {
    const target = 100
    expect(computeListingStatus(103.01, target)).toBe('FAR_TARGET')
  })

  it('returns FAR_TARGET when price is well above target', () => {
    expect(computeListingStatus(410, 380)).toBe('FAR_TARGET')
  })

  it('returns NOT_LISTED when there is no current price', () => {
    expect(computeListingStatus(null, 720)).toBe('NOT_LISTED')
  })
})

describe('computeDealMetrics — Use case A (at or below target)', () => {
  it('matches the PRD worked example for an in-target listing', () => {
    // price 439, target 439, commission 11% -> 7%, stock 40
    const metrics = computeDealMetrics(439, 439, 40, 0.11, 0.07)
    expect(metrics).not.toBeNull()
    expect(metrics!.priceGap).toBe(0)
    expect(roundCurrency(metrics!.originalEarnings)).toBeCloseTo(390.71, 2)
    expect(roundCurrency(metrics!.dealEarnings)).toBeCloseTo(408.27, 2)
    expect(metrics!.participation).toBe(true)
  })
})

describe('computeDealMetrics — Use case B (above target)', () => {
  it('matches the plan\u2019s worked example exactly (negative profit fixture)', () => {
    // Galaxy S23: price 410, target 380, commission 12% -> 8%, stock 60
    const metrics = computeDealMetrics(410, 380, 60, 0.12, 0.08)
    expect(metrics).not.toBeNull()
    expect(metrics!.priceGap).toBe(30)
    expect(roundCurrency(metrics!.originalEarnings)).toBe(360.8)
    expect(roundCurrency(metrics!.dealEarnings)).toBe(349.6)
    expect(roundCurrency(metrics!.profitPerUnit)).toBe(-11.2)
    expect(roundCurrency(metrics!.totalProfit)).toBe(-672)
    expect(metrics!.participation).toBe(false)
  })

  it('can also produce a positive profit per unit when the gap is small', () => {
    // price 395, target 380 (3.9% over -> FAR_TARGET), commission 12% -> 8%, stock 15
    const metrics = computeDealMetrics(395, 380, 15, 0.12, 0.08)
    expect(metrics).not.toBeNull()
    // dealEarnings = 380 * 0.92 = 349.6, originalEarnings = 395 * 0.88 = 347.6
    expect(roundCurrency(metrics!.originalEarnings)).toBe(347.6)
    expect(roundCurrency(metrics!.dealEarnings)).toBe(349.6)
    expect(roundCurrency(metrics!.profitPerUnit)).toBe(2)
    expect(metrics!.participation).toBe(false)
  })
})

describe('computeDealMetrics — Not Listed', () => {
  it('returns null when there is no current price', () => {
    expect(computeDealMetrics(null, 720, 0, 0.12, 0.08)).toBeNull()
  })
})

describe('toExportRow', () => {
  const campaigns: Campaign[] = [
    {
      id: 'c1',
      name: 'Apple iPhones — selected models',
      status: 'active',
      startDate: '2026-09-01',
      endDate: '2026-10-15',
      markets: ['FR', 'ES'],
      modelCount: 12,
      originalCommissionRate: 0.11,
      reducedCommissionRate: 0.07,
      description: 'Reduced commission on selected iPhone models.',
    },
  ]

  it('omits the deal object entirely for a listing with no campaign (Use case C)', () => {
    const listing: ListingFixture = {
      id: 'l6',
      productName: 'iPhone 13 128GB',
      productType: 'smartphone',
      sku: 'SKU-L6',
      market: 'FR',
      campaignId: null,
      currentPrice: 320,
      targetPrice: null,
      stock: 80,
    }
    const row = toExportRow(listing, campaigns)
    expect(row.deal).toBeUndefined()
    expect(row.sku).toBe('SKU-L6')
  })

  it('includes correctly rounded deal fields for a listing in a campaign', () => {
    const listing: ListingFixture = {
      id: 'l1',
      productName: 'iPhone 15 128GB',
      productType: 'smartphone',
      sku: 'SKU-L1',
      market: 'FR',
      campaignId: 'c1',
      currentPrice: 439,
      targetPrice: 439,
      stock: 40,
    }
    const row = toExportRow(listing, campaigns)
    expect(row.deal).toBeDefined()
    expect(row.deal!.participation).toBe('Yes')
    expect(row.deal!.priceGapVsTarget).toBe(0)
  })

  it('omits the deal object for a Not Listed fixture even if it has a campaignId', () => {
    const listing: ListingFixture = {
      id: 'l4',
      productName: 'MacBook Air M2',
      productType: 'laptop',
      sku: 'SKU-L4',
      market: 'DE',
      campaignId: 'c1',
      currentPrice: null,
      targetPrice: 720,
      stock: 0,
      eligibleForCreateListing: true,
    }
    const row = toExportRow(listing, campaigns)
    expect(row.deal).toBeUndefined()
  })
})
