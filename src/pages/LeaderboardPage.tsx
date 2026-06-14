import { AlertCircle, ArrowLeft, Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState, memo } from 'react'
import { Button, Card, DataChip, Skeleton } from '@/components/ui'
import { ApiError } from '@/lib/api'
import { useEvent, useLeaderboard } from '@/lib/api/hooks'
import type { LeaderboardEntry } from '@/types'

type LiveEntry = LeaderboardEntry & { prevRank?: number }

function useFLIP<T>(list: T[]) {
  const containerRef = useRef<HTMLOListElement>(null)
  const prevRects = useRef<Map<string, DOMRect>>(new Map())

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const currentRects = new Map<string, DOMRect>()
    const children = Array.from(container.children) as HTMLElement[]

    children.forEach((child) => {
      const key = child.dataset.key
      if (key) currentRects.set(key, child.getBoundingClientRect())
    })

    children.forEach((child) => {
      const key = child.dataset.key
      if (!key) return
      const prev = prevRects.current.get(key)
      const current = currentRects.get(key)

      if (prev && current) {
        const dy = prev.top - current.top
        if (dy !== 0) {
          child.style.transform = `translateY(${dy}px)`
          child.style.transition = 'none'

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              child.style.transform = ''
              child.style.transition = 'transform 400ms ease-in-out'
            })
          })
        }
      }
    })

    prevRects.current = currentRects
  }, [list])

  return containerRef
}

export function LeaderboardPage() {
  const { eventId = '' } = useParams()
  const { data: event, isLoading: eventLoading, isError: eventError, error } = useEvent(eventId)
  const { data: entries, isLoading: boardLoading } = useLeaderboard(eventId)
  
  const [liveEntries, setLiveEntries] = useState<LiveEntry[]>([])
  const [prevEntries, setPrevEntries] = useState<LeaderboardEntry[] | undefined>(undefined)
  const listRef = useFLIP<LiveEntry>(liveEntries)

  if (entries !== prevEntries) {
    setPrevEntries(entries)
    if (entries) {
      setLiveEntries([...entries].sort((a, b) => a.rank - b.rank))
    }
  }

  useEffect(() => {
    if (liveEntries.length === 0) return

    const scheduleNext = () => {
      const delay = Math.random() * 2000 + 4000 // 4-6s
      timerId = setTimeout(() => {
        setLiveEntries((prev) => {
          const numToUpdate = Math.random() > 0.5 ? 2 : 1
          const next = [...prev]
          
          for (let i = 0; i < numToUpdate; i++) {
            const idx = Math.floor(Math.random() * next.length)
            const boost = Math.random() * 1.5 + 0.5
            next[idx] = { ...next[idx], totalScore: next[idx].totalScore + boost }
          }
          
          const sorted = [...next].sort((a, b) => b.totalScore - a.totalScore)
          return sorted.map((entry, index) => {
            const prevEntry = prev.find((p) => p.teamId === entry.teamId)
            const newRank = index + 1
            return {
              ...entry,
              rank: newRank,
              prevRank: prevEntry ? prevEntry.rank : newRank
            }
          })
        })
        scheduleNext()
      }, delay)
    }

    let timerId = setTimeout(scheduleNext, Math.random() * 2000 + 4000)
    return () => clearTimeout(timerId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveEntries.length > 0])

  const isNotFound = eventError && error instanceof ApiError && error.status === 404

  if (eventLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isNotFound) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <AlertCircle className="h-10 w-10 text-text-secondary" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-text-primary">Event not found</h1>
        <Link to="/events" className="mt-6">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>
    )
  }

  if (eventError || !event) {
    return (
      <div role="alert" className="flex flex-col items-center py-20 text-center">
        <AlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-text-primary">Failed to load leaderboard</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <header className="mb-6 flex items-center gap-3">
        <Trophy className="h-7 w-7 text-warning" aria-hidden="true" />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Leaderboard</h1>
          <p className="text-sm text-text-secondary">{event.name}</p>
        </div>
      </header>

      <Card elevated>
        {boardLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}

        {!boardLoading && liveEntries.length === 0 && (
          <p className="text-sm text-text-secondary">No leaderboard entries yet.</p>
        )}

        {!boardLoading && liveEntries.length > 0 && (
          <ol ref={listRef} className="divide-y divide-border" aria-label="Full leaderboard">
            {liveEntries.map((entry) => (
              <LeaderboardRow key={entry.teamId} entry={entry} />
            ))}
          </ol>
        )}
      </Card>
    </div>
  )
}

const LeaderboardRow = memo(function LeaderboardRow({ entry }: { entry: LiveEntry }) {
  const prevRank = entry.prevRank ?? entry.rank
  const rankDelta = prevRank - entry.rank

  return (
    <li
      data-key={entry.teamId}
      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0 bg-surface"
    >
      <div className="flex min-w-0 items-center gap-3">
        <DataChip variant={entry.rank <= 3 ? 'warning' : 'default'}>
          #{entry.rank}
        </DataChip>
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-text-primary">
            {entry.teamName}
          </span>
          {rankDelta > 0 && (
            <div className="flex items-center text-xs text-success" aria-label={`Moved up ${rankDelta} places`}>
              <ArrowUp className="h-3 w-3" />
              <span>{rankDelta}</span>
            </div>
          )}
          {rankDelta < 0 && (
            <div className="flex items-center text-xs text-danger" aria-label={`Moved down ${Math.abs(rankDelta)} places`}>
              <ArrowDown className="h-3 w-3" />
              <span>{Math.abs(rankDelta)}</span>
            </div>
          )}
          {rankDelta === 0 && (
            <div className="flex items-center text-xs text-text-secondary" aria-label="Rank unchanged">
              <Minus className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>
      <span className="shrink-0 font-mono text-sm text-text-secondary">
        {entry.totalScore.toFixed(1)} pts
      </span>
    </li>
  )
})
