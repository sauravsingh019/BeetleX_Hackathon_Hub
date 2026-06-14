import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:brightness-110 hover:-translate-y-[1px] shadow-sm shadow-accent/20 border-none',
  secondary:
    'bg-transparent text-text-primary border border-[var(--border2)] hover:border-accent hover:text-accent hover:-translate-y-[1px]',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated',
  danger: 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-[18px] py-[8px] text-[13px]',
  lg: 'px-[28px] py-[12px] text-[15px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
