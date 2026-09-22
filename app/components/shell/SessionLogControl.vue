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
  <div class="fixed bottom-4 right-4 z-30">
    <div v-if="isOpen" class="mb-2 w-64 rounded-md border border-static-default-low bg-surface-default-hi p-4 shadow-lg">
      <p class="body-2 font-medium">
        Session log
      </p>
      <p class="body-2 text-static-default-low mt-1">
        {{ events.length }} event{{ events.length === 1 ? '' : 's' }} recorded
      </p>
      <div class="mt-3 flex flex-col gap-2">
        <RevButton variant="secondary" size="small" full-width="always" @click="downloadLog">
          Download session log
        </RevButton>
        <RevButton variant="secondaryDestructive" size="small" full-width="always" @click="onReset">
          Reset prototype
        </RevButton>
      </div>
    </div>
    <button
      type="button"
      class="relative flex h-11 w-11 items-center justify-center rounded-full border border-static-default-low bg-surface-default-hi shadow-md"
      aria-label="Session log and reset"
      @click="isOpen = !isOpen"
    >
      <span aria-hidden="true">⚙</span>
      <RevBadge
        v-if="events.length > 0"
        :count="events.length"
        variant="primary"
        class="absolute -top-1 -right-1"
        aria-label="Number of events recorded"
      />
    </button>
  </div>
</template>
