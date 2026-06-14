import { RefreshCw, Users, UsersRound, FileCheck, Gavel } from 'lucide-react'
import type { ComponentType } from 'react'
import { Button, Card, DataChip, Skeleton } from '@/components/ui'
import type { OrganizerStats } from '@/lib/api/organizer'

interface StatsCardsProps {
  stats: OrganizerStats | undefined
  isLoading: boolean
  isFetching: boolean
  onRefresh: () => void
}

interface StatDef {
  label: string
  icon: ComponentType<{ className?: string }>
  getValue: (s: OrganizerStats) => number
}

const STAT_DEFS: StatDef[] = [
  { label: 'Total Registrations', icon: Users, getValue: (s) => s.totalRegistrations },
  { label: 'Teams Formed', icon: UsersRound, getValue: (s) => s.totalTeams },
  {
    label: 'Submissions Received',
    icon: FileCheck,
    getValue: (s) => s.submissionsDraft + s.submissionsSubmitted,
  },
  { label: 'Active Judges', icon: Gavel, getValue: (s) => s.activeJudges },
]

export function StatsCards({ stats, isLoading, isFetching, onRefresh }: StatsCardsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Live Event Stats</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={isFetching}
          aria-label="Refresh stats"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_DEFS.map(({ label, icon: Icon, getValue }) => (
          <Card key={label} elevated className="border-accent-live/20">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Icon className="h-4 w-4 text-accent-live" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
                </div>
                <p className="mt-2">
                  <DataChip variant="live">{stats ? getValue(stats).toLocaleString() : '—'}</DataChip>
                </p>
              </>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
