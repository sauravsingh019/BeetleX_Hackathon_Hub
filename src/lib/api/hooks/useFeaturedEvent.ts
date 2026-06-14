import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../events'

export function useFeaturedEvent() {
  return useQuery({
    queryKey: ['events', 'featured'],
    queryFn: async () => {
      const allEvents = await fetchEvents()
      const active = allEvents.filter((e) => e.status === 'active')
      return active.find((e) => e.tracks.length > 1) ?? active[0] ?? allEvents[0] ?? null
    },
  })
}
