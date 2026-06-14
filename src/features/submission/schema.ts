import { z } from 'zod'

const githubPattern = /^https:\/\/(www\.)?github\.com\/.+/i
const videoPattern = /^https:\/\/(www\.)?(youtube\.com|youtu\.be|loom\.com)\/.+/i

export const submissionSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  techStack: z.array(z.string()).min(1, 'Add at least one technology'),
  demoLink: z.string().url('Enter a valid demo URL'),
  repoLink: z
    .string()
    .min(1, 'GitHub repo link is required')
    .regex(githubPattern, 'Must be a github.com URL'),
  videoLink: z
    .string()
    .regex(videoPattern, 'Must be a YouTube or Loom URL')
    .or(z.literal(''))
    .optional(),
  pitchDeckName: z.string().optional(),
})

export type SubmissionFormValues = z.infer<typeof submissionSchema>

export const MAX_PITCH_DECK_BYTES = 10 * 1024 * 1024

export function validatePitchDeck(file: File): string | null {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return 'Pitch deck must be a PDF file'
  }
  if (file.size > MAX_PITCH_DECK_BYTES) {
    return 'Pitch deck must be 10 MB or smaller'
  }
  return null
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
