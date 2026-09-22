import { createRevolvePlugin } from '@ds/plugin'
import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * Standalone Revolve wiring for this prototype — English-only, no real Lokalize
 * connection (translateFunction just returns the English defaultMessage), no real
 * image CDN (illustrationOptimizer is an identity function). This mirrors the
 * *shape* of front-apps' `plugins/design-system.ts` wiring (inspected read-only,
 * not copied) without any of its workspace-only dependencies.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const locale = ref('en-gb')

  const revolve = createRevolvePlugin({
    locale,
    translateFunction: (key) => key.defaultMessage,
    illustrationOptimizer: (path) => path,
    RouterLinkComponent: RouterLink,
  })

  nuxtApp.vueApp.use(revolve)
})

