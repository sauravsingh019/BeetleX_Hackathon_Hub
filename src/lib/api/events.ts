import type { HackathonEvent, LeaderboardEntry } from '@/types'
import { apiClient } from './client'

export function fetchEvents() {
  return apiClient<HackathonEvent[]>('/api/events')
}

export function fetchEvent(id: string) {
  return apiClient<HackathonEvent>(`/api/events/${id}`)
}

export function fetchLeaderboard(eventId: string) {
  return apiClient<LeaderboardEntry[]>(`/api/events/${eventId}/leaderboard`)
}
