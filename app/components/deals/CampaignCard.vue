<script setup lang="ts">
/**
 * Campaign card content — matches the real screenshots (2026-09-22) exactly:
 * Active tag + campaign name on the left; on the right, a time-left pill and
 * a "N models" pill, and market flag pills below those. No commission-rate
 * text or date range shown on the card itself (that only appears inside the
 * drawer, per the screenshots).
 *
 * Uses RevTag (not RevChip) for all decorative pills here — RevChip renders
 * as a real interactive `<button>`, which is invalid nested inside
 * RevButtonCard's own button (the browser silently splits it into sibling
 * elements, breaking the click target). RevTag is a plain, non-interactive
 * label, which is what these actually are.
 *
 * Rendered inside a RevDrawer's `trigger` slot by CampaignDrawer.vue.
 */
import { RevButtonCard } from '@ds/components/ButtonCard'
import { RevTag } from '@ds/components/Tag'
import { IconClock } from '@ds/icons/IconClock'
import type { Campaign } from '~/domain/types'
import { daysLeftLabel } from '~/domain/formatting'

defineProps<{
  campaign: Campaign
}>()

const MARKET_FLAG: Record<string, string> = {
  FR: '🇫🇷',
  ES: '🇪🇸',
  DE: '🇩🇪',
  IT: '🇮🇹',
}
</script>

<template>
  <RevButtonCard class="w-full text-left">
    <div class="flex items-start justify-between gap-24">
      <div>
        <RevTag label="Active" variant="success" />
        <h3 class="heading-3 mt-8">
          {{ campaign.name }}
        </h3>
      </div>

      <div class="flex flex-col items-end gap-8">
        <div class="flex items-center gap-8">
          <RevTag :icon="IconClock" :label="daysLeftLabel(campaign.endDate)" variant="secondary" />
          <RevTag :label="`${campaign.modelCount} models ›`" variant="secondary" />
        </div>
        <div class="flex gap-4">
          <RevTag v-for="market in campaign.markets" :key="market" :label="`${MARKET_FLAG[market]} ${market}`" variant="secondary" size="small" />
        </div>
      </div>
    </div>
  </RevButtonCard>
</template>
