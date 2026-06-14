import { apiClient } from './client'

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  college: string
  trackPreference: string
  createdAt: string
}

export interface CreateRegistrationInput {
  eventId: string
  name: string
  email: string
  college: string
  trackPreference: string
}

export function checkRegistration(email: string, eventId: string) {
  const params = new URLSearchParams({ email, eventId })
  return apiClient<{ exists: boolean }>(`/api/registrations/check?${params}`)
}

export function createRegistration(data: CreateRegistrationInput) {
  return apiClient<Registration>('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
