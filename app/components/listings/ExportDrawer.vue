<script setup lang="ts">
/**
 * Mocked "Import or export listings" drawer — the secondary research
 * journey. The export includes exactly the fields specified in the real
 * Step 0 PRD, and is entirely client-side (Blob download, no network call).
 */
import { RevDrawer } from '@ds/components/Drawer'
import { RevButton } from '@ds/components/Button'
import { RevInfoBlock } from '@ds/components/InfoBlock'
import { useToast } from '@ds/composables/useToast'
import type { Campaign, ListingFixture } from '~/domain/types'
import { useCsvExport } from '~/composables/useCsvExport'

const props = defineProps<{
  listings: ListingFixture[]
  campaigns: Campaign[]
}>()

const { exportListingsCsv } = useCsvExport()
const toast = useToast()

function onExport(close: () => void) {
  exportListingsCsv(props.listings, props.campaigns)
  toast.success('Export ready (mocked)', {
    description: 'listings-export-mock.csv has been downloaded.',
  })
  close()
}
</script>

<template>
  <RevDrawer name="export-drawer" title="Import or export listings" size="small" has-padding>
    <template #trigger="{ open }">
      <RevButton variant="secondary" size="small" @click="open">
        Import or export listings
      </RevButton>
    </template>

    <template #body="{ close }">
      <div class="space-y-4">
        <RevInfoBlock
          title="Deal information is included automatically"
          variant="info"
          content="For listings that are part of an active Deal, this export includes the Deal target price, price gap, earnings before/after commission, estimated profit, and participation status. Listings not part of a Deal show no Deal columns."
        />
        <RevButton variant="primary" full-width="always" @click="onExport(close)">
          Download CSV (mocked)
        </RevButton>
      </div>
    </template>
  </RevDrawer>
</template>
