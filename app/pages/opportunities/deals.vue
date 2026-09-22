<script setup lang="ts">
/**
 * Opportunities → Deals — the primary research journey.
 * Route matches the real PRD exactly: /opportunities/deals.
 * Layout matches the real screenshots: page title, Pricing/Deals sub-tabs
 * (no Inventory in the real build), no filter bar, stacked full-width
 * campaign cards.
 */
import { computed, onMounted } from 'vue'
import { RevPagination } from '@ds/components/Pagination'
import { RevLoadingScreen } from '@ds/components/LoadingScreen'
import { RevInfoBlock } from '@ds/components/InfoBlock'
import { useRoute } from 'vue-router'
import { useCampaignsState, useListingsState } from '~/composables/useListingActions'
import { useEventLog } from '~/composables/useEventLog'
import { useDealScenario } from '~/composables/useDealScenario'
import CampaignDrawer from '~/components/deals/CampaignDrawer.vue'

const campaigns = useCampaignsState()
const listings = useListingsState()
const { logEvent } = useEventLog()
const { focusListingId } = useDealScenario()
const route = useRoute()

onMounted(() => {
  logEvent('deals_tab_viewed')
})

// Forced states for visual QA / research debrief — never shown to a
// participant unless deliberately triggered, per the brief's requirement to
// exercise loading/empty/error states.
const debugState = computed(() => {
  const value = route.query.debug
  return value === 'loading' || value === 'empty' || value === 'error' ? value : null
})

const activeCampaigns = computed(() => campaigns.value.filter((c) => c.status === 'active'))

/** Credible pagination state — hidden while everything fits on one page
 * (matches the real UI, which shows no pagination for a short list). */
const PAGE_SIZE = 10

const visibleCampaigns = computed(() =>
  debugState.value === 'empty' ? [] : activeCampaigns.value,
)

function listingsForCampaign(campaignId: string) {
  const rows = listings.value.filter((l) => l.campaignId === campaignId)
  // Deterministic scenario support: bring the scenario's focus listing to the
  // front of its campaign's table — a data-state consequence only, never a
  // visual hint, per the brief's "do not tell the participant which control
  // to use."
  if (!focusListingId.value) return rows
  return [...rows].sort((a, b) => {
    if (a.id === focusListingId.value) return -1
    if (b.id === focusListingId.value) return 1
    return 0
  })
}
</script>

<template>
  <div class="space-y-32">
    <div>
      <h1 class="heading-1">
        Opportunities
      </h1>
      <div class="mt-24 flex gap-40 border-b border-static-default-low">
        <span class="pb-16 body-1 text-static-default-mid cursor-not-allowed" title="Not available in this prototype">Pricing</span>
        <span class="pb-16 body-1 font-medium border-b-2 border-static-default-hi">Deals</span>
      </div>
    </div>

    <RevLoadingScreen v-if="debugState === 'loading'" text="Loading Deal campaigns…" />

    <RevInfoBlock
      v-else-if="debugState === 'error'"
      title="Something went wrong"
      variant="danger"
      content="We couldn't load your Deal campaigns right now. (Forced error state — no real system was contacted.)"
    />

    <template v-else>
      <RevInfoBlock
        v-if="visibleCampaigns.length === 0"
        title="No active Deal campaigns right now"
        variant="info"
        content="Check back soon — new Deals are added regularly."
      />

      <div v-else class="flex flex-col gap-24">
        <CampaignDrawer
          v-for="campaign in visibleCampaigns"
          :key="campaign.id"
          :campaign="campaign"
          :listings="listingsForCampaign(campaign.id)"
        />
      </div>

      <RevPagination
        v-if="Math.ceil(visibleCampaigns.length / PAGE_SIZE) > 1"
        navigation-aria-label="Deal campaigns pagination"
        previous-aria-label="Previous page"
        next-aria-label="Next page"
        :current-page="1"
        current-page-label="Page 1"
        :page-count="1"
        :page-aria-label="(page: number) => `Go to page ${page}`"
      />
    </template>
  </div>
</template>
