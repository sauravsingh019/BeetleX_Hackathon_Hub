import { Link } from 'react-router-dom'
import { Button, DataChip, Modal } from '@/components/ui'

interface DuplicateRegistrationModalProps {
  open: boolean
  registrationId: string
  onClose: () => void
}

export function DuplicateRegistrationModal({
  open,
  registrationId,
  onClose,
}: DuplicateRegistrationModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="You're already registered">
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          A registration already exists for this email on this event. Use your existing registration
          to access the team dashboard.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Registration ID:</span>
          <DataChip variant="accent">#{registrationId}</DataChip>
        </div>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Link to="/dashboard">
            <Button type="button" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}
