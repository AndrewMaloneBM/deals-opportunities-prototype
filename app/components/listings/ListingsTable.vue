<script setup lang="ts">
/**
 * The general Listings page table — all listings, with an "In deal" chip
 * for listings associated with an active campaign (reference: front-apps
 * `ListingsTable.vue` in-deal chip pattern, inspected read-only).
 */
import { computed } from 'vue'
import { RevTable } from '@ds/components/Table'
import type { Column } from '@ds/components/Table'
import { RevChip } from '@ds/components/Chip'
import type { Campaign, ListingFixture } from '~/domain/types'

const props = defineProps<{
  listings: ListingFixture[]
  campaigns: Campaign[]
}>()

const columns: Column[] = [
  { key: 'product', label: 'Product' },
  { key: 'market', label: 'Market' },
  { key: 'price', label: 'Price', isTabular: true },
  { key: 'stock', label: 'Stock', isTabular: true, align: 'end' },
]

const rows = computed(() => props.listings)

function isInDeal(listing: ListingFixture) {
  return listing.campaignId != null && props.campaigns.some((c) => c.id === listing.campaignId && c.status === 'active')
}
</script>

<template>
  <RevTable :collection="rows" :columns="columns" striped-rows>
    <template #body-product="{ item }">
      <div>
        <p class="font-medium text-static-default-hi">
          {{ item.productName }}
        </p>
        <div class="mt-4 flex items-center gap-8">
          <p class="text-static-default-low body-2">
            {{ item.sku }}
          </p>
          <RevChip v-if="isInDeal(item)" label="In deal" />
        </div>
      </div>
    </template>

    <template #body-market="{ item }">
      {{ item.market }}
    </template>

    <template #body-price="{ item }">
      <span v-if="item.currentPrice != null">€{{ item.currentPrice }}</span>
      <span v-else class="text-static-default-low">Not listed</span>
    </template>

    <template #body-stock="{ item }">
      {{ item.stock }}
    </template>
  </RevTable>
</template>
