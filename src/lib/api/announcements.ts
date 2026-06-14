import type { Announcement } from '@/types'
import { apiClient } from './client'

export interface CreateAnnouncementInput {
  eventId: string
  title: string
  message: string
  priority: Announcement['priority']
}

export function fetchAnnouncements(eventId: string) {
  const params = new URLSearchParams({ eventId })
  return apiClient<Announcement[]>(`/api/announcements?${params}`)
}

export function createAnnouncement(data: CreateAnnouncementInput) {
  return apiClient<Announcement>('/api/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
