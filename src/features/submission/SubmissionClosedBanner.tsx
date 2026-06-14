import { Lock } from 'lucide-react'

export function SubmissionClosedBanner() {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3"
    >
      <Lock className="h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
      <div>
        <p className="font-medium text-text-primary">Submissions are closed</p>
        <p className="text-sm text-text-secondary">
          The submission deadline has passed. You can no longer edit your project.
        </p>
      </div>
    </div>
  )
}
