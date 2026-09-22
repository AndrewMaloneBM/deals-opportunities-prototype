<script setup lang="ts">
/**
 * Market flag + ISO code pill, using the real Revolve CountryFlag component
 * (no emoji — emoji flags render inconsistently on Windows and don't match
 * the real Back Office). Reference: front-apps' SelectMarket / MarketList
 * patterns (inspected read-only).
 */
import { RevCountryFlag } from '@ds/components/CountryFlag'
import type { Market } from '~/domain/types'

defineProps<{
  market: Market
}>()
</script>

<template>
  <span class="inline-flex items-center gap-4">
    <RevCountryFlag :country-code="market" size="small" :has-border="true" />
    <span class="body-2">{{ market }}</span>
  </span>
</template>
