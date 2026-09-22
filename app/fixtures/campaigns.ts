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
    name: 'Apple iPhones & Samsung Galaxies - selected models',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    markets: ['FR', 'ES'],
    modelCount: 12,
    originalCommissionRate: 0.11,
    reducedCommissionRate: 0.07,
    description:
      'Price your eligible listings at the deal target price to qualify for reduced commission.',
  },
  {
    id: 'c2',
    name: 'MacBook Air M3 - back to school promo',
    status: 'active',
    startDate: '2026-08-20',
    endDate: '2026-11-01',
    markets: ['FR', 'DE', 'IT'],
    modelCount: 18,
    originalCommissionRate: 0.12,
    reducedCommissionRate: 0.08,
    description:
      'Price your eligible listings at the deal target price to qualify for reduced commission.',
  },
]
