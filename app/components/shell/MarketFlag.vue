<script setup lang="ts">
/**
 * Market flag + ISO code, using the real Revolve CountryFlag component
 * (no emoji — emoji flags render inconsistently on Windows and don't match
 * the real Back Office). `pill` renders it inside a bordered pill, as on
 * the real campaign cards.
 */
import { RevCountryFlag } from '@ds/components/CountryFlag'
import type { Market } from '~/domain/types'

withDefaults(defineProps<{
  market: Market
  pill?: boolean
}>(), { pill: false })
</script>

<template>
  <span
    v-if="pill"
    class="inline-flex items-center gap-8 rounded-full border border-static-default-mid px-12 py-2 body-2"
  >
    <RevCountryFlag :country-code="market" size="extra-small" :has-border="true" />
    <span>{{ market }}</span>
  </span>
  <span v-else class="inline-flex items-center gap-8">
    <RevCountryFlag :country-code="market" size="extra-small" :has-border="true" />
    <span class="body-2">{{ market }}</span>
  </span>
</template>
