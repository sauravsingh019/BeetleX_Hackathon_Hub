import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`min-h-[120px] resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
