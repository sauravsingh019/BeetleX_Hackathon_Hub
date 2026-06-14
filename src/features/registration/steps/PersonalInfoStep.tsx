import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Input, Select } from '@/components/ui'
import { useDebounce, useRegistrationCheck } from '@/lib/api/hooks'
import { PARTICIPANT_ROLES, personalInfoSchema, type PersonalInfoValues } from '../schemas'
import { StepNav } from '../StepNav'

interface PersonalInfoStepProps {
  eventId: string
  defaultValues: Partial<PersonalInfoValues>
  onNext: (values: PersonalInfoValues) => void
}

export function PersonalInfoStep({ eventId, defaultValues, onNext }: PersonalInfoStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: defaultValues.name ?? '',
      email: defaultValues.email ?? '',
      college: defaultValues.college ?? '',
      role: defaultValues.role ?? 'Developer',
    },
    mode: 'onChange',
  })

  const email = watch('email')
  const [emailBlurred, setEmailBlurred] = useState(false)
  const debouncedEmail = useDebounce(email, 400)
  const shouldCheck = emailBlurred && personalInfoSchema.shape.email.safeParse(debouncedEmail).success

  const { data: checkResult, isFetching: isChecking } = useRegistrationCheck(
    debouncedEmail,
    eventId,
    shouldCheck,
  )

  const showDuplicateWarning = shouldCheck && !isChecking && checkResult?.exists

  const submitPersonal = handleSubmit(onNext)

  return (
    <form
      onSubmit={(e) => {
        void submitPersonal(e)
      }}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="space-y-5">
        <Input
          label="Full name"
          autoComplete="name"
          className="min-h-11 py-2.5 text-base"
          error={errors.name?.message}
          {...register('name')}
        />

        <div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            className="min-h-11 py-2.5 text-base"
            error={errors.email?.message}
            {...register('email', {
              onBlur: () => setEmailBlurred(true),
            })}
          />
          {showDuplicateWarning && (
            <div
              className="mt-2 flex flex-col gap-1 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5 text-sm text-warning sm:flex-row sm:items-center sm:justify-between"
              role="status"
            >
              <span className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Looks like you&apos;re already registered for this event
              </span>
              <Link
                to="/dashboard"
                className="font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Go to your dashboard
              </Link>
            </div>
          )}
        </div>

        <Input
          label="College / organization"
          autoComplete="organization"
          className="min-h-11 py-2.5 text-base"
          error={errors.college?.message}
          {...register('college')}
        />

        <Select
          label="Role"
          options={PARTICIPANT_ROLES.map((role) => ({ value: role, label: role }))}
          className="text-base"
          error={errors.role?.message}
          {...register('role')}
        />
      </div>

      <StepNav nextLabel="Continue" onNext={() => void submitPersonal()} nextDisabled={!isValid} />
    </form>
  )
}
