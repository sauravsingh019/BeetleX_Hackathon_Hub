import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { Track } from '@/types'
import { trackSelectionSchema, type TrackSelectionValues } from '../schemas'
import { StepNav } from '../StepNav'

interface TrackSelectionStepProps {
  tracks: Track[]
  defaultValues: Partial<TrackSelectionValues>
  onNext: (values: TrackSelectionValues) => void
  onBack: () => void
}

export function TrackSelectionStep({
  tracks,
  defaultValues,
  onNext,
  onBack,
}: TrackSelectionStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TrackSelectionValues>({
    resolver: zodResolver(trackSelectionSchema),
    defaultValues: {
      trackId: defaultValues.trackId ?? '',
    },
    mode: 'onChange',
  })

  const selectedTrackId = watch('trackId')
  const selectedTrack = tracks.find((t) => t.id === selectedTrackId)

  const submitTrack = handleSubmit(onNext)

  return (
    <form
      onSubmit={(e) => {
        void submitTrack(e)
      }}
      className="flex flex-col gap-5"
      noValidate
    >
      <p className="text-sm text-text-secondary">Choose one track for your team.</p>

      <div className="grid gap-3">
        {tracks.map((track) => {
          const isSelected = selectedTrackId === track.id
          return (
            <label
              key={track.id}
              className={`flex min-h-14 cursor-pointer flex-col rounded-xl border px-4 py-4 transition-all ${
                isSelected
                  ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                  : 'border-border bg-surface hover:border-accent/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value={track.id}
                  className="h-4 w-4 accent-accent"
                  {...register('trackId')}
                />
                <span className="font-medium text-text-primary">{track.name}</span>
              </div>
            </label>
          )
        })}
      </div>

      {errors.trackId && (
        <p className="text-xs text-danger" role="alert">
          {errors.trackId.message}
        </p>
      )}

      {selectedTrack && (
        <div className="rounded-xl border border-border bg-surface-elevated/50 p-4 transition-opacity duration-300">
          <p className="text-sm font-medium text-text-primary">{selectedTrack.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {selectedTrack.description}
          </p>
        </div>
      )}

      <StepNav
        onBack={onBack}
        nextLabel="Continue"
        onNext={() => void submitTrack()}
        nextDisabled={!selectedTrackId}
      />
    </form>
  )
}
