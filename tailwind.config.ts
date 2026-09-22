import dsPreset from '@backmarket/design-system/tailwind.config'
import type { Config } from 'tailwindcss'

// Reuses Revolve's theme + plugins (tokens, colors, spacing, typography) as a preset,
// but scans our own app files plus the design-system's compiled component output —
// the package ships its Tailwind directives unprocessed (dist/styles.css is just
// `@tailwind base/components/utilities`), so utility classes referenced inside its
// own component templates only get generated if we include its dist in our content scan.
const config: Config = {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,js,ts}',
    // Narrowed to components only (not icons/assets/translations/etc — those
    // don't contain Tailwind utility class strings and bloated the initial
    // content scan to ~3000 files, which made the build hang for minutes).
    './node_modules/@backmarket/design-system/dist/src/components/**/*.{js,vue}',
  ],
}

export default config
