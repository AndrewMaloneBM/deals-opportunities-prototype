export type ScenarioKey = 'in-deal' | 'near-target' | 'above-target' | 'not-listed'

/** Maps each deterministic starting scenario to the fixture it should bring into focus. */
export const SCENARIO_FOCUS_LISTING: Record<ScenarioKey, string> = {
  'in-deal': 'l1',
  'near-target': 'l2',
  'above-target': 'l3',
  'not-listed': 'l4',
}

export function isScenarioKey(value: unknown): value is ScenarioKey {
  return (
    value === 'in-deal' ||
    value === 'near-target' ||
    value === 'above-target' ||
    value === 'not-listed'
  )
}
