import { motion } from 'framer-motion'
import type { HackathonEvent } from '@/types'

interface SponsorsSectionProps {
  event: HackathonEvent
}

export function SponsorsSection({ event }: SponsorsSectionProps) {
  if (event.sponsors.length === 0) return null

  return (
    <motion.section 
      aria-labelledby="sponsors-heading" 
      className="py-20 mx-auto max-w-[1100px] text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <div className="text-[12px] uppercase tracking-[2px] text-accent font-semibold mb-3">Sponsors</div>
        <h2 id="sponsors-heading" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.5px] text-text-primary mb-8">
          Backed by Industry Leaders
        </h2>
      </motion.div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {event.sponsors.map((sponsor) => (
          <motion.div 
            key={sponsor.id}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="px-6 py-2.5 rounded-lg border border-border bg-surface text-text-secondary text-[13px] font-semibold tracking-[0.5px]"
          >
            {sponsor.name}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
