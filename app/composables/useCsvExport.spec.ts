import { describe, expect, it } from 'vitest'
import { buildExportCsv } from './useCsvExport'
import type { Campaign, ListingFixture } from '~/domain/types'

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
    description: 'desc',
  },
]

const listings: ListingFixture[] = [
  {
    id: 'l1',
    productName: 'iPhone 15 128GB',
    productType: 'smartphone',
    sku: 'SKU-1',
    market: 'FR',
    campaignId: 'c1',
    currentPrice: 439,
    targetPrice: 439,
    stock: 40,
  },
  {
    id: 'l6',
    productName: 'iPhone 13 128GB',
    productType: 'smartphone',
    sku: 'SKU-6',
    market: 'FR',
    campaignId: null,
    currentPrice: 320,
    targetPrice: null,
    stock: 80,
  },
]

describe('buildExportCsv', () => {
  const csv = buildExportCsv(listings, campaigns)
  const lines = csv.split('\n')

  it('has the exact PRD field labels as the header row', () => {
    expect(lines[0]).toBe(
      'SKU,Product,Market,Current price,Stock,Deal - Target price,Deal - Price gap vs target,Deal - Earnings after original commission,Deal - Earnings after reduced commission,Deal - Estimated profit per unit,Deal - Estimated total profit,Deal - Participation',
    )
  })

  it('fills in Deal columns for a listing that is part of a campaign', () => {
    expect(lines[1]).toBe('SKU-1,iPhone 15 128GB,FR,439,40,439,0,390.71,408.27,17.56,702.4,Yes')
  })

  it('leaves Deal columns entirely blank for a listing with no campaign', () => {
    expect(lines[2]).toBe('SKU-6,iPhone 13 128GB,FR,320,80,,,,,,,')
  })
})
