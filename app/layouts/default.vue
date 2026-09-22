<script setup lang="ts">
/**
 * Back Office shell — modeled on the real Seller BO header (Andrew's real
 * screenshots, 2026-09-22): real BM logo, greeting, "Leave seller view",
 * borderless Sales/language selectors, Seller Guide button, ghost profile
 * icon, primary nav below with active underline. Only Home, Listings and
 * Opportunities are functional in this prototype; the rest are static.
 */
import { useRoute } from 'vue-router'
import { RevButton } from '@ds/components/Button'
import { RevButtonIcon } from '@ds/components/ButtonIcon'
import { RevInputSelect } from '@ds/components/InputSelect'
import { RevToast } from '@ds/components/Toast'
import { IconSparkles } from '@ds/icons/IconSparkles'
import { IconAvatar } from '@ds/icons/IconAvatar'
import SessionLogControl from '~/components/shell/SessionLogControl.vue'

const route = useRoute()

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Insights', to: null },
  { label: 'Customer Care', to: null },
  { label: 'Listings', to: '/listings' },
  { label: 'Orders', to: null },
  { label: 'Opportunities', to: '/opportunities/deals' },
  { label: 'Money', to: null },
  { label: 'Options', to: null },
  { label: 'Seller Support', to: null },
]

const boType = ref('Sales')
const language = ref('English (United Kingdom)')

const boTypeOptions = ['Sales', 'Buyback']
const languageOptions = ['English (Ireland)', 'English (United Kingdom)', 'Français', 'Deutsch', 'Español', 'Italiano']

function isActive(to: string | null) {
  if (!to) return false
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="min-h-screen bg-static-default-low">
    <header class="border-b border-static-default-low bg-static-default-hi">
      <div class="mx-auto flex max-w-[1880px] items-center gap-16 px-32 pt-16">
        <img
          src="/img/header/logo.svg"
          alt="Back Market"
          class="h-32 w-auto"
        >
        <span class="body-1 ml-8">Hello, Test Seller</span>
        <RevButton variant="secondary" size="small">
          Leave seller view
        </RevButton>
        <div class="flex-1" />
        <div class="header-select flex items-center gap-16">
          <div class="w-[88px]">
            <RevInputSelect
              v-model="boType"
              id="header-bo-type"
              label="Sales"
              size="small"
              :options="boTypeOptions"
            />
          </div>
          <RevButton variant="primary" size="small" :icon="IconSparkles">
            Seller Guide
          </RevButton>
          <div class="w-[224px]">
            <RevInputSelect
              v-model="language"
              id="header-language"
              label="Language"
              size="small"
              :options="languageOptions"
            />
          </div>
          <RevButtonIcon
            :icon="IconAvatar"
            variant="ghost"
            size="medium"
            aria-label="Account"
          />
        </div>
      </div>
      <nav class="mx-auto flex max-w-[1880px] gap-32 overflow-x-auto px-32" aria-label="Primary">
        <template v-for="item in NAV_ITEMS" :key="item.label">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="whitespace-nowrap border-b-2 py-16 body-1"
            :class="
              isActive(item.to)
                ? 'border-static-default-hi font-medium text-static-default-hi'
                : 'border-transparent text-static-default-mid hover:text-static-default-hi'
            "
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="whitespace-nowrap border-b-2 border-transparent py-16 body-1 text-static-default-mid cursor-not-allowed"
            title="Not available in this prototype"
          >
            {{ item.label }}
          </span>
        </template>
      </nav>
    </header>

    <main class="mx-auto max-w-[1880px] px-32 py-32">
      <slot />
    </main>

    <RevToast />
    <SessionLogControl />
  </div>
</template>

<style scoped>
/* The real BO header selectors are borderless on white — the DS InputSelect
   always renders its boxed floating style (a background span + an absolute
   border overlay), so blend both into the header. */
.header-select :deep([class*='bg-static-default-low']) {
  background-color: transparent !important;
}
.header-select :deep([class*='border-action-default-low']) {
  border-color: transparent !important;
}
</style>
