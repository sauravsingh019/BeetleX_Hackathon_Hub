import { AlertCircle, Info, RefreshCw } from 'lucide-react'
import { Button, Card, Skeleton } from '@/components/ui'
import { formatDateTime } from '@/lib/format'
import type { Announcement } from '@/types'

interface AnnouncementsFeedProps {
  announcements: Announcement[] | undefined
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  onRefresh: () => void
}

export function AnnouncementsFeed({
  announcements,
  isLoading,
  isFetching,
  isError,
  onRefresh,
}: AnnouncementsFeedProps) {
  const sorted = [...(announcements ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <Card elevated className="h-full">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-text-primary">Announcements</h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isFetching}
          className="gap-1.5"
          aria-label="Refresh announcements"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {isError && (
        <div role="alert" className="flex items-center gap-2 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Failed to load announcements.
        </div>
      )}

      {!isLoading && !isError && sorted.length === 0 && (
        <p className="text-sm text-text-secondary">No announcements yet.</p>
      )}

      {!isLoading && !isError && sorted.length > 0 && (
        <ul className="space-y-3" aria-label="Event announcements">
          {sorted.map((item) => (
            <li
              key={item.id}
              className={`rounded-lg border px-4 py-3 ${
                item.priority === 'urgent'
                  ? 'border-warning/40 bg-warning/10'
                  : 'border-border bg-surface-elevated/50'
              }`}
            >
              <div className="mb-1 flex items-start gap-2">
                {item.priority === 'urgent' ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                ) : (
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-live" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">{item.message}</p>
                  <time
                    className="mt-2 block font-mono text-xs text-text-secondary"
                    dateTime={item.createdAt}
                  >
                    {formatDateTime(item.createdAt)}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
