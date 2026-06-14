import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Users } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui'
import { useDebounce, useValidateInviteCode } from '@/lib/api/hooks'
import { teamSetupSchema, type TeamSetupValues } from '../schemas'
import { StepNav } from '../StepNav'

interface TeamSetupStepProps {
  eventId: string
  defaultValues: Partial<TeamSetupValues & { validatedTeamName?: string }>
  onNext: (values: TeamSetupValues & { validatedTeamName?: string }) => void
  onBack: () => void
}

export function TeamSetupStep({ eventId, defaultValues, onNext, onBack }: TeamSetupStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TeamSetupValues>({
    resolver: zodResolver(teamSetupSchema),
    defaultValues: {
      teamMode: defaultValues.teamMode ?? 'create',
      teamName: defaultValues.teamName ?? '',
      inviteCode: defaultValues.inviteCode ?? '',
    },
    mode: 'onChange',
  })

  const teamMode = watch('teamMode')
  const inviteCode = watch('inviteCode') ?? ''
  const debouncedCode = useDebounce(inviteCode.trim().toUpperCase(), 400)

  const { data: inviteResult, isFetching: isValidating } = useValidateInviteCode(
    debouncedCode,
    eventId,
    teamMode === 'join' && debouncedCode.length >= 4,
  )

  const inviteValid = teamMode === 'join' && inviteResult?.valid === true
  const inviteInvalid =
    teamMode === 'join' &&
    debouncedCode.length >= 4 &&
    !isValidating &&
    inviteResult?.valid === false

  useEffect(() => {
    if (inviteInvalid) {
      setError('inviteCode', { message: 'Invalid invite code for this event' })
    } else {
      clearErrors('inviteCode')
    }
  }, [inviteInvalid, setError, clearErrors])

  const canProceed =
    teamMode === 'create'
      ? Boolean(watch('teamName')?.trim())
      : inviteValid && Boolean(debouncedCode)

  const submit = (values: TeamSetupValues) => {
    if (teamMode === 'join' && !inviteValid) {
      setError('inviteCode', { message: 'Enter a valid invite code' })
      return
    }
    onNext({
      ...values,
      validatedTeamName: inviteValid ? inviteResult?.teamName : undefined,
    })
  }

  const submitForm = handleSubmit(submit)

  return (
    <form
      onSubmit={(e) => {
        void submitForm(e)
      }}
      className="flex flex-col gap-5"
      noValidate
    >
      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-medium text-text-secondary">How do you want to join?</legend>

        <label
          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
            teamMode === 'create'
              ? 'border-accent bg-accent/10'
              : 'border-border bg-surface hover:border-accent/40'
          }`}
        >
          <input
            type="radio"
            value="create"
            className="h-4 w-4 accent-accent"
            {...register('teamMode')}
          />
          <div>
            <p className="font-medium text-text-primary">Create a new team</p>
            <p className="text-sm text-text-secondary">You&apos;ll get an invite link to share</p>
          </div>
        </label>

        <label
          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
            teamMode === 'join'
              ? 'border-accent bg-accent/10'
              : 'border-border bg-surface hover:border-accent/40'
          }`}
        >
          <input
            type="radio"
            value="join"
            className="h-4 w-4 accent-accent"
            {...register('teamMode')}
          />
          <div>
            <p className="font-medium text-text-primary">Join existing team</p>
            <p className="text-sm text-text-secondary">Enter an invite code from your teammate</p>
          </div>
        </label>
      </fieldset>

      {teamMode === 'create' ? (
        <Input
          label="Team name"
          placeholder="e.g. NeuroNauts"
          className="min-h-11 py-2.5 text-base"
          error={errors.teamName?.message}
          {...register('teamName')}
        />
      ) : (
        <div className="space-y-3">
          <Input
            label="Invite code"
            placeholder="e.g. NEURO-7X2K"
            className="min-h-11 py-2.5 font-mono text-base uppercase"
            error={errors.inviteCode?.message}
            {...register('inviteCode')}
          />
          {isValidating && (
            <p className="text-sm text-text-secondary">Validating code…</p>
          )}
          {inviteValid && inviteResult?.teamName && (
            <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2.5 text-sm text-success">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Joining <strong>{inviteResult.teamName}</strong>
              </span>
            </div>
          )}
        </div>
      )}

      <StepNav onBack={onBack} nextLabel="Continue" onNext={() => void submitForm()} nextDisabled={!canProceed} />
    </form>
  )
}
