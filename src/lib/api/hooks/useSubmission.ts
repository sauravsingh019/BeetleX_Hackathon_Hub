import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSubmission,
  fetchSubmission,
  updateSubmission,
  type CreateSubmissionInput,
  type UpdateSubmissionInput,
} from '../submissions'

export function useSubmission(id: string) {
  return useQuery({
    queryKey: ['submissions', id],
    queryFn: () => fetchSubmission(id),
    enabled: Boolean(id),
  })
}

export function useCreateSubmission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSubmissionInput) => createSubmission(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}

export function useUpdateSubmission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubmissionInput }) =>
      updateSubmission(id, data),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['submissions', variables.id] })
      void queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}
