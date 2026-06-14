import type { HackathonEvent } from '@/types'

interface RulesSectionProps {
  event: HackathonEvent
}

export function RulesSection({ event }: RulesSectionProps) {
  return (
    <section aria-labelledby="rules-heading">
      <h2 id="rules-heading" className="text-xl font-semibold text-text-primary">
        Rules & Eligibility
      </h2>
      <div className="mt-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Rules
          </h3>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-text-secondary">
            {event.rules}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Eligibility
          </h3>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-text-secondary">
            {event.eligibility}
          </p>
        </div>
      </div>
    </section>
  )
}
