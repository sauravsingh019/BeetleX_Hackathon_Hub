import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button, Skeleton } from '@/components/ui'
import {
  useJudgeAssignmentMap,
  useOrganizerJudges,
  useOrganizerSubmissions,
  useSaveJudgeAssignments,
} from '@/lib/api/hooks/useOrganizer'
import { useToastStore } from '@/store/toastStore'

interface JudgeAssignmentTableProps {
  eventId: string
}

export function JudgeAssignmentTable({ eventId }: JudgeAssignmentTableProps) {
  const { data: submissions, isLoading: subsLoading } = useOrganizerSubmissions(eventId)
  const { data: judges, isLoading: judgesLoading } = useOrganizerJudges()
  const { data: assignmentMap, isLoading: mapLoading } = useJudgeAssignmentMap()
  const saveMutation = useSaveJudgeAssignments()
  const showToast = useToastStore((s) => s.showToast)

  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [prevDeps, setPrevDeps] = useState<{subs: typeof submissions, map: typeof assignmentMap}>({subs: undefined, map: undefined})

  if (submissions !== prevDeps.subs || assignmentMap !== prevDeps.map) {
    setPrevDeps({subs: submissions, map: assignmentMap})
    if (submissions && assignmentMap) {
      const initial: Record<string, string> = {}
      for (const sub of submissions) {
        initial[sub.id] = assignmentMap[sub.id] ?? ''
      }
      setAssignments(initial)
    }
  }

  const handleSave = async () => {
    const payload = Object.entries(assignments)
      .filter(([, judgeId]) => judgeId)
      .map(([submissionId, judgeId]) => ({ submissionId, judgeId }))
    await saveMutation.mutateAsync(payload)
    showToast({ message: 'Judge assignments saved', type: 'info' })
  }

  if (subsLoading || judgesLoading || mapLoading) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Judge Assignment</h2>
        <Button
          size="sm"
          onClick={() => void handleSave()}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Save assignments
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-surface-elevated">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Team
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Project
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Assigned judge
              </th>
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((row, i) => (
              <tr
                key={row.id}
                className={`border-t border-border ${i % 2 === 1 ? 'bg-surface-elevated/30' : ''}`}
              >
                <td className="px-4 py-3 text-text-primary">{row.teamName}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{row.title || '—'}</td>
                <td className="px-4 py-3">
                  <select
                    value={assignments[row.id] ?? ''}
                    onChange={(e) =>
                      setAssignments((prev) => ({ ...prev, [row.id]: e.target.value }))
                    }
                    className="w-full max-w-xs rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary"
                    aria-label={`Assign judge for ${row.teamName}`}
                  >
                    <option value="">Unassigned</option>
                    {(judges ?? []).map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
