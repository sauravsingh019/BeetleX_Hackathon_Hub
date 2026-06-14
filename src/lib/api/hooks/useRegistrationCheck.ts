import { useQuery } from '@tanstack/react-query'
import { checkRegistration } from '../registrations'

export function useRegistrationCheck(email: string, eventId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['registrations', 'check', eventId, email],
    queryFn: () => checkRegistration(email, eventId),
    enabled: enabled && Boolean(email) && Boolean(eventId),
    staleTime: 60_000,
  })
}
