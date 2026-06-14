import { z } from 'zod'

export const PARTICIPANT_ROLES = ['Developer', 'Designer', 'PM', 'Other'] as const

export type ParticipantRole = (typeof PARTICIPANT_ROLES)[number]

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  college: z.string().min(1, 'College or organization is required'),
  role: z.enum(PARTICIPANT_ROLES, { message: 'Select a role' }),
})

export const teamSetupSchema = z
  .object({
    teamMode: z.enum(['create', 'join']),
    teamName: z.string().optional(),
    inviteCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.teamMode === 'create') {
      if (!data.teamName?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Team name is required',
          path: ['teamName'],
        })
      }
    } else if (!data.inviteCode?.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invite code is required',
        path: ['inviteCode'],
      })
    }
  })

export const trackSelectionSchema = z.object({
  trackId: z.string().min(1, 'Select a track'),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>
export type TeamSetupValues = z.infer<typeof teamSetupSchema>
export type TrackSelectionValues = z.infer<typeof trackSelectionSchema>

export interface RegistrationFormData
  extends PersonalInfoValues,
    TeamSetupValues,
    TrackSelectionValues {
  validatedTeamName?: string
}
