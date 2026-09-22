<script setup lang="ts">
/**
 * Maps each of the 4 listing statuses to a RevTag variant + label.
 * Reference: front-apps `StatusCell.vue` (inspected read-only, not copied).
 */
import { RevTag } from '@ds/components/Tag'
import { STATUS_LABEL } from '~/domain/types'
import type { ListingStatus } from '~/domain/types'

const props = defineProps<{
  status: ListingStatus
}>()

const VARIANT: Record<ListingStatus, 'success' | 'warning' | 'danger' | 'secondary'> = {
  IN_TARGET: 'success',
  NEAR_TARGET: 'warning',
  FAR_TARGET: 'danger',
  NOT_LISTED: 'secondary',
}
</script>

<template>
  <RevTag :label="STATUS_LABEL[props.status]" :variant="VARIANT[props.status]" />
</template>
