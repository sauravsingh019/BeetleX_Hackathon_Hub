import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border p-5 ${elevated ? 'bg-surface-elevated' : 'bg-surface'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
