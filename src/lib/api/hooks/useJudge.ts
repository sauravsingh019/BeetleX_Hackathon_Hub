import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchJudgeAssignments, fetchJudgeScores, submitScore, type CreateScoreInput } from '../judge'

export function useJudgeAssignments() {
  return useQuery({
    queryKey: ['judge', 'assignments'],
    queryFn: fetchJudgeAssignments,
  })
}

export function useJudgeScores(judgeId: string) {
  return useQuery({
    queryKey: ['judge', 'scores', judgeId],
    queryFn: () => fetchJudgeScores(judgeId),
    enabled: Boolean(judgeId),
  })
}

export function useSubmitScore() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateScoreInput) => submitScore(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['judge'] })
    },
  })
}
