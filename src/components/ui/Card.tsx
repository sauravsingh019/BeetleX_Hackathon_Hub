import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-[18px] border border-border p-5 ${elevated ? 'bg-surface-elevated' : 'bg-surface'} transition-colors duration-200 hover:border-[var(--border2)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
