import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import confetti from 'canvas-confetti'
import { Button, Input, Modal, Textarea } from '@/components/ui'
import type { Submission } from '@/types'
import { useToastStore } from '@/store/toastStore'
import { PitchDeckUpload } from './PitchDeckUpload'
import { submissionSchema, type SubmissionFormValues } from './schema'
import { TechStackInput } from './TechStackInput'

interface SubmissionFormProps {
  teamId: string
  submission: Submission | null
  disabled: boolean
  onSaveDraft: (values: SubmissionFormValues, pitchDeckName?: string) => Promise<void>
  onSubmitFinal: (values: SubmissionFormValues, pitchDeckName?: string) => Promise<void>
  isSaving: boolean
}

export function SubmissionForm({
  teamId,
  submission,
  disabled,
  onSaveDraft,
  onSubmitFinal,
  isSaving,
}: SubmissionFormProps) {
  const showToast = useToastStore((s) => s.showToast)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pitchFile, setPitchFile] = useState<File | null>(null)
  const [pitchError, setPitchError] = useState<string | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(submission?.updatedAt ?? null)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isDirty },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: submission?.title ?? '',
      description: submission?.description ?? '',
      techStack: submission?.techStack ?? [],
      demoLink: submission?.demoLink ?? '',
      repoLink: submission?.repoLink ?? '',
      videoLink: submission?.videoLink ?? '',
      pitchDeckName: submission?.pitchDeckName ?? '',
    },
  })

  const saveDraftInternal = useCallback(async () => {
    const values = getValues()
    const parsed = submissionSchema.safeParse(values)
    if (!parsed.success) return

    const deckName = pitchFile?.name ?? values.pitchDeckName
    await onSaveDraft({ ...parsed.data, pitchDeckName: deckName }, deckName)
    setLastSavedAt(new Date().toISOString())
    showToast({ message: 'Draft saved', type: 'info' })
  }, [getValues, onSaveDraft, pitchFile, showToast])

  const formValues = watch()

  useEffect(() => {
    if (disabled || !isDirty) return

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      void saveDraftInternal()
    }, 30_000)

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [formValues, disabled, isDirty, saveDraftInternal])

  const handleSaveDraft = handleSubmit(async (values) => {
    const deckName = pitchFile?.name ?? values.pitchDeckName
    await onSaveDraft({ ...values, pitchDeckName: deckName }, deckName)
    setLastSavedAt(new Date().toISOString())
    showToast({ message: 'Draft saved', type: 'info' })
  })

  const handleSubmitFinal = handleSubmit(async (values) => {
    const deckName = pitchFile?.name ?? values.pitchDeckName
    await onSubmitFinal({ ...values, pitchDeckName: deckName }, deckName)
    setConfirmOpen(false)
    showToast({ message: 'Project submitted successfully', type: 'info' })
    
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00FF9D', '#00E5FF', '#7C3AED'],
    })
  })

  return (
    <>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
        <Input
          label="Project title"
          disabled={disabled}
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label="Description"
          disabled={disabled}
          error={errors.description?.message}
          {...register('description')}
        />

        <Controller
          name="techStack"
          control={control}
          render={({ field }) => (
            <TechStackInput
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
              error={errors.techStack?.message}
            />
          )}
        />

        <Input
          label="Demo link"
          type="url"
          placeholder="https://your-demo.example.com"
          disabled={disabled}
          error={errors.demoLink?.message}
          {...register('demoLink')}
        />

        <Input
          label="GitHub repo link"
          type="url"
          placeholder="https://github.com/org/repo"
          disabled={disabled}
          error={errors.repoLink?.message}
          {...register('repoLink')}
        />

        <PitchDeckUpload
          disabled={disabled}
          existingName={submission?.pitchDeckName}
          pitchFile={pitchFile}
          pitchError={pitchError}
          onSelect={(file, err) => {
            setPitchFile(file)
            setPitchError(err)
          }}
        />

        <Input
          label="Demo video link (optional)"
          type="url"
          placeholder="https://youtube.com/… or https://loom.com/…"
          disabled={disabled}
          error={errors.videoLink?.message}
          {...register('videoLink')}
        />

        {!disabled && (
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <Button
              type="button"
              variant="secondary"
              disabled={isSaving}
              onClick={() => void handleSaveDraft()}
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Save Draft
            </Button>
            <Button type="button" disabled={isSaving} onClick={() => setConfirmOpen(true)}>
              Submit Final
            </Button>
            {lastSavedAt && (
              <span className="font-mono text-xs text-text-secondary">
                Last saved {new Date(lastSavedAt).toLocaleString()}
              </span>
            )}
          </div>
        )}

        <input type="hidden" value={teamId} readOnly />
      </form>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit project?">
        <p className="text-sm text-text-secondary">
          You can&apos;t edit after this — are you sure?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" disabled={isSaving} onClick={() => void handleSubmitFinal()}>
            {isSaving ? 'Submitting…' : 'Yes, submit'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
