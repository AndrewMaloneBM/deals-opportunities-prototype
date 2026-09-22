<script setup lang="ts">
/**
 * Campaign card content — PRD §"Campaign details": name, status, start/end
 * date, covered markets, number of models. Rendered inside a RevDrawer's
 * `trigger` slot by CampaignDrawer.vue (see that file for why they're split
 * this way — Revolve's RevDrawer owns its own open/close state via the
 * trigger/body slot contract, so the card can't be a fully separate,
 * independently-clickable component).
 */
import { RevButtonCard } from '@ds/components/ButtonCard'
import { RevBadge } from '@ds/components/Badge'
import type { Campaign } from '~/domain/types'

defineProps<{
  campaign: Campaign
}>()

const MARKET_FLAG: Record<string, string> = {
  FR: '🇫🇷',
  ES: '🇪🇸',
  DE: '🇩🇪',
  IT: '🇮🇹',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <RevButtonCard class="w-full text-left">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="body-2 text-static-success-hi font-medium">
          ● Active Deal
        </p>
        <h3 class="heading-3 mt-1">
          {{ campaign.name }}
        </h3>
      </div>
      <RevBadge :count="campaign.modelCount" variant="primary" aria-label="Number of eligible models" />
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3 body-2 text-static-default-low">
      <span>
        {{ formatDate(campaign.startDate) }} → {{ formatDate(campaign.endDate) }}
      </span>
      <span>·</span>
      <span>
        <span v-for="market in campaign.markets" :key="market" class="mr-1">{{ MARKET_FLAG[market] }} {{ market }}</span>
      </span>
      <span>·</span>
      <span>{{ campaign.modelCount }} models</span>
    </div>

    <div class="mt-3 body-2 text-static-default-low">
      Commission: {{ Math.round(campaign.originalCommissionRate * 100) }}% → {{ Math.round(campaign.reducedCommissionRate * 100) }}%
    </div>
  </RevButtonCard>
</template>
