import { Accordion } from '@/components/ui'
import type { HackathonEvent } from '@/types'

interface FaqSectionProps {
  event: HackathonEvent
}

export function FaqSection({ event }: FaqSectionProps) {
  if (event.faqs.length === 0) return null

  const items = event.faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <section aria-labelledby="faq-heading" className="py-20 mx-auto max-w-[700px]">
      <div className="text-center mb-12">
        <div className="text-[12px] uppercase tracking-[2px] text-accent font-semibold mb-3">FAQ</div>
        <h2 id="faq-heading" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.5px] text-text-primary mb-3">
          Common Questions
        </h2>
      </div>
      <div className="mt-8">
        <Accordion items={items} />
      </div>
    </section>
  )
}
