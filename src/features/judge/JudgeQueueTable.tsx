import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import type { JudgeAssignment } from '@/types'

interface JudgeQueueTableProps {
  assignments: JudgeAssignment[]
}

const statusBadge = {
  pending: 'warning' as const,
  reviewed: 'success' as const,
}

export function JudgeQueueTable({ assignments }: JudgeQueueTableProps) {
  const pending = assignments.filter((a) => a.status === 'pending')

  if (pending.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-text-secondary">
        No pending reviews — you&apos;re all caught up.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-surface-elevated">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Project
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Team
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pending.map((item, i) => (
            <tr
              key={item.submissionId}
              className={`border-t border-border ${i % 2 === 1 ? 'bg-surface-elevated/30' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">{item.projectTitle}</td>
              <td className="px-4 py-3 text-text-secondary">{item.teamName}</td>
              <td className="px-4 py-3">
                <Badge variant={statusBadge[item.status]}>
                  {item.status === 'pending' ? 'Pending' : 'Reviewed'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/judge/review/${item.submissionId}`}
                  className="font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
