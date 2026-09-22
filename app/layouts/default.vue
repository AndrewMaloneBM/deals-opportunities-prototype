<script setup lang="ts">
/**
 * Back Office shell — top bar + primary nav, matching front-apps' nav item
 * list (Home, Insights, Customer Care, Listings, Orders, Opportunities,
 * Money, Options, Seller Support), inspected read-only. Only Listings and
 * Opportunities are functional in this prototype; the rest are static.
 */
import { useRoute } from 'vue-router'
import { RevToast } from '@ds/components/Toast'
import SessionLogControl from '~/components/shell/SessionLogControl.vue'

const route = useRoute()

const NAV_ITEMS = [
  { label: 'Home', to: null },
  { label: 'Insights', to: null },
  { label: 'Customer Care', to: null },
  { label: 'Listings', to: '/listings' },
  { label: 'Orders', to: null },
  { label: 'Opportunities', to: '/opportunities/deals' },
  { label: 'Money', to: null },
  { label: 'Options', to: null },
  { label: 'Seller Support', to: null },
]

function isActive(to: string | null) {
  if (!to) return false
  return route.path === to || route.path.startsWith(to.split('/').slice(0, 2).join('/'))
}
</script>

<template>
  <div class="min-h-screen bg-surface-default-low">
    <header class="border-b border-static-default-low bg-surface-default-hi">
      <div class="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-3">
        <span class="heading-4 font-bold leading-none">
          Back<br>Market
        </span>
        <span class="ml-4 body-2 text-static-default-low">
          Hello, Test Seller
        </span>
        <div class="flex-1" />
        <span class="body-2 text-static-default-low">
          English (United Kingdom)
        </span>
      </div>
      <nav class="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-6" aria-label="Primary">
        <component
          :is="item.to ? 'NuxtLink' : 'span'"
          v-for="item in NAV_ITEMS"
          :key="item.label"
          :to="item.to ?? undefined"
          class="whitespace-nowrap border-b-2 py-3 body-2"
          :class="[
            isActive(item.to)
              ? 'border-static-default-hi font-medium text-static-default-hi'
              : 'border-transparent text-static-default-low',
            !item.to && 'cursor-not-allowed opacity-60',
          ]"
          :title="!item.to ? 'Not available in this prototype' : undefined"
        >
          {{ item.label }}
        </component>
      </nav>
    </header>

    <main class="mx-auto max-w-[1440px] px-6 py-8">
      <slot />
    </main>

    <RevToast />
    <SessionLogControl />
  </div>
</template>
