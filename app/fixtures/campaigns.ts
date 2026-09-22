import type { Campaign } from '~/domain/types'

/**
 * Two active, validated campaigns — matches the research brief's requirement
 * of "at least two active campaigns" with different commission rates.
 * "starting_soon" campaigns are deliberately excluded this iteration (see
 * app/domain/types.ts CampaignStatus doc comment).
 */
export const CAMPAIGNS: Campaign[] = [
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
    description:
      'Reduced commission on selected iPhone models when your listing price is at or below the Deal target price.',
  },
  {
    id: 'c2',
    name: 'Samsung Galaxies & Apple MacBooks — selected models',
    status: 'active',
    startDate: '2026-08-20',
    endDate: '2026-11-01',
    markets: ['FR', 'DE', 'IT'],
    modelCount: 18,
    originalCommissionRate: 0.12,
    reducedCommissionRate: 0.08,
    description:
      'Reduced commission on selected Samsung Galaxy and Apple MacBook models when your listing price is at or below the Deal target price.',
  },
]
