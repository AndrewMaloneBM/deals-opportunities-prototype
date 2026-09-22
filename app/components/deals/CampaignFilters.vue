<script setup lang="ts">
/**
 * Top-level Deals Opportunities page filters — market + product type, per
 * the research brief. Filters which campaign cards are shown (a campaign
 * matches if it covers the selected market and has at least one listing of
 * the selected product type).
 */
import { RevInputSelect } from '@ds/components/InputSelect'

const market = defineModel<string>('market', { default: 'All markets' })
const productType = defineModel<string>('productType', { default: 'All product types' })

const marketOptions = ['All markets', 'FR', 'ES', 'DE', 'IT']
const productTypeOptions = ['All product types', 'smartphone', 'laptop']
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div class="w-48">
      <RevInputSelect v-model="market" label="Market" id="deals-market-filter" :options="marketOptions" />
    </div>
    <div class="w-56">
      <RevInputSelect v-model="productType" label="Product type" id="deals-product-type-filter" :options="productTypeOptions" />
    </div>
  </div>
</template>
