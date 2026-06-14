import { memo, useEffect, useState } from 'react'
import { DataChip } from './DataChip'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

interface CountdownTimerProps {
  targetDate: string
  label?: string
  className?: string
}

/**
 * Self-contained countdown that ticks every second without re-rendering parent pages.
 * State is isolated via memo + internal useState/useEffect.
 */
export const CountdownTimer = memo(function CountdownTimer({
  targetDate,
  label = 'Time remaining',
  className = '',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    computeTimeLeft(new Date(targetDate)),
  )

  useEffect(() => {
    const target = new Date(targetDate)

    const tick = () => setTimeLeft(computeTimeLeft(target))
    tick()

    const intervalId = setInterval(tick, 1_000)
    return () => clearInterval(intervalId)
  }, [targetDate])

  return (
    <div className={className} role="timer" aria-live="polite" aria-label={label}>
      <p className="mb-2 text-sm text-text-secondary">{label}</p>
      {timeLeft ? (
        <div className="flex flex-wrap gap-2">
          <DataChip variant="live">
            {timeLeft.days}d {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </DataChip>
        </div>
      ) : (
        <DataChip variant="default">CLOSED</DataChip>
      )}
    </div>
  )
})
