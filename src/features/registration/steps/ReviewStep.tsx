import type { ReactNode } from 'react'
import type { Track } from '@/types'
import { Button } from '@/components/ui'
import type { RegistrationFormData } from '../schemas'
import { StepNav } from '../StepNav'

interface ReviewStepProps {
  data: RegistrationFormData
  tracks: Track[]
  onEdit: (step: number) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string
  step: number
  onEdit: (step: number) => void
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit(step)}
          className="text-accent"
        >
          Edit
        </Button>
      </div>
      <dl className="space-y-2 text-sm">{children}</dl>
    </section>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="font-medium text-text-primary">{value}</dd>
    </div>
  )
}

export function ReviewStep({
  data,
  tracks,
  onEdit,
  onBack,
  onSubmit,
  isSubmitting,
}: ReviewStepProps) {
  const track = tracks.find((t) => t.id === data.trackId)

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-text-secondary">
        Review your details before submitting. You can edit any section without losing other data.
      </p>

      <div className="space-y-4">
        <ReviewSection title="Personal info" step={1} onEdit={onEdit}>
          <ReviewRow label="Name" value={data.name} />
          <ReviewRow label="Email" value={data.email} />
          <ReviewRow label="College" value={data.college} />
          <ReviewRow label="Role" value={data.role} />
        </ReviewSection>

        <ReviewSection title="Team" step={2} onEdit={onEdit}>
          {data.teamMode === 'create' ? (
            <>
              <ReviewRow label="Mode" value="Create new team" />
              <ReviewRow label="Team name" value={data.teamName ?? ''} />
            </>
          ) : (
            <>
              <ReviewRow label="Mode" value="Join existing team" />
              <ReviewRow label="Invite code" value={data.inviteCode ?? ''} />
              {data.validatedTeamName && (
                <ReviewRow label="Team" value={data.validatedTeamName} />
              )}
            </>
          )}
        </ReviewSection>

        <ReviewSection title="Track" step={3} onEdit={onEdit}>
          <ReviewRow label="Selected track" value={track?.name ?? data.trackId} />
        </ReviewSection>
      </div>

      <StepNav
        onBack={onBack}
        nextLabel="Submit Registration"
        onNext={onSubmit}
        nextLoading={isSubmitting}
      />
    </div>
  )
}
