<script setup lang="ts">
/**
 * Contextual action per listing status (PRD §"Actions"). All actions are
 * fully mocked — local state mutation + toast feedback only, never a network
 * call. Reference: front-apps `ActionsCell.vue` (inspected read-only, not
 * copied).
 */
import { ref } from 'vue'
import { RevButton } from '@ds/components/Button'
import { RevInputNumber } from '@ds/components/InputNumber'
import { RevPopover } from '@ds/components/Popover'
import { useToast } from '@ds/composables/useToast'
import { ACTION_LABEL, STATUS_ACTION } from '~/domain/types'
import type { ListingFixture, ListingStatus } from '~/domain/types'
import { useListingActions } from '~/composables/useListingActions'
import { useEventLog } from '~/composables/useEventLog'

const props = defineProps<{
  status: ListingStatus
  listing: ListingFixture
}>()

const { updatePrice, createListing } = useListingActions()
const { logEvent } = useEventLog()
const toast = useToast()

const action = STATUS_ACTION[props.status]
const newPrice = ref<number | null>(
  props.listing.targetPrice != null ? Math.round(props.listing.targetPrice) : null,
)

function logClick() {
  logEvent('action_clicked', { action, listingId: props.listing.id, status: props.status })
}

function onViewListing() {
  logClick()
  toast.info('Opening listing (mocked)', {
    description: 'No real system was contacted — this is a research prototype.',
  })
}

function onCreateListing() {
  logClick()
  createListing(props.listing.id)
  toast.success('Listing created (mocked)', {
    description: `Listed at the Deal target price of €${props.listing.targetPrice}.`,
  })
}

function onConfirmPriceUpdate(hide: () => void) {
  if (newPrice.value == null) return
  logClick()
  updatePrice(props.listing.id, newPrice.value)
  toast.success('Price updated (mocked)', {
    description: 'No real system was contacted — this is a research prototype.',
  })
  hide()
}
</script>

<template>
  <RevButton v-if="action === 'view_listing'" variant="secondary" size="small" @click="onViewListing">
    {{ ACTION_LABEL.view_listing }}
  </RevButton>

  <RevButton v-else-if="action === 'create_listing'" variant="primary" size="small" @click="onCreateListing">
    {{ ACTION_LABEL.create_listing }}
  </RevButton>

  <RevPopover v-else position="bottom-end" content-class-names="z-20">
    <template #trigger="{ show, isOpen, ariaControls, ariaExpanded, ariaHaspopup }">
      <RevButton
        variant="secondary"
        size="small"
        :aria-controls="ariaControls"
        :aria-expanded="ariaExpanded"
        :aria-haspopup="ariaHaspopup"
        @click="isOpen ? undefined : show()"
      >
        {{ ACTION_LABEL.update_price }}
      </RevButton>
    </template>
    <template #content="{ hide }">
      <div class="flex flex-col gap-3 rounded-md border border-static-default-low bg-static-default-hi p-4 shadow-lg" style="min-width: 220px">
        <RevInputNumber
          v-model="newPrice"
          label="New price (€)"
          :id="`new-price-${props.listing.id}`"
        />
        <RevButton variant="primary" size="small" full-width="always" @click="onConfirmPriceUpdate(hide)">
          Confirm
        </RevButton>
      </div>
    </template>
  </RevPopover>
</template>
