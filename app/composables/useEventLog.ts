/**
 * Lightweight, local-only event logging — no external analytics, no server.
 * Event names mirror the real Step 1 PRD's own tracking-strategy list
 * verbatim (docs/prototype-reference/prds/step-1-deal-opportunities-mvp.md),
 * both for research realism and so any learnings map directly onto the real
 * product's eventual analytics naming.
 */
export type SessionEventType =
  | 'listings_page_viewed'
  | 'deals_tab_viewed'
  | 'campaign_card_opened'
  | 'campaign_drawer_opened'
  | 'listing_status_filtered_or_viewed'
  | 'action_clicked'
  | 'listing_price_updated_after_viewing_deal'
  | 'export_triggered'
  | 'prototype_reset'

export interface SessionEvent {
  timestamp: string
  type: SessionEventType
  payload?: Record<string, unknown>
}

export function useEventLog() {
  const events = useState<SessionEvent[]>('session-event-log', () => [])

  function logEvent(type: SessionEventType, payload?: Record<string, unknown>) {
    events.value.push({
      timestamp: new Date().toISOString(),
      type,
      payload,
    })
  }

  function clearLog() {
    events.value = []
  }

  function downloadLog() {
    if (typeof window === 'undefined') return
    const blob = new Blob([JSON.stringify(events.value, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `deals-prototype-session-log-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return { events, logEvent, clearLog, downloadLog }
}
