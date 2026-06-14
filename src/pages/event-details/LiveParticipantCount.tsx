import { Users } from 'lucide-react'
import { DataChip } from '@/components/ui'
import { useLiveParticipantCount } from './useLiveParticipantCount'

interface LiveParticipantCountProps {
  baseCount: number
}

export function LiveParticipantCount({ baseCount }: LiveParticipantCountProps) {
  const count = useLiveParticipantCount(baseCount)

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
      <Users className="h-5 w-5 text-accent-live" aria-hidden="true" />
      <div>
        <p className="text-sm text-text-secondary">Participants registered</p>
        <p className="mt-1">
          <DataChip variant="live">{count.toLocaleString()}</DataChip>
        </p>
      </div>
    </div>
  )
}
