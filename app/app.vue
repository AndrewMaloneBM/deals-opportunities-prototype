<script setup lang="ts">
/**
 * Symbolic-only passphrase gate (resolved decision — cosmetic, not real
 * security; this repo is public and the static bundle is fully inspectable).
 * Purpose is only to keep the URL from being casually stumbled into during
 * the ~1 week testing window, not to withstand a determined visitor.
 *
 * Prerendering (nuxt generate) has no `window`, so the gate defaults to
 * "unlocked" during SSR/prerender — it only activates client-side, after
 * hydration, if the session hasn't already unlocked it.
 */
import { ref, onMounted } from 'vue'

const PASSPHRASE = '270194'
const STORAGE_KEY = 'deals-prototype-unlocked'

const isUnlocked = ref(true)
const input = ref('')
const error = ref(false)

onMounted(() => {
  isUnlocked.value = window.sessionStorage.getItem(STORAGE_KEY) === 'true'
})

function submit() {
  if (input.value === PASSPHRASE) {
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    isUnlocked.value = true
    error.value = false
  } else {
    error.value = true
  }
}
</script>

<template>
  <NuxtLayout v-if="isUnlocked">
    <NuxtPage />
  </NuxtLayout>
  <div v-else class="flex min-h-screen items-center justify-center bg-surface-default-low px-16">
    <form class="w-full max-w-sm space-y-16 rounded-lg border border-static-default-low bg-surface-default-hi p-24 shadow-md" @submit.prevent="submit">
      <p class="heading-3">
        Research prototype
      </p>
      <p class="body-2 text-static-default-low">
        Enter the session passphrase your moderator shared with you.
      </p>
      <input
        v-model="input"
        type="password"
        autofocus
        class="w-full rounded-md border border-static-default-low px-12 py-8"
        placeholder="Passphrase"
      >
      <p v-if="error" class="body-2 text-static-danger-hi">
        Incorrect passphrase — please try again.
      </p>
      <button type="submit" class="w-full rounded-md bg-static-default-hi py-8 text-static-default-low-inv font-medium">
        Continue
      </button>
    </form>
  </div>
</template>
