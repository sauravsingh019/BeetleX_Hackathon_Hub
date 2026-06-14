import { ArrowRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, DataChip, Skeleton } from '@/components/ui'
import { useLeaderboardStore } from '@/store/leaderboardStore'
import type { LeaderboardEntry } from '@/types'

interface LeaderboardWidgetProps {
  eventId: string
  teamId: string
  entries: LeaderboardEntry[] | undefined
  isLoading: boolean
}

export function LeaderboardWidget({
  eventId,
  teamId,
  entries,
  isLoading,
}: LeaderboardWidgetProps) {
  const resultsPublished = useLeaderboardStore((s) => s.resultsPublished)
  const sorted = [...(entries ?? [])].sort((a, b) => a.rank - b.rank)
  const topThree = sorted.slice(0, 3)
  const myEntry = sorted.find((e) => e.teamId === teamId)

  return (
    <Card elevated className="h-full">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-text-primary">Live Leaderboard</h2>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!isLoading && !resultsPublished && (
        <p className="mb-4 rounded-lg border border-border bg-surface-elevated/50 px-4 py-6 text-center text-sm text-text-secondary">
          Results not yet published
        </p>
      )}

      {!isLoading && resultsPublished && myEntry && (
        <div className="mb-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Your team
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-text-primary">{myEntry.teamName}</span>
            <DataChip variant="accent">Rank #{myEntry.rank}</DataChip>
            <DataChip variant="live">{myEntry.totalScore.toFixed(1)} pts</DataChip>
          </div>
        </div>
      )}

      {!isLoading && resultsPublished && !myEntry && entries && entries.length > 0 && (
        <p className="mb-4 text-sm text-text-secondary">
          Your team is not yet ranked. Keep building!
        </p>
      )}

      {!isLoading && resultsPublished && topThree.length > 0 && (
        <ol className="mb-4 space-y-2" aria-label="Top 3 teams">
          {topThree.map((entry) => (
            <li
              key={entry.teamId}
              className="flex items-center justify-between rounded-lg bg-surface-elevated/50 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <DataChip variant={entry.rank === 1 ? 'warning' : 'default'}>#{entry.rank}</DataChip>
                <span className="text-sm font-medium text-text-primary">{entry.teamName}</span>
              </div>
              <span className="font-mono text-sm text-text-secondary">
                {entry.totalScore.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
      )}

      {!isLoading && resultsPublished && (!entries || entries.length === 0) && (
        <p className="mb-4 text-sm text-text-secondary">Leaderboard data is not available yet.</p>
      )}

      <Link
        to={`/events/${eventId}/leaderboard`}
        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        View full leaderboard
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </Card>
  )
}
