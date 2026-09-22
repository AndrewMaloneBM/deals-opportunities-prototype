<script setup lang="ts">
/**
 * The general Listings page table — all listings, with an "In deal" chip
 * for listings associated with an active campaign (reference: front-apps
 * `ListingsTable.vue` product-image + in-deal chip patterns, inspected
 * read-only). Product images are neutral placeholders — no real product
 * photography is used in this mocked prototype.
 */
import { computed } from 'vue'
import { RevTable } from '@ds/components/Table'
import type { Column } from '@ds/components/Table'
import { RevTag } from '@ds/components/Tag'
import { IconSmartphone } from '@ds/icons/IconSmartphone'
import { IconLaptop } from '@ds/icons/IconLaptop'
import type { Campaign, ListingFixture, ProductType } from '~/domain/types'
import MarketFlag from '~/components/shell/MarketFlag.vue'

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

const TYPE_ICON: Record<ProductType, typeof IconSmartphone> = {
  smartphone: IconSmartphone,
  laptop: IconLaptop,
}

function isInDeal(listing: ListingFixture) {
  return listing.campaignId != null && props.campaigns.some((c) => c.id === listing.campaignId && c.status === 'active')
}
</script>

<template>
  <RevTable :collection="rows" :columns="columns" striped-rows>
    <template #body-product="{ item }">
      <div class="flex items-center gap-16">
        <div class="flex h-48 w-36 shrink-0 items-center justify-center rounded-[4px] bg-static-default-mid">
          <component :is="TYPE_ICON[item.productType]" class="h-24 w-24 text-static-default-mid" />
        </div>
        <div>
          <p class="font-medium text-static-default-hi">
            {{ item.productName }}
          </p>
          <div class="mt-4 flex items-center gap-8">
            <p class="text-static-default-low body-2">
              {{ item.sku }}
            </p>
            <RevTag v-if="isInDeal(item)" label="In deal" variant="secondary" size="small" />
          </div>
        </div>
      </div>
    </template>

    <template #body-market="{ item }">
      <MarketFlag :market="item.market" />
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
