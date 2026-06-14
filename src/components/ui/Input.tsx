import { forwardRef, type InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <motion.div 
        className="flex flex-col gap-1.5"
        animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30 ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </motion.div>
    )
  }
)
Input.displayName = 'Input'
