import { fileURLToPath } from 'node:url'

// Standalone research prototype — front-end only, static-generated, mocked data.
// Revolve (@backmarket/design-system) integration mirrors the alias-based wiring
// used by BackMarket/front-apps (inspected read-only, not depended on at runtime):
// the package's own compiled output imports everything via a `@ds` alias pointing
// at its `dist/src` folder, so that alias must exist in the consuming app too.
const dsDistSrc = fileURLToPath(
  new URL('./node_modules/@backmarket/design-system/dist/src', import.meta.url),
)

export default defineNuxtConfig({
  compatibilityDate: '2026-09-22',
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Deals Opportunities — Research Prototype',
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  css: ['@backmarket/design-system/styles.css'],

  vite: {
    resolve: {
      alias: {
        '@ds': dsDistSrc,
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/listings', '/opportunities/deals'],
    },
  },

  build: {
    transpile: ['@backmarket/design-system', 'libphonenumber-js'],
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    strict: true,
  },
})
