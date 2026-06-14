import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../events'

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })
}
