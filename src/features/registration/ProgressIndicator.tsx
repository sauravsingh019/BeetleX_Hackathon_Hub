const STEP_LABELS = [
  'Personal Info',
  'Team Setup',
  'Track Selection',
  'Review',
  'Confirmation',
] as const

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps?: number
}

export function ProgressIndicator({ currentStep, totalSteps = 5 }: ProgressIndicatorProps) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mb-8" aria-label="Registration progress">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-text-primary">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-sm text-text-secondary">{STEP_LABELS[currentStep - 1]}</p>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <ol className="mt-3 hidden gap-2 sm:flex">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isComplete = stepNumber < currentStep

          return (
            <li
              key={label}
              className={`flex-1 truncate text-center text-xs ${
                isActive
                  ? 'font-medium text-accent'
                  : isComplete
                    ? 'text-text-secondary'
                    : 'text-text-secondary/50'
              }`}
              aria-current={isActive ? 'step' : undefined}
            >
              {label}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
