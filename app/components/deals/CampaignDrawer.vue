<script setup lang="ts">
/**
 * Wraps CampaignCard as a RevDrawer trigger + the campaign's models table as
 * the drawer body — this is the "click a card → drawer opens with campaign
 * details + affected listings" journey from the real Step 1 PRD.
 *
 * RevDrawer owns open/close state internally and exposes it via scoped
 * `trigger`/`body` slots, so the card (trigger) and the table (body) have to
 * live inside the same RevDrawer instance rather than as fully independent
 * components — this is Revolve's actual contract, not an invented pattern.
 */
import { RevDrawer } from '@ds/components/Drawer'
import type { Campaign, ListingFixture } from '~/domain/types'
import { useEventLog } from '~/composables/useEventLog'
import CampaignCard from './CampaignCard.vue'
import ModelsTable from './ModelsTable.vue'

const props = defineProps<{
  campaign: Campaign
  listings: ListingFixture[]
}>()

const { logEvent } = useEventLog()

function onOpen() {
  logEvent('campaign_card_opened', { campaignId: props.campaign.id })
  logEvent('campaign_drawer_opened', { campaignId: props.campaign.id })
}
</script>

<template>
  <RevDrawer :name="`campaign-drawer-${campaign.id}`" size="large" has-padding @open="onOpen">
    <template #trigger="{ open }">
      <CampaignCard :campaign="campaign" @click="open" />
    </template>

    <template #beforeTitle>
      <p class="body-2 text-static-success-hi font-medium mb-1">
        ● Active Deal
      </p>
    </template>

    <template #body>
      <div class="space-y-6">
        <h2 class="heading-2">
          {{ campaign.name }}
        </h2>
        <p class="body-1 text-static-default-low">
          {{ campaign.description }}
        </p>

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-md bg-static-default-low p-3">
            <p class="body-2 text-static-default-low">
              Start date
            </p>
            <p class="font-medium">
              {{ new Date(campaign.startDate).toLocaleDateString('en-GB') }}
            </p>
          </div>
          <div class="rounded-md bg-static-default-low p-3">
            <p class="body-2 text-static-default-low">
              End date
            </p>
            <p class="font-medium">
              {{ new Date(campaign.endDate).toLocaleDateString('en-GB') }}
            </p>
          </div>
          <div class="rounded-md bg-static-default-low p-3">
            <p class="body-2 text-static-default-low">
              Covered markets
            </p>
            <p class="font-medium">
              {{ campaign.markets.join(', ') }}
            </p>
          </div>
          <div class="rounded-md bg-static-default-low p-3">
            <p class="body-2 text-static-default-low">
              Models
            </p>
            <p class="font-medium">
              {{ campaign.modelCount }}
            </p>
          </div>
        </div>

        <div>
          <h3 class="heading-4 mb-3">
            Affected listings
          </h3>
          <ModelsTable :listings="listings" :campaign="campaign" />
        </div>
      </div>
    </template>
  </RevDrawer>
</template>
