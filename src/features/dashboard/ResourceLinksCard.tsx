import { BookOpen, Calendar, FileText, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui'

const RESOURCES = [
  {
    label: 'API documentation',
    href: 'https://docs.beetlex.dev/api',
    icon: BookOpen,
  },
  {
    label: 'Problem statements (PDF)',
    href: 'https://docs.beetlex.dev/problem-statements.pdf',
    icon: FileText,
  },
  {
    label: 'Mentor schedule',
    href: 'https://docs.beetlex.dev/mentors',
    icon: Calendar,
  },
] as const

export function ResourceLinksCard() {
  return (
    <Card elevated className="h-full">
      <h2 className="mb-4 text-lg font-semibold text-text-primary">Resources</h2>
      <ul className="space-y-2">
        {RESOURCES.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex-1">{label}</span>
              <ExternalLink className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  )
}
