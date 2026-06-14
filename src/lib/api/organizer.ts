import type { MockJudge, OrganizerSubmissionRow } from '@/types'
import { apiClient } from './client'
import type { OrganizerRegistrationRow } from '@/types'

export interface OrganizerStats {
  eventId: string
  totalRegistrations: number
  totalTeams: number
  submissionsDraft: number
  submissionsSubmitted: number
  announcementsCount: number
  activeJudges: number
}

export function fetchOrganizerStats(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<OrganizerStats>(`/api/organizer/stats?${params}`)
}

export function fetchOrganizerRegistrations(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<OrganizerRegistrationRow[]>(`/api/organizer/registrations?${params}`)
}

export function fetchOrganizerSubmissions(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<OrganizerSubmissionRow[]>(`/api/organizer/submissions?${params}`)
}

export function fetchOrganizerJudges() {
  return apiClient<MockJudge[]>('/api/organizer/judges')
}

export function fetchJudgeAssignmentMap() {
  return apiClient<Record<string, string>>('/api/organizer/assignments')
}

export function saveJudgeAssignments(assignments: { submissionId: string; judgeId: string }[]) {
  return apiClient<{ saved: boolean }>('/api/organizer/assignments', {
    method: 'PUT',
    body: JSON.stringify({ assignments }),
  })
}
