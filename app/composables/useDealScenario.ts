import { SCENARIO_FOCUS_LISTING, isScenarioKey } from '~/fixtures/scenarios'

/**
 * Reads the `?scenario=` query param (in-deal / near-target / above-target /
 * not-listed) and resolves which fixture listing should be brought into
 * focus. Deliberately only sets *starting data state* — never a UI hint —
 * per the brief's "do not tell the participant which control to use."
 * No query param -> neutral default (full mixed fixture set, no focus).
 */
export function useDealScenario() {
  const route = useRoute()

  const scenario = computed(() => {
    const value = route.query.scenario
    return isScenarioKey(value) ? value : null
  })

  const focusListingId = computed(() =>
    scenario.value ? SCENARIO_FOCUS_LISTING[scenario.value] : null,
  )

  return { scenario, focusListingId }
}
