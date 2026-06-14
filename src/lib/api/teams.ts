import type { Team } from '@/types'
import { apiClient } from './client'

export interface CreateTeamInput {
  name: string
  eventId: string
  trackId: string
  leader: { name: string; email: string; college: string }
}

export interface JoinTeamInput {
  inviteCode: string
  member: { name: string; email: string; college: string; role: string }
}

export function fetchTeam(id: string) {
  return apiClient<Team>(`/api/teams/${id}`)
}

export function createTeam(data: CreateTeamInput) {
  return apiClient<Team>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function joinTeam(data: JoinTeamInput) {
  return apiClient<Team>('/api/teams/join', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
