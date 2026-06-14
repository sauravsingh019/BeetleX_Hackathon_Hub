import { apiClient } from './client'
import type { Registration } from './registrations'

export interface OrganizerStats {
  eventId: string
  totalRegistrations: number
  totalTeams: number
  submissionsDraft: number
  submissionsSubmitted: number
  announcementsCount: number
}

export function fetchOrganizerStats(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<OrganizerStats>(`/api/organizer/stats?${params}`)
}

export function fetchOrganizerRegistrations(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<Registration[]>(`/api/organizer/registrations?${params}`)
}
