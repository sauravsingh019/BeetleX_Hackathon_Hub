import { Link } from 'react-router-dom'
import { Badge, DataChip } from '@/components/ui'
import type { JudgeAssignment, Score } from '@/types'

interface CompletedReviewsListProps {
  assignments: JudgeAssignment[]
  scores: Score[]
}

function averageScore(score: Score) {
  return ((score.innovation + score.technical + score.impact + score.presentation) / 4).toFixed(1)
}

export function CompletedReviewsList({ assignments, scores }: CompletedReviewsListProps) {
  const reviewed = assignments.filter((a) => a.status === 'reviewed')

  if (reviewed.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-text-secondary">No completed reviews yet.</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-surface-elevated">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Project
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Team
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Avg score
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Submitted
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reviewed.map((item, i) => {
            const score = scores.find((s) => s.submissionId === item.submissionId)
            return (
              <tr
                key={item.submissionId}
                className={`border-t border-border ${i % 2 === 1 ? 'bg-surface-elevated/30' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-text-primary">{item.projectTitle}</td>
                <td className="px-4 py-3 text-text-secondary">{item.teamName}</td>
                <td className="px-4 py-3">
                  {score ? (
                    <DataChip variant="live">{averageScore(score)}</DataChip>
                  ) : (
                    <Badge variant="default">—</Badge>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {score ? new Date(score.submittedAt).toLocaleString() : '—'}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/judge/review/${item.submissionId}`}
                    className="font-medium text-accent hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
