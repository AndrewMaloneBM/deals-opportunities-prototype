<script setup lang="ts">
/**
 * Listings-page Deals entry point. Per the real Step 1 PRD: "The entry point
 * is only displayed when there is an active and relevant Deal, if relevance
 * data is available." For this prototype, "relevant" = the seller has at
 * least one listing associated with an active campaign — always true given
 * our fixtures, but implemented as a real check so the banner would
 * correctly disappear for a seller with no Deal-eligible stock.
 */
import { computed } from 'vue'
import { RevBanner } from '@ds/components/Banner'
import type { Campaign, ListingFixture } from '~/domain/types'
import { useEventLog } from '~/composables/useEventLog'

const props = defineProps<{
  campaigns: Campaign[]
  listings: ListingFixture[]
}>()

const { logEvent } = useEventLog()

const relevantActiveCampaigns = computed(() =>
  props.campaigns.filter(
    (c) => c.status === 'active' && props.listings.some((l) => l.campaignId === c.id),
  ),
)

function onOpenDeals() {
  logEvent('action_clicked', { action: 'open_deals_from_banner' })
}
</script>

<template>
  <RevBanner
    v-if="relevantActiveCampaigns.length > 0"
    label="Pay less, profit more with reduced commission Deals"
    cta="See all deals"
    to="/opportunities/deals"
    @click="onOpenDeals"
  >
    Lock in limited-time reduced commission rates on selected products.
    <span v-for="(campaign, i) in relevantActiveCampaigns" :key="campaign.id">
      {{ i > 0 ? ' · ' : ' ' }}{{ campaign.name }} ({{ campaign.markets.join(', ') }})
    </span>
  </RevBanner>
</template>
