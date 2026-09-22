import { LISTINGS } from '~/fixtures/listings'
import { CAMPAIGNS } from '~/fixtures/campaigns'
import type { ListingFixture } from '~/domain/types'
import { useEventLog } from './useEventLog'

/**
 * Shared, SSR-safe reactive listing/campaign state (Nuxt `useState`), seeded
 * from the deterministic fixtures. All "actions" mutate this local state only
 * — never a network call — matching the "front-end only, mocked" constraint.
 */
export function useListingsState() {
  return useState<ListingFixture[]>('deals-prototype-listings', () =>
    structuredClone(LISTINGS),
  )
}

export function useCampaignsState() {
  return useState('deals-prototype-campaigns', () => structuredClone(CAMPAIGNS))
}

export function useListingActions() {
  const listings = useListingsState()
  const { logEvent } = useEventLog()

  /**
   * Mocked price update. Moves the listing between statuses live (status is
   * always derived, never stored) so a participant sees the consequence of
   * their own action immediately.
   */
  function updatePrice(listingId: string, newPrice: number) {
    const listing = listings.value.find((l) => l.id === listingId)
    if (!listing) return
    listing.currentPrice = newPrice
    logEvent('listing_price_updated_after_viewing_deal', {
      listingId,
      newPrice,
    })
  }

  /**
   * Mocked listing creation. Only meaningful for NOT_LISTED fixtures that
   * are eligible for the Deal (PRD: "Create listing is only shown when the
   * product is eligible"). Defaults the new listing's price to the Deal
   * target price, since that's the price a seller would need to hit anyway
   * to participate.
   */
  function createListing(listingId: string) {
    const listing = listings.value.find((l) => l.id === listingId)
    if (!listing || listing.targetPrice == null) return
    listing.currentPrice = listing.targetPrice
    logEvent('action_clicked', { action: 'create_listing', listingId })
  }

  /** Resets all mocked mutations back to the deterministic fixture baseline. */
  function resetPrototype() {
    listings.value = structuredClone(LISTINGS)
    logEvent('prototype_reset')
  }

  return { listings, updatePrice, createListing, resetPrototype }
}
