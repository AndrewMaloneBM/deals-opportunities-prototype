<script setup lang="ts">
/**
 * Always-visible, unobtrusive session control (resolved decision — not a
 * hidden keyboard shortcut). Shows a live event count, lets the moderator
 * download the session log, and reset the prototype between back-to-back
 * 30-minute sessions.
 */
import { ref } from 'vue'
import { RevButton } from '@ds/components/Button'
import { RevBadge } from '@ds/components/Badge'
import { RevButtonIcon } from '@ds/components/ButtonIcon'
import { IconGear } from '@ds/icons/IconGear'
import { useToast } from '@ds/composables/useToast'
import { useEventLog } from '~/composables/useEventLog'
import { useListingActions } from '~/composables/useListingActions'

const { events, downloadLog, clearLog } = useEventLog()
const { resetPrototype } = useListingActions()
const toast = useToast()
const isOpen = ref(false)

function onReset() {
  resetPrototype()
  clearLog()
  toast.info('Prototype reset', {
    description: 'All mocked state is back to the deterministic starting fixtures.',
  })
  isOpen.value = false
}
</script>

<template>
  <div class="fixed bottom-16 right-16 z-30">
    <div v-if="isOpen" class="mb-8 w-256 rounded-md border border-static-default-low bg-surface-default-hi p-16 shadow-lg">
      <p class="body-2 font-medium">
        Session log
      </p>
      <p class="body-2 text-static-default-low mt-4">
        {{ events.length }} event{{ events.length === 1 ? '' : 's' }} recorded
      </p>
      <div class="mt-12 flex flex-col gap-8">
        <RevButton variant="secondary" size="small" full-width="always" @click="downloadLog">
          Download session log
        </RevButton>
        <RevButton variant="secondaryDestructive" size="small" full-width="always" @click="onReset">
          Reset prototype
        </RevButton>
      </div>
    </div>
    <div class="relative">
      <RevButtonIcon
        :icon="IconGear"
        variant="secondary"
        size="medium"
        aria-label="Session log and reset"
        @click="isOpen = !isOpen"
      />
      <RevBadge
        v-if="events.length > 0"
        :count="events.length"
        variant="primary"
        class="absolute -top-4 -right-4"
        aria-label="Number of events recorded"
      />
    </div>
  </div>
</template>
