import type { HackathonEvent } from '@/types'

interface DescriptionSectionProps {
  event: HackathonEvent
}

export function DescriptionSection({ event }: DescriptionSectionProps) {
  return (
    <section aria-labelledby="description-heading">
      <h2 id="description-heading" className="text-xl font-semibold text-text-primary">
        About This Event
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">{event.description}</p>
    </section>
  )
}
