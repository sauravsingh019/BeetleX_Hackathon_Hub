import { useMemo, useState } from 'react'
import { Badge, Skeleton } from '@/components/ui'
import type { OrganizerSubmissionRow, SubmissionStatus } from '@/types'

interface SubmissionMonitorProps {
  rows: OrganizerSubmissionRow[] | undefined
  isLoading: boolean
}

const STATUS_OPTIONS: { value: 'all' | SubmissionStatus; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'not_started', label: 'Not started' },
]

const statusBadge: Record<SubmissionStatus, 'warning' | 'success' | 'default'> = {
  draft: 'warning',
  submitted: 'success',
  not_started: 'default',
}

export function SubmissionMonitor({ rows, isLoading }: SubmissionMonitorProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all')

  const filtered = useMemo(() => {
    if (!rows) return []
    if (statusFilter === 'all') return rows
    return rows.filter((r) => r.status === statusFilter)
  }, [rows, statusFilter])

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Submission Monitor</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface-elevated">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Team
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Project
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Submitted at
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.id}
                className={`border-t border-border ${i % 2 === 1 ? 'bg-surface-elevated/30' : ''}`}
              >
                <td className="px-4 py-3 text-text-primary">{row.teamName}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{row.title || '—'}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusBadge[row.status]}>
                    {row.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {row.submittedAt ? new Date(row.submittedAt).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-secondary">
                  No submissions match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
