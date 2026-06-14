import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Badge, Button, Card, Input, Select, Textarea } from '@/components/ui'
import type { Announcement, NotificationPriority } from '@/types'
import { useCreateAnnouncement } from '@/lib/api/hooks/useOrganizer'
import { useToastStore } from '@/store/toastStore'

interface AnnouncementBroadcastProps {
  eventId: string
  recent: Announcement[]
}

const priorityOptions = [
  { value: 'info', label: 'Info' },
  { value: 'urgent', label: 'Urgent' },
]

export function AnnouncementBroadcast({ eventId, recent }: AnnouncementBroadcastProps) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState<NotificationPriority>('info')
  const [sent, setSent] = useState(false)

  const createMutation = useCreateAnnouncement()
  const showToast = useToastStore((s) => s.showToast)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    await createMutation.mutateAsync({ eventId, title, message, priority })
    setTitle('')
    setMessage('')
    setSent(true)
    showToast({ message: 'Announcement sent to all participants', type: 'info' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text-primary">Announcement Broadcast</h2>

      <Card elevated>
        <form onSubmit={(e) => void handleSend(e)} className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={priority}
            onChange={(e) => setPriority(e.target.value as NotificationPriority)}
          />
          <Button type="submit" disabled={createMutation.isPending || !title || !message}>
            {createMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            Send to all participants
          </Button>
          {sent && (
            <p role="status" className="text-sm text-success">
              Announcement sent successfully.
            </p>
          )}
        </form>
      </Card>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-secondary">
          Recent Announcements
        </h3>
        <ul className="space-y-2">
          {recent.slice(0, 5).map((ann) => (
            <li
              key={ann.id}
              className="rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-text-primary">{ann.title}</span>
                <Badge variant={ann.priority === 'urgent' ? 'danger' : 'default'}>
                  {ann.priority === 'urgent' ? 'Urgent' : 'Info'}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{ann.message}</p>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                {new Date(ann.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="text-sm text-text-secondary">No announcements yet.</li>
          )}
        </ul>
      </div>
    </section>
  )
}
