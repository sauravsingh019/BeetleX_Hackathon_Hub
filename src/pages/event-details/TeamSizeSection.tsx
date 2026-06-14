import { DataChip } from '@/components/ui'
import type { HackathonEvent } from '@/types'

interface TeamSizeSectionProps {
  event: HackathonEvent
}

export function TeamSizeSection({ event }: TeamSizeSectionProps) {
  return (
    <section aria-labelledby="team-size-heading">
      <h2 id="team-size-heading" className="text-xl font-semibold text-text-primary">
        Team Size
      </h2>
      <p className="mt-4 text-text-secondary">
        Teams must have between{' '}
        <DataChip variant="accent">{event.teamSizeMin}</DataChip> and{' '}
        <DataChip variant="accent">{event.teamSizeMax}</DataChip> members.
      </p>
    </section>
  )
}
