import { useQuery } from '@tanstack/react-query'
import { fetchEvent } from '../events'

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => fetchEvent(id),
    enabled: Boolean(id),
  })
}
