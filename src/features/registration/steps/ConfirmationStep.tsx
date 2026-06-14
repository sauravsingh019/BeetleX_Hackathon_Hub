import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, DataChip } from '@/components/ui'

interface ConfirmationStepProps {
  registrationId: string
  eventName: string
}

export function ConfirmationStep({ registrationId, eventName }: ConfirmationStepProps) {
  const [copied, setCopied] = useState(false)

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(registrationId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be unavailable
    }
  }

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <Check className="h-8 w-8 text-success" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-bold text-text-primary">You&apos;re registered!</h2>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        Welcome to {eventName}. Save your registration ID — you&apos;ll need it for check-in and
        support.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
          Registration ID
        </p>
        <DataChip variant="accent" className="text-sm px-3 py-1">
          #{registrationId}
        </DataChip>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => void copyId()}
          className="min-h-12 gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy to clipboard
            </>
          )}
        </Button>
      </div>

      <Link to="/dashboard" className="mt-10 w-full sm:w-auto">
        <Button size="lg" className="min-h-12 w-full">
          Go to Team Dashboard
        </Button>
      </Link>
    </div>
  )
}
