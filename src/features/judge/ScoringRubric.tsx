import { DataChip } from '@/components/ui'
import type { Score } from '@/types'

export interface RubricScores {
  innovation: number
  technical: number
  impact: number
  presentation: number
}

interface ScoringRubricProps {
  scores: RubricScores
  onChange: (field: keyof RubricScores, value: number) => void
  readOnly?: boolean
  existingScore?: Score
}

const CRITERIA: { key: keyof RubricScores; label: string }[] = [
  { key: 'innovation', label: 'Innovation' },
  { key: 'technical', label: 'Technical Execution' },
  { key: 'impact', label: 'Impact' },
  { key: 'presentation', label: 'Presentation' },
]

function clampScore(n: number) {
  return Math.min(10, Math.max(1, n))
}

export function ScoringRubric({
  scores,
  onChange,
  readOnly,
  existingScore,
}: ScoringRubricProps) {
  const active = existingScore ?? scores
  const total = active.innovation + active.technical + active.impact + active.presentation
  const average = total / 4

  return (
    <div className="space-y-4">
      {CRITERIA.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor={`score-${key}`} className="text-sm font-medium text-text-primary">
            {label}
          </label>
          <div className="flex items-center gap-3">
            <input
              id={`score-${key}`}
              type="range"
              min={1}
              max={10}
              step={1}
              value={active[key]}
              disabled={readOnly}
              onChange={(e) => onChange(key, clampScore(Number(e.target.value)))}
              className="h-2 w-full max-w-[200px] accent-accent disabled:opacity-60"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={active[key]}
            />
            <input
              type="number"
              min={1}
              max={10}
              value={active[key]}
              disabled={readOnly}
              onChange={(e) => onChange(key, clampScore(Number(e.target.value)))}
              className="w-14 rounded-lg border border-border bg-surface px-2 py-1 text-center font-mono text-sm text-text-primary disabled:opacity-60"
              aria-label={`${label} score`}
            />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
        <span className="text-sm text-text-secondary">Total:</span>
        <DataChip variant="accent">{total}</DataChip>
        <span className="text-sm text-text-secondary">Average:</span>
        <DataChip variant="live">{average.toFixed(1)}</DataChip>
      </div>
    </div>
  )
}
