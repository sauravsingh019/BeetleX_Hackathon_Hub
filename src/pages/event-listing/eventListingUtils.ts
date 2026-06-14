import type { EventStatus, HackathonEvent } from '@/types'

export interface EventFilterParams {
  status: EventStatus[]
  track: string[]
  from: string
  to: string
}

export function parseFilterParams(searchParams: URLSearchParams): EventFilterParams {
  return {
    status: (searchParams.get('status')?.split(',').filter(Boolean) ?? []) as EventStatus[],
    track: searchParams.get('track')?.split(',').filter(Boolean) ?? [],
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
  }
}

export function filterParamsToSearchParams(filters: EventFilterParams): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.status.length) params.set('status', filters.status.join(','))
  if (filters.track.length) params.set('track', filters.track.join(','))
  if (filters.from) params.set('from', filters.from)
  if (filters.to) params.set('to', filters.to)
  return params
}

export function filterEvents(
  events: HackathonEvent[],
  filters: EventFilterParams,
  search: string,
): HackathonEvent[] {
  const query = search.trim().toLowerCase()

  return events.filter((event) => {
    if (filters.status.length > 0 && !filters.status.includes(event.status)) return false

    if (
      filters.track.length > 0 &&
      !event.tracks.some((t) => filters.track.includes(t.id))
    ) {
      return false
    }

    if (filters.from) {
      const fromDate = new Date(filters.from)
      if (new Date(event.startDate) < fromDate) return false
    }

    if (filters.to) {
      const toDate = new Date(`${filters.to}T23:59:59`)
      if (new Date(event.startDate) > toDate) return false
    }

    if (query) {
      const haystack = `${event.name} ${event.description}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })
}

export function collectTrackOptions(events: HackathonEvent[]) {
  const map = new Map<string, string>()
  for (const event of events) {
    for (const track of event.tracks) {
      map.set(track.id, track.name)
    }
  }
  return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
}
