import { X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'

interface TechStackInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  disabled?: boolean
  error?: string
}

export function TechStackInput({ value, onChange, disabled, error }: TechStackInputProps) {
  const [input, setInput] = useState('')

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag || value.includes(tag)) return
    onChange([...value, tag])
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="tech-stack-input" className="text-sm font-medium text-text-secondary">
        Tech stack
      </label>
      <div
        className={`flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30 ${error ? 'border-danger' : ''} ${disabled ? 'opacity-60' : ''}`}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2 py-0.5 text-xs font-medium text-text-primary"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="text-text-secondary hover:text-danger"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        <input
          id="tech-stack-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(input)}
          disabled={disabled}
          placeholder={value.length === 0 ? 'Type a technology and press Enter' : 'Add more…'}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary/60 disabled:cursor-not-allowed"
        />
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
      <p className="text-xs text-text-secondary">Press Enter to add each technology.</p>
    </div>
  )
}
