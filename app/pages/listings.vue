<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RevButton } from '@ds/components/Button'
import { useCampaignsState, useListingsState } from '~/composables/useListingActions'
import { useEventLog } from '~/composables/useEventLog'
import DealsBanner from '~/components/listings/DealsBanner.vue'
import ListingsFilters from '~/components/listings/ListingsFilters.vue'
import ListingsTable from '~/components/listings/ListingsTable.vue'
import ExportDrawer from '~/components/listings/ExportDrawer.vue'

const campaigns = useCampaignsState()
const listings = useListingsState()
const { logEvent } = useEventLog()

onMounted(() => {
  logEvent('listings_page_viewed')
})

const market = ref('All markets')
const productType = ref('All product types')

const filteredListings = computed(() =>
  listings.value.filter((l) => {
    const marketMatch = market.value === 'All markets' || l.market === market.value
    const typeMatch = productType.value === 'All product types' || l.productType === productType.value
    return marketMatch && typeMatch
  }),
)
</script>

<template>
  <div class="space-y-24">
    <div class="flex items-start justify-between gap-16">
      <h1 class="heading-1">
        Your listings
      </h1>
      <div class="flex gap-12">
        <ExportDrawer :listings="listings" :campaigns="campaigns" />
        <RevButton variant="primary" size="small">
          Create new listing
        </RevButton>
      </div>
    </div>

    <DealsBanner :campaigns="campaigns" :listings="listings" />

    <ListingsFilters v-model:market="market" v-model:product-type="productType" />

    <p class="body-2 text-static-default-low">
      {{ filteredListings.length }} active listings
    </p>

    <ListingsTable :listings="filteredListings" :campaigns="campaigns" />
  </div>
</template>
