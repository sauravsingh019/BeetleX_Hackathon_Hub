import { useQuery } from '@tanstack/react-query'
import { fetchAnnouncements } from '../announcements'

export function useAnnouncements(eventId: string) {
  return useQuery({
    queryKey: ['announcements', eventId],
    queryFn: () => fetchAnnouncements(eventId),
    enabled: Boolean(eventId),
  })
}
