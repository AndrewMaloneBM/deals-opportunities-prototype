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
import { IconSmartphone } from '@ds/icons/IconSmartphone'
import { IconLaptop } from '@ds/icons/IconLaptop'
import { computeListingStatus, computeMetricsForListing } from '~/domain/calculations'
import type { Campaign, ListingFixture, ProductType } from '~/domain/types'
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

const TYPE_ICON: Record<ProductType, typeof IconSmartphone> = {
  smartphone: IconSmartphone,
  laptop: IconLaptop,
}

function metrics(listing: ListingFixture) {
  return computeMetricsForListing(listing, [props.campaign])
}
</script>

<template>
  <RevTable :collection="rows" :columns="columns">
    <template #body-product="{ item }">
      <div class="flex items-center gap-16">
        <div class="flex h-48 w-36 shrink-0 items-center justify-center rounded-[4px] bg-static-default-mid">
          <component :is="TYPE_ICON[item.productType]" class="h-24 w-24 text-static-default-mid" />
        </div>
        <div>
          <p class="font-medium text-static-default-hi">
            {{ item.productName }}
          </p>
          <p class="text-static-default-low body-2">
            {{ item.sku }} · {{ item.market }}
          </p>
        </div>
      </div>
    </template>

    <template #body-price="{ item }">
      <div v-if="item.currentPrice != null">
        <p class="font-medium">
          €{{ item.currentPrice }}
        </p>
        <p class="text-static-default-low body-2">
          <template v-if="metrics(item) && metrics(item)!.priceGap > 0">
            €{{ metrics(item)!.priceGap.toFixed(2) }} above target
          </template>
          <template v-else>
            At or below target
          </template>
        </p>
        <p class="text-static-default-low body-2">
          Target: €{{ item.targetPrice }}
        </p>
        <p v-if="metrics(item)" class="body-2 mt-4" :class="metrics(item)!.profitPerUnit < 0 ? 'text-static-danger-hi' : 'text-static-success-hi'">
          {{ metrics(item)!.profitPerUnit >= 0 ? '+' : '' }}€{{ metrics(item)!.profitPerUnit.toFixed(2) }} profit/unit
        </p>
      </div>
      <div v-else>
        <p class="italic text-static-default-low">
          Not listed
        </p>
        <p class="text-static-default-low body-2">
          Target: €{{ item.targetPrice }}
        </p>
      </div>
    </template>

    <template #body-status="{ item }">
      <StatusTag :status="item.status" />
    </template>

    <template #body-actions="{ item }">
      <ActionButton :status="item.status" :listing="item" />
    </template>
  </RevTable>
</template>
