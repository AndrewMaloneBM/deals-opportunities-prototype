/**
 * Display-only formatting helpers (not financial calculations — see
 * calculations.ts for those). Matches the real screenshots' relative-time
 * format ("Today" / "N days left") rather than showing raw start/end dates.
 */

export function daysLeftLabel(endDateIso: string, now: Date = new Date()): string {
  const end = new Date(endDateIso)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const diffDays = Math.round((startOfEnd.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Today'
  if (diffDays === 1) return '1 day left'
  return `${diffDays} days left`
}
