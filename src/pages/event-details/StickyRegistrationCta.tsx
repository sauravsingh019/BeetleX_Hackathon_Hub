import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card } from '@/components/ui'
import type { HackathonEvent } from '@/types'

interface StickyRegistrationCtaProps {
  event: HackathonEvent
  variant: 'sidebar' | 'mobile'
}

export function StickyRegistrationCta({ event, variant }: StickyRegistrationCtaProps) {
  const registerPath = `/events/${event.id}/register`

  if (variant === 'mobile') {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-4 backdrop-blur-sm lg:hidden">
        <Link
          to={registerPath}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Button size="lg" className="w-full gap-2">
            Register Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <Card elevated className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">Ready to compete?</h2>
      <p className="text-sm text-text-secondary">
        Join {event.name} and ship something developers actually use.
      </p>
      <Link
        to={registerPath}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Button size="lg" className="w-full gap-2">
          Register Now
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Link>
    </Card>
  )
}
