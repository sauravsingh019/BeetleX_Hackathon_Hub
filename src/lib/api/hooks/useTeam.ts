import { useQuery } from '@tanstack/react-query'
import { fetchTeam, lookupTeamByMember } from '../teams'

export function useTeam(teamId: string) {
  return useQuery({
    queryKey: ['teams', teamId],
    queryFn: () => fetchTeam(teamId),
    enabled: Boolean(teamId),
  })
}

export function useTeamLookup(email: string, eventId: string) {
  return useQuery({
    queryKey: ['teams', 'lookup', eventId, email],
    queryFn: () => lookupTeamByMember(email, eventId),
    enabled: Boolean(email) && Boolean(eventId),
    retry: false,
  })
}
