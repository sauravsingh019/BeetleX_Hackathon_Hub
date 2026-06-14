import { ArrowRight, Circle, CircleCheck, CircleDashed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card } from '@/components/ui'
import type { Submission } from '@/types'

type TrackerStatus = 'not_started' | 'in_progress' | 'submitted'

function deriveStatus(submission: Submission | null): TrackerStatus {
  if (!submission) return 'not_started'
  if (submission.status === 'submitted') return 'submitted'
  return 'in_progress'
}

const STATUS_CONFIG: Record<
  TrackerStatus,
  { label: string; badge: 'default' | 'warning' | 'success'; icon: typeof Circle }
> = {
  not_started: { label: 'Not Started', badge: 'default', icon: CircleDashed },
  in_progress: { label: 'In Progress', badge: 'warning', icon: Circle },
  submitted: { label: 'Submitted', badge: 'success', icon: CircleCheck },
}

const STEPS: { key: TrackerStatus; label: string }[] = [
  { key: 'not_started', label: 'Not Started' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'submitted', label: 'Submitted' },
]

interface SubmissionStatusTrackerProps {
  submission: Submission | null
}

export function SubmissionStatusTracker({ submission }: SubmissionStatusTrackerProps) {
  const status = deriveStatus(submission)
  const config = STATUS_CONFIG[status]
  const StatusIcon = config.icon
  const activeIndex = STEPS.findIndex((s) => s.key === status)

  return (
    <Card elevated className="h-full">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-text-primary">Submission Status</h2>
        <Badge variant={config.badge}>
          <StatusIcon className="mr-1 inline h-3 w-3" aria-hidden="true" />
          {config.label}
        </Badge>
      </div>

      <ol className="mb-6 flex items-center justify-between gap-1" aria-label="Submission progress">
        {STEPS.map((step, index) => {
          const isComplete = index < activeIndex
          const isActive = index === activeIndex
          return (
            <li key={step.key} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors ${
                  isComplete
                    ? 'border-success bg-success/15 text-success'
                    : isActive
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-border bg-surface text-text-secondary'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? '✓' : index + 1}
              </span>
              <span
                className={`hidden text-center text-xs sm:block ${
                  isActive ? 'font-medium text-text-primary' : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>

      {submission?.title && status !== 'not_started' && (
        <p className="mb-4 text-sm text-text-secondary">
          Current project:{' '}
          <span className="font-medium text-text-primary">{submission.title}</span>
        </p>
      )}

      {status !== 'submitted' && (
        <Link to="/dashboard/submit">
          <Button className="w-full min-h-11 gap-2 sm:w-auto">
            {status === 'not_started' ? 'Start submission' : 'Continue submission'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      )}
    </Card>
  )
}
