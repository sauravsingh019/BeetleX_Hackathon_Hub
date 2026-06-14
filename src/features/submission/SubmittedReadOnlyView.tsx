import { CircleCheck, ExternalLink, FileText } from 'lucide-react'
import { Badge, Card, DataChip } from '@/components/ui'
import type { Submission } from '@/types'
import { formatFileSize } from './schema'

interface SubmittedReadOnlyViewProps {
  submission: Submission
  pitchDeckSize?: number
}

export function SubmittedReadOnlyView({ submission, pitchDeckSize }: SubmittedReadOnlyViewProps) {
  return (
    <div className="space-y-6">
      <div
        role="status"
        className="flex items-center gap-3 rounded-lg border border-success/40 bg-success/10 px-4 py-3"
      >
        <CircleCheck className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="font-medium text-text-primary">Submitted successfully</p>
          {submission.submittedAt && (
            <p className="font-mono text-sm text-text-secondary">
              {new Date(submission.submittedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <Card elevated>
        <h2 className="text-lg font-semibold text-text-primary">{submission.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{submission.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {submission.techStack.map((tech) => (
            <DataChip key={tech}>{tech}</DataChip>
          ))}
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              Demo link
            </dt>
            <dd className="mt-1">
              <a
                href={submission.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                {submission.demoLink}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              GitHub repo
            </dt>
            <dd className="mt-1">
              <a
                href={submission.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                {submission.repoLink}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </dd>
          </div>
          {submission.videoLink && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Demo video
              </dt>
              <dd className="mt-1">
                <a
                  href={submission.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  {submission.videoLink}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>
          )}
          {submission.pitchDeckName && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Pitch deck
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-sm text-text-primary">
                <FileText className="h-4 w-4 text-text-secondary" aria-hidden="true" />
                {submission.pitchDeckName}
                {pitchDeckSize !== undefined && (
                  <Badge variant="default">{formatFileSize(pitchDeckSize)}</Badge>
                )}
              </dd>
            </div>
          )}
        </dl>
      </Card>
    </div>
  )
}
