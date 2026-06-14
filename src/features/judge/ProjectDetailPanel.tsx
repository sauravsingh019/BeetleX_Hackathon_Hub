import { ExternalLink, FileText } from 'lucide-react'
import { Card, DataChip } from '@/components/ui'
import type { SubmissionDetail } from '@/types'

interface ProjectDetailPanelProps {
  submission: SubmissionDetail
}

export function ProjectDetailPanel({ submission }: ProjectDetailPanelProps) {
  return (
    <Card elevated>
      <header className="mb-4 border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text-primary">{submission.title}</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Team: <span className="font-medium text-text-primary">{submission.teamName}</span>
        </p>
      </header>

      <section className="space-y-4">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Description
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-primary">{submission.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Tech stack
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {submission.techStack.map((tech) => (
              <DataChip key={tech}>{tech}</DataChip>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              Demo
            </h3>
            <a
              href={submission.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Open demo
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              Repository
            </h3>
            <a
              href={submission.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Open repo
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {submission.pitchDeckName && (
          <div className="rounded-lg border border-border bg-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-text-secondary" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-text-primary">{submission.pitchDeckName}</p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-accent hover:underline"
                >
                  Open PDF
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </Card>
  )
}
