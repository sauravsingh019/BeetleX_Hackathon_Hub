import { Check, Copy, Users } from 'lucide-react'
import { useState } from 'react'
import { Button, Card } from '@/components/ui'
import { getInitials } from '@/lib/initials'
import type { Team } from '@/types'

interface TeamOverviewCardProps {
  team: Team
  eventId: string
}

export function TeamOverviewCard({ team, eventId }: TeamOverviewCardProps) {
  const [copied, setCopied] = useState(false)

  const inviteLink = `${window.location.origin}/events/${eventId}/register?invite=${team.inviteCode}`

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <Card elevated className="h-full">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-text-secondary">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wide">Team Overview</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">{team.name}</h2>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => void copyInvite()}
          className="shrink-0 gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy invite link
            </>
          )}
        </Button>
      </div>

      <ul className="space-y-3" aria-label="Team members">
        {team.members.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent"
              aria-hidden="true"
            >
              {getInitials(member.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-text-primary">{member.name}</p>
              <p className="truncate text-sm text-text-secondary">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
