import type { ReactNode } from 'react'

type DataChipVariant = 'default' | 'accent' | 'live' | 'success' | 'warning' | 'danger'

interface DataChipProps {
  children: ReactNode
  variant?: DataChipVariant
  className?: string
}

const variantClasses: Record<DataChipVariant, string> = {
  default: 'text-text-secondary bg-surface-elevated/80',
  accent: 'text-accent bg-accent/10',
  live: 'text-accent-live bg-accent-live/10',
  success: 'text-success bg-success/10',
  warning: 'text-warning bg-warning/10',
  danger: 'text-danger bg-danger/10',
}

/**
 * Signature BeetleX pattern for system data: IDs, statuses, countdowns, scores.
 * Always renders bracketed monospace text with a subtle elevated background.
 */
export function DataChip({ children, variant = 'default', className = '' }: DataChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs tracking-tight ${variantClasses[variant]} ${className}`}
    >
      [{children}]
    </span>
  )
}
