import { Card, DataChip } from '@/components/ui'
import type { HackathonEvent, Prize } from '@/types'

const placeStyles: Record<1 | 2 | 3, { label: string; variant: 'accent' | 'live' | 'default' }> =
  {
    1: { label: '1st', variant: 'accent' },
    2: { label: '2nd', variant: 'live' },
    3: { label: '3rd', variant: 'default' },
  }

function TrackPrizeList({ trackName, prizes }: { trackName: string; prizes: Prize[] }) {
  const sorted = [...prizes].sort((a, b) => a.place - b.place)

  return (
    <Card className="space-y-3">
      <h3 className="font-semibold text-text-primary">{trackName}</h3>
      <ul className="space-y-2">
        {sorted.map((prize) => {
          const style = placeStyles[prize.place]
          return (
            <li key={prize.place} className="flex items-center justify-between gap-2 text-sm">
              <span className="text-text-secondary">{style.label} Place</span>
              <DataChip variant={style.variant}>{prize.amount}</DataChip>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

interface PrizesBreakdownSectionProps {
  event: HackathonEvent
}

export function PrizesBreakdownSection({ event }: PrizesBreakdownSectionProps) {
  return (
    <section aria-labelledby="prizes-heading">
      <h2 id="prizes-heading" className="text-xl font-semibold text-text-primary">
        Prize Breakdown
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {event.tracks.map((track) => (
          <TrackPrizeList
            key={track.id}
            trackName={track.name}
            prizes={event.prizes.filter((p) => p.trackId === track.id)}
          />
        ))}
      </div>
    </section>
  )
}
