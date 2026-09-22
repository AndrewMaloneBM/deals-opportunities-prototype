<script setup lang="ts">
/**
 * The models table inside a campaign drawer: product / price vs target /
 * status / action, per the real Step 1 PRD's "Listings statuses" + "Actions"
 * sections. Reference: front-apps `ModelsTable` (inspected read-only, cell
 * components ProductCell/PriceCell/StatusCell/ActionsCell — not copied).
 */
import { computed } from 'vue'
import { RevTable } from '@ds/components/Table'
import type { Column } from '@ds/components/Table'
import { computeListingStatus, computeMetricsForListing } from '~/domain/calculations'
import type { Campaign, ListingFixture } from '~/domain/types'
import StatusTag from './StatusTag.vue'
import ActionButton from './ActionButton.vue'

const props = defineProps<{
  listings: ListingFixture[]
  campaign: Campaign
}>()

const columns: Column[] = [
  { key: 'product', label: 'Product' },
  { key: 'price', label: 'Price vs target', isTabular: true },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Action', align: 'end' },
]

const rows = computed(() =>
  props.listings.map((listing) => ({
    ...listing,
    status: computeListingStatus(listing.currentPrice, listing.targetPrice ?? 0),
  })),
)

function metrics(listing: ListingFixture) {
  return computeMetricsForListing(listing, [props.campaign])
}
</script>

<template>
  <RevTable :collection="rows" :columns="columns">
    <template #body-product="{ item }">
      <div>
        <p class="font-medium text-static-default-hi">
          {{ item.productName }}
        </p>
        <p class="text-static-default-low body-2">
          {{ item.sku }} · {{ item.market }}
        </p>
      </div>
    </template>

    <template #body-price="{ item }">
      <div v-if="item.currentPrice != null">
        <p class="font-medium">
          €{{ item.currentPrice }}
          <span class="text-static-default-low body-2">/ target €{{ item.targetPrice }}</span>
        </p>
        <p v-if="metrics(item)" class="body-2" :class="metrics(item)!.profitPerUnit < 0 ? 'text-static-danger-hi' : 'text-static-success-hi'">
          {{ metrics(item)!.profitPerUnit >= 0 ? '+' : '' }}€{{ metrics(item)!.profitPerUnit.toFixed(2) }} profit/unit
        </p>
      </div>
      <p v-else class="text-static-default-low body-2">
        Not listed · target €{{ item.targetPrice }}
      </p>
    </template>

    <template #body-status="{ item }">
      <StatusTag :status="item.status" />
    </template>

    <template #body-actions="{ item }">
      <ActionButton :status="item.status" :listing="item" />
    </template>
  </RevTable>
</template>
