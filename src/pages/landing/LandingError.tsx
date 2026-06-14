import { AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export function LandingError() {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <AlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
      <h1 className="mt-4 text-2xl font-bold text-text-primary">Unable to load featured event</h1>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        We could not fetch event data right now. Please try again or browse all events.
      </p>
      <Link to="/events" className="mt-6">
        <Button variant="secondary">Browse Events</Button>
      </Link>
    </div>
  )
}
