import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import type { HackathonEvent } from '@/types'

interface HeroSectionProps {
  event: HackathonEvent
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

import type { Variants } from 'framer-motion'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
}

export function HeroSection({ event }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mx-4 overflow-hidden rounded-2xl px-4 py-16 sm:-mx-6 sm:px-8 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 10%, rgba(108,99,255,0.15) 0%, transparent 60%),
                       radial-gradient(ellipse 40% 40% at 80% 80%, rgba(34,211,238,0.08) 0%, transparent 50%)`
        }}
        aria-hidden="true"
      />

      <motion.div 
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border2)] bg-[rgba(108,99,255,0.08)] px-4 py-1.5 text-[13px] font-medium text-accent2">
            <motion.span 
              className="h-1.5 w-1.5 rounded-full bg-success"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {event.status === 'active' ? 'Applications Open — Register Now' : event.status.toUpperCase()}
          </div>
        </motion.div>
        
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.1] tracking-[-2px] text-text-primary"
        >
          Build What <span className="bg-gradient-to-br from-accent to-accent-live bg-clip-text text-transparent">Matters.</span><br />
          Win What Counts.
        </motion.h1>
        
        <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-[560px] text-[1.15rem] text-text-secondary">
          {event.name} — 72 hours, $50,000 in prizes, and a chance to ship something that changes how developers work.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10 mb-10 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary text-text3">Registration Opens</div>
            <div className="text-[15px] font-semibold text-text-primary">July 1, 2025</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary text-text3">Hackathon Begins</div>
            <div className="text-[15px] font-semibold text-text-primary">Aug 15, 2025</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary text-text3">Submission Deadline</div>
            <div className="text-[15px] font-semibold text-text-primary">Aug 18, 2025</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary text-text3">Winners Announced</div>
            <div className="text-[15px] font-semibold text-text-primary">Aug 22, 2025</div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          <Link
            to={`/events/${event.id}/register`}
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Button size="lg" className="px-7 py-3 text-[15px] group gap-2 overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                Register Free →
              </span>
            </Button>
          </Link>
          <Link
            to="/events"
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Button size="lg" variant="secondary" className="px-7 py-3 text-[15px]">
              Browse All Events
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
