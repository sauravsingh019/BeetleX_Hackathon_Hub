import type { Submission } from '@/types'
import { apiClient } from './client'

export type CreateSubmissionInput = Omit<Submission, 'id' | 'updatedAt' | 'submittedAt'>

export type UpdateSubmissionInput = Partial<Omit<Submission, 'id' | 'teamId'>>

export function createSubmission(data: CreateSubmissionInput) {
  return apiClient<Submission>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateSubmission(id: string, data: UpdateSubmissionInput) {
  return apiClient<Submission>(`/api/submissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
