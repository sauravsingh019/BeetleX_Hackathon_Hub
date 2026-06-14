import { useQuery } from '@tanstack/react-query'
import { validateInviteCode } from '../teams'

export function useValidateInviteCode(code: string, eventId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['teams', 'validate-invite', eventId, code],
    queryFn: () => validateInviteCode(code, eventId),
    enabled: enabled && code.length >= 4 && Boolean(eventId),
    staleTime: 30_000,
    retry: false,
  })
}
