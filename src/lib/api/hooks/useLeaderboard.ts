import { useQuery } from '@tanstack/react-query'
import { fetchLeaderboard } from '../events'

export function useLeaderboard(eventId: string) {
  return useQuery({
    queryKey: ['leaderboard', eventId],
    queryFn: () => fetchLeaderboard(eventId),
    enabled: Boolean(eventId),
  })
}
