import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { formatDateRange } from '@/lib/format'
import type { EventStatus, HackathonEvent } from '@/types'


interface EventCardProps {
  event: HackathonEvent
}

export const EventCard = memo(function EventCard({ event }: EventCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, var(--color-accent-live) 0%, transparent 80%)`

  const borderTopMap: Record<EventStatus, string> = {
    active: 'border-t-2 border-t-[var(--green)]',
    upcoming: 'border-t-2 border-t-[var(--accent)]',
    closed: 'border-t-2 border-t-[var(--text-sec)] opacity-60',
  }
  
  const badgeMap: Record<EventStatus, string> = {
    active: 'bg-[rgba(0,255,136,0.1)] text-[var(--green)]',
    upcoming: 'bg-[rgba(0,229,255,0.1)] text-[var(--accent)]',
    closed: 'bg-[rgba(255,255,255,0.05)] text-[var(--text-sec)]',
  }
  
  const dotMap: Record<EventStatus, string> = {
    active: 'bg-[var(--green)] animate-pulse',
    upcoming: 'bg-[var(--accent)]',
    closed: 'bg-[var(--text-sec)]',
  }

  return (
    <Link to={`/events/${event.id}`} className="block h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--border2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${borderTopMap[event.status]}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
          style={{ background }}
        />
        
        <div className={`mb-4 inline-flex items-center gap-1.5 w-fit rounded-[20px] px-[10px] py-[4px] text-[12px] font-semibold uppercase tracking-[1px] ${badgeMap[event.status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dotMap[event.status]}`}></span>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </div>
        
        <h3 className="text-[20px] font-semibold text-[var(--text)] mb-4">{event.name}</h3>
        <p className="text-[14px] leading-[1.5] text-[var(--text-sec)] flex-1 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex flex-col gap-2 border-y border-[var(--border)] py-4 font-mono text-[13px] text-[var(--text-sec)] mb-2">
          <span className="flex items-center gap-2">📅 {formatDateRange(event.startDate, event.endDate)}</span>
          <span className="flex items-center gap-2">👥 {event.participantCount.toLocaleString()} registered</span>
          <span className="flex items-center gap-2">🌍 Global + Remote</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-[18px] font-bold text-[var(--accent)]">
            ${event.prizes.reduce((sum, prize) => sum + parseInt(prize.amount.replace(/\D/g, '') || '0'), 0).toLocaleString()}
          </div>
          <button className="rounded-[8px] bg-[var(--accent)] px-[14px] py-[6px] text-[12px] font-bold text-[#000] transition-colors hover:bg-[#00b3cc]">
            {event.status === 'closed' ? 'View Results →' : 'Register →'}
          </button>
        </div>
      </motion.div>
    </Link>
  )
})
