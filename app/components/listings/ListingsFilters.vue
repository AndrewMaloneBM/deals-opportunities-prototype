<script setup lang="ts">
import { RevInputSelect } from '@ds/components/InputSelect'

const market = defineModel<string>('market', { default: 'All markets' })
const productType = defineModel<string>('productType', { default: 'All product types' })

const marketOptions = ['All markets', 'FR', 'ES', 'DE', 'IT']
const productTypeOptions = ['All product types', 'smartphone', 'laptop']
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div class="w-48">
      <RevInputSelect v-model="market" label="Market" id="listings-market-filter" :options="marketOptions" />
    </div>
    <div class="w-56">
      <RevInputSelect v-model="productType" label="Product type" id="listings-product-type-filter" :options="productTypeOptions" />
    </div>
  </div>
</template>
