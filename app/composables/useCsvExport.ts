import { toExportRow } from '~/domain/calculations'
import type { Campaign, ListingFixture } from '~/domain/types'
import { useEventLog } from './useEventLog'

const EXPORT_COLUMNS = [
  'SKU',
  'Product',
  'Market',
  'Current price',
  'Stock',
  'Deal - Target price',
  'Deal - Price gap vs target',
  'Deal - Earnings after original commission',
  'Deal - Earnings after reduced commission',
  'Deal - Estimated profit per unit',
  'Deal - Estimated total profit',
  'Deal - Participation',
] as const

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Builds the mocked Listings export CSV. Deal columns are left blank (not
 * zero) for listings with no associated campaign — PRD Use case C.
 */
export function buildExportCsv(
  listings: ListingFixture[],
  campaigns: Campaign[],
): string {
  const rows = listings.map((listing) => {
    const row = toExportRow(listing, campaigns)
    const deal = row.deal
    return [
      row.sku,
      row.productName,
      row.market,
      row.currentPrice != null ? String(row.currentPrice) : '',
      String(row.stock),
      deal ? String(deal.targetPrice) : '',
      deal ? String(deal.priceGapVsTarget) : '',
      deal ? String(deal.earningsAfterOriginalCommission) : '',
      deal ? String(deal.earningsAfterReducedCommission) : '',
      deal ? String(deal.estimatedProfitPerUnit) : '',
      deal ? String(deal.estimatedTotalProfit) : '',
      deal ? deal.participation : '',
    ]
  })

  const lines = [EXPORT_COLUMNS.join(','), ...rows.map((r) => r.map(csvEscape).join(','))]
  return lines.join('\n')
}

export function useCsvExport() {
  const { logEvent } = useEventLog()

  function exportListingsCsv(listings: ListingFixture[], campaigns: Campaign[]) {
    const csv = buildExportCsv(listings, campaigns)
    logEvent('export_triggered', { rowCount: listings.length })

    if (typeof window === 'undefined') return

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'listings-export-mock.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return { exportListingsCsv }
}
