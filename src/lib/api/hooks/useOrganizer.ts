import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnnouncement, type CreateAnnouncementInput } from '../announcements'
import {
  fetchJudgeAssignmentMap,
  fetchOrganizerJudges,
  fetchOrganizerRegistrations,
  fetchOrganizerStats,
  fetchOrganizerSubmissions,
  saveJudgeAssignments,
} from '../organizer'

export function useOrganizerStats(eventId: string) {
  return useQuery({
    queryKey: ['organizer', 'stats', eventId],
    queryFn: () => fetchOrganizerStats(eventId),
    enabled: Boolean(eventId),
  })
}

export function useOrganizerRegistrations(eventId: string) {
  return useQuery({
    queryKey: ['organizer', 'registrations', eventId],
    queryFn: () => fetchOrganizerRegistrations(eventId),
    enabled: Boolean(eventId),
  })
}

export function useOrganizerSubmissions(eventId: string) {
  return useQuery({
    queryKey: ['organizer', 'submissions', eventId],
    queryFn: () => fetchOrganizerSubmissions(eventId),
    enabled: Boolean(eventId),
  })
}

export function useOrganizerJudges() {
  return useQuery({
    queryKey: ['organizer', 'judges'],
    queryFn: fetchOrganizerJudges,
  })
}

export function useJudgeAssignmentMap() {
  return useQuery({
    queryKey: ['organizer', 'assignments'],
    queryFn: fetchJudgeAssignmentMap,
  })
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateAnnouncementInput) => createAnnouncement(data),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['announcements', variables.eventId] })
      void queryClient.invalidateQueries({ queryKey: ['organizer', 'stats', variables.eventId] })
    },
  })
}

export function useSaveJudgeAssignments() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveJudgeAssignments,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['organizer', 'assignments'] })
    },
  })
}
