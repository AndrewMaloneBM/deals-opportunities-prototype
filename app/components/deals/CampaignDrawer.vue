<script setup lang="ts">
/**
 * Wraps CampaignCard as a RevDrawer trigger + the campaign's models table as
 * the drawer body — matches the real screenshots (2026-09-22) exactly:
 * generic "Campaign details" drawer title, then Active tag + time-left row,
 * campaign name, description, market flag pills, then the models table.
 * No stats grid (start/end date, markets, model-count tiles) — that was an
 * earlier assumption not supported by the real design; removed.
 *
 * RevDrawer owns open/close state internally and exposes it via scoped
 * `trigger`/`body` slots, so the card (trigger) and the table (body) have to
 * live inside the same RevDrawer instance rather than as fully independent
 * components — this is Revolve's actual contract, not an invented pattern.
 */
import { RevDrawer } from '@ds/components/Drawer'
import { RevTag } from '@ds/components/Tag'
import { IconClock } from '@ds/icons/IconClock'
import type { Campaign, ListingFixture } from '~/domain/types'
import { daysLeftLabel } from '~/domain/formatting'
import { useEventLog } from '~/composables/useEventLog'
import CampaignCard from './CampaignCard.vue'
import ModelsTable from './ModelsTable.vue'

const props = defineProps<{
  campaign: Campaign
  listings: ListingFixture[]
}>()

const { logEvent } = useEventLog()

const MARKET_FLAG: Record<string, string> = {
  FR: '🇫🇷',
  ES: '🇪🇸',
  DE: '🇩🇪',
  IT: '🇮🇹',
}

function onOpen() {
  logEvent('campaign_card_opened', { campaignId: props.campaign.id })
  logEvent('campaign_drawer_opened', { campaignId: props.campaign.id })
}
</script>

<template>
  <RevDrawer :name="`campaign-drawer-${campaign.id}`" title="Campaign details" size="large" has-padding @open="onOpen">
    <template #trigger="{ open }">
      <CampaignCard :campaign="campaign" @click="open" />
    </template>

    <template #body>
      <div class="space-y-16">
        <div class="flex items-center justify-between">
          <RevTag label="Active" variant="success" />
          <RevTag :icon="IconClock" :label="daysLeftLabel(campaign.endDate)" variant="secondary" />
        </div>

        <h2 class="heading-2">
          {{ campaign.name }}
        </h2>

        <p class="body-1 text-static-default-low">
          {{ campaign.description }}
        </p>

        <div class="flex gap-8">
          <RevTag v-for="market in campaign.markets" :key="market" :label="`${MARKET_FLAG[market]} ${market}`" variant="secondary" size="small" />
        </div>

        <hr class="border-static-default-low">

        <ModelsTable :listings="listings" :campaign="campaign" />
      </div>
    </template>
  </RevDrawer>
</template>
