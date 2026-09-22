import { describe, expect, it } from 'vitest'
import { daysLeftLabel } from './formatting'

describe('daysLeftLabel', () => {
  const now = new Date('2026-09-22T10:00:00Z')

  it('returns "Today" when the end date is today', () => {
    expect(daysLeftLabel('2026-09-22', now)).toBe('Today')
  })

  it('returns "Today" when the end date is in the past', () => {
    expect(daysLeftLabel('2026-09-01', now)).toBe('Today')
  })

  it('returns "1 day left" for tomorrow', () => {
    expect(daysLeftLabel('2026-09-23', now)).toBe('1 day left')
  })

  it('returns "N days left" for a future date', () => {
    expect(daysLeftLabel('2026-10-15', now)).toBe('23 days left')
  })
})
