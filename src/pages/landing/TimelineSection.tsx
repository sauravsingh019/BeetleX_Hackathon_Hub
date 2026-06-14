
import { formatDateTime } from '@/lib/format'
import type { HackathonEvent } from '@/types'

interface TimelineStep {
  label: string
  date: string
}

function buildTimeline(event: HackathonEvent): TimelineStep[] {
  const judgingDate = new Date(event.submissionDeadline)
  judgingDate.setDate(judgingDate.getDate() + 1)

  return [
    { label: 'Registration Open', date: event.startDate },
    { label: 'Submission Deadline', date: event.submissionDeadline },
    { label: 'Judging', date: judgingDate.toISOString() },
    { label: 'Results', date: event.endDate },
  ]
}

interface TimelineSectionProps {
  event: HackathonEvent
}

export function TimelineSection({ event }: TimelineSectionProps) {
  const steps = buildTimeline(event)

  return (
    <div className="relative pl-8 before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-border">
      {steps.map((step, index) => {
        // Just mock some descriptions for visual parity
        const descriptions = [
          'Individual and team registration begins',
          'Hard deadline — no extensions',
          'Panel reviews all submissions',
          'Live stream + winner interviews',
        ]
        const isPast = index < 2 // mock past events
        return (
          <div key={step.label} className="relative mb-8">
            <div className={`absolute -left-[29px] top-[4px] w-[14px] h-[14px] rounded-full border-2 border-accent ${isPast ? 'bg-accent' : 'bg-background'}`}></div>
            <div className="text-[12px] text-accent font-semibold mb-[2px] font-mono">{formatDateTime(step.date)}</div>
            <div className="text-[15px] font-semibold text-text-primary">{step.label}</div>
            <div className="text-[13px] text-text-secondary">{descriptions[index] || 'Timeline milestone'}</div>
          </div>
        )
      })}
    </div>
  )
}
