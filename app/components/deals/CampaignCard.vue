<script setup lang="ts">
/**
 * Campaign card — matches the real screenshots: green Active tag top-left,
 * campaign name below it; right side has plain clock+time text, a bordered
 * "N models" pill with chevron, and bordered market flag pills below.
 *
 * Uses RevTag (not RevChip) for the Active tag — RevChip renders as a real
 * interactive `<button>`, which is invalid nested inside RevButtonCard's own
 * button (the browser silently splits it into sibling elements, breaking the
 * click target).
 *
 * Rendered inside a RevDrawer's `trigger` slot by CampaignDrawer.vue.
 */
import { RevButtonCard } from '@ds/components/ButtonCard'
import { RevTag } from '@ds/components/Tag'
import { IconClock } from '@ds/icons/IconClock'
import { IconChevronRight } from '@ds/icons/IconChevronRight'
import type { Campaign } from '~/domain/types'
import { daysLeftLabel } from '~/domain/formatting'
import MarketFlag from '~/components/shell/MarketFlag.vue'

defineProps<{
  campaign: Campaign
}>()
</script>

<template>
  <RevButtonCard class="w-full rounded-[12px] text-left">
    <div class="flex items-start justify-between gap-24 px-16 py-8">
      <div>
        <RevTag label="Active" variant="success" />
        <h3 class="heading-3 mt-8">
          {{ campaign.name }}
        </h3>
      </div>

      <div class="flex flex-col items-end gap-12">
        <div class="flex items-center gap-16">
          <span class="inline-flex items-center gap-8 body-2 text-static-default-mid">
            <IconClock class="h-16 w-16" />
            {{ daysLeftLabel(campaign.endDate) }}
          </span>
          <span class="inline-flex items-center gap-8 rounded-full border border-static-default-mid px-12 py-2 body-2">
            {{ campaign.modelCount }} models
            <IconChevronRight class="h-16 w-16" />
          </span>
        </div>
        <div class="flex gap-8">
          <MarketFlag v-for="market in campaign.markets" :key="market" :market="market" pill />
        </div>
      </div>
    </div>
  </RevButtonCard>
</template>
