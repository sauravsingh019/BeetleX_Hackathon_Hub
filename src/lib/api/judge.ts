import type { JudgeAssignment, Score } from '@/types'
import { apiClient } from './client'

export type CreateScoreInput = Omit<Score, 'id' | 'submittedAt'>

export function fetchJudgeAssignments() {
  return apiClient<JudgeAssignment[]>('/api/judge/assignments')
}

export function fetchJudgeScores(judgeId: string) {
  const params = new URLSearchParams({ judgeId })
  return apiClient<Score[]>(`/api/judge/scores?${params}`)
}

export function submitScore(data: CreateScoreInput) {
  return apiClient<Score>('/api/scores', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
