import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui'
import { ApiError } from '@/lib/api'
import { createRegistration } from '@/lib/api/registrations'
import { createTeam, joinTeam } from '@/lib/api/teams'
import { useEvent } from '@/lib/api/hooks'
import type { HackathonEvent } from '@/types'
import { DuplicateRegistrationModal } from './DuplicateRegistrationModal'
import { ProgressIndicator } from './ProgressIndicator'
import type {
  PersonalInfoValues,
  RegistrationFormData,
  TeamSetupValues,
  TrackSelectionValues,
} from './schemas'
import { ConfirmationStep } from './steps/ConfirmationStep'
import { PersonalInfoStep } from './steps/PersonalInfoStep'
import { ReviewStep } from './steps/ReviewStep'
import { TeamSetupStep } from './steps/TeamSetupStep'
import { TrackSelectionStep } from './steps/TrackSelectionStep'

interface RegistrationFormProps {
  event: HackathonEvent
}

const variants = {
  enter: (direction: 'forward' | 'back') => ({
    x: direction === 'forward' ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: 'forward' | 'back') => ({
    zIndex: 0,
    x: direction === 'forward' ? -30 : 30,
    opacity: 0,
  }),
}

export function RegistrationForm({ event }: RegistrationFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({})
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; id: string }>({
    open: false,
    id: '',
  })
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? 'forward' : 'back')
    setStep(nextStep)
  }

  const mergeData = (partial: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }))
  }

  const handlePersonalNext = (values: PersonalInfoValues) => {
    mergeData(values)
    goToStep(2)
  }

  const handleTeamNext = (values: TeamSetupValues & { validatedTeamName?: string }) => {
    mergeData(values)
    goToStep(3)
  }

  const handleTrackNext = (values: TrackSelectionValues) => {
    mergeData(values)
    goToStep(4)
  }

  const handleSubmit = async () => {
    const data = formData as RegistrationFormData
    setIsSubmitting(true)

    try {
      if (data.teamMode === 'create') {
        await createTeam({
          name: data.teamName!,
          eventId: event.id,
          trackId: data.trackId,
          leader: {
            name: data.name,
            email: data.email,
            college: data.college,
          },
        })
      } else {
        await joinTeam({
          inviteCode: data.inviteCode!.trim().toUpperCase(),
          member: {
            name: data.name,
            email: data.email,
            college: data.college,
            role: data.role,
          },
        })
      }

      const registration = await createRegistration({
        eventId: event.id,
        name: data.name,
        email: data.email,
        college: data.college,
        trackPreference: data.trackId,
      })

      setRegistrationId(registration.id)
      goToStep(5)
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00FF9D', '#00E5FF', '#7C3AED'],
      })
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        const existingId =
          typeof err.data?.registrationId === 'string' ? err.data.registrationId : ''
        setDuplicateModal({ open: true, id: existingId })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {step < 5 && <ProgressIndicator currentStep={step} />}

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {step === 1 && (
              <PersonalInfoStep
                eventId={event.id}
                defaultValues={formData}
                onNext={handlePersonalNext}
              />
            )}
            {step === 2 && (
              <TeamSetupStep
                eventId={event.id}
                defaultValues={formData}
                onNext={handleTeamNext}
                onBack={() => goToStep(1)}
              />
            )}
            {step === 3 && (
              <TrackSelectionStep
                tracks={event.tracks}
                defaultValues={formData}
                onNext={handleTrackNext}
                onBack={() => goToStep(2)}
              />
            )}
            {step === 4 && (
              <ReviewStep
                data={formData as RegistrationFormData}
                tracks={event.tracks}
                onEdit={goToStep}
                onBack={() => goToStep(3)}
                onSubmit={() => void handleSubmit()}
                isSubmitting={isSubmitting}
              />
            )}
            {step === 5 && registrationId && (
              <ConfirmationStep registrationId={registrationId} eventName={event.name} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <DuplicateRegistrationModal
        open={duplicateModal.open}
        registrationId={duplicateModal.id}
        onClose={() => setDuplicateModal({ open: false, id: '' })}
      />
    </>
  )
}

interface RegistrationPageContentProps {
  eventId: string
}

export function RegistrationPageContent({ eventId }: RegistrationPageContentProps) {
  const { data: event, isLoading, isError, error } = useEvent(eventId)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl animate-pulse space-y-6 py-8">
        <div className="h-8 w-2/3 rounded-lg bg-surface-elevated" />
        <div className="h-4 w-full rounded bg-surface-elevated" />
        <div className="h-12 rounded-lg bg-surface-elevated" />
        <div className="h-12 rounded-lg bg-surface-elevated" />
        <div className="h-12 rounded-lg bg-surface-elevated" />
      </div>
    )
  }

  const isNotFound = isError && error instanceof ApiError && error.status === 404

  if (isNotFound) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <AlertCircle className="h-10 w-10 text-text-secondary" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-text-primary">Event not found</h1>
        <Link to="/events" className="mt-6">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>
    )
  }

  if (isError || !event) {
    return (
      <div role="alert" className="flex flex-col items-center py-20 text-center">
        <AlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-text-primary">Failed to load event</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl pb-24">
      <Link
        to={`/events/${event.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to event
      </Link>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Register for {event.name}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Complete all steps to secure your spot.
        </p>
      </header>
      <RegistrationForm event={event} />
    </div>
  )
}
