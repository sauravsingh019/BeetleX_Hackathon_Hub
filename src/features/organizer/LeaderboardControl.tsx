import { Trophy } from 'lucide-react'
import { Button, Card, DataChip } from '@/components/ui'
import { useLeaderboardStore } from '@/store/leaderboardStore'

export function LeaderboardControl() {
  const { resultsPublished, setResultsPublished } = useLeaderboardStore()

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text-primary">Leaderboard Control</h2>
      <Card elevated>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
            <div>
              <p className="font-medium text-text-primary">Results visibility</p>
              <p className="text-sm text-text-secondary">
                {resultsPublished
                  ? 'Rankings are visible on team dashboards.'
                  : 'Team dashboards show "Results not yet published".'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DataChip variant={resultsPublished ? 'success' : 'warning'}>
              {resultsPublished ? 'PUBLISHED' : 'UNPUBLISHED'}
            </DataChip>
            <Button
              variant={resultsPublished ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => setResultsPublished(!resultsPublished)}
            >
              {resultsPublished ? 'Unpublish results' : 'Publish results'}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
