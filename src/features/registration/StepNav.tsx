import type { ReactNode } from 'react'
import { Button } from '@/components/ui'

interface StepNavProps {
  onBack?: () => void
  backLabel?: string
  nextLabel?: string
  onNext?: () => void
  nextDisabled?: boolean
  nextLoading?: boolean
  children?: ReactNode
}

export function StepNav({
  onBack,
  backLabel = 'Back',
  nextLabel = 'Next',
  onNext,
  nextDisabled,
  nextLoading,
  children,
}: StepNavProps) {
  return (
    <div className="sticky bottom-0 -mx-4 mt-8 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-0 sm:rounded-xl sm:border sm:px-5">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onBack ? (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onBack}
            className="w-full min-h-12 sm:w-auto"
          >
            {backLabel}
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {children}
        {onNext && (
          <Button
            type="button"
            size="lg"
            onClick={onNext}
            disabled={(nextDisabled ?? false) || (nextLoading ?? false)}
            className="w-full min-h-12 sm:w-auto"
          >
            {nextLoading ? 'Please wait…' : nextLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
