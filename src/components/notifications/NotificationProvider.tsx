import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'
import { useToastStore } from '@/store/toastStore'
import { useAuthStore } from '@/store/authStore'

const MOCK_MESSAGES = [
  { title: 'New submission', message: 'A team has submitted their project.', priority: 'info' },
  { title: 'Pizza is here!', message: 'Grab some food at the main stage.', priority: 'info' },
  { title: 'Workshop starting', message: 'The AI Agents workshop starts in 5 minutes.', priority: 'info' },
  { title: 'Judging phase active', message: 'All submissions are locked and judging has begun.', priority: 'urgent' },
  { title: 'Emergency update', message: 'Wi-Fi maintenance in 10 mins. Please save work.', priority: 'urgent' },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const notifications = useNotificationStore((state) => state.notifications)
  const markAsRead = useNotificationStore((state) => state.markAsRead)
  const addToast = useToastStore((state) => state.showToast)
  const role = useAuthStore((state) => state.role)
  const { pathname } = useLocation()

  // Mock interval
  useEffect(() => {
    if (role === 'public') return

    const scheduleNext = () => {
      const delay = Math.random() * 10000 + 15000 // 15-25s
      timerId = setTimeout(() => {
        const msg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)]
        addNotification({ ...msg, priority: msg.priority as 'info' | 'urgent' })
        addToast({ title: msg.title, message: msg.message, type: msg.priority as 'info' | 'urgent' })
        scheduleNext()
      }, delay)
    }

    let timerId = setTimeout(scheduleNext, Math.random() * 10000 + 15000)
    return () => clearTimeout(timerId)
  }, [role, addNotification, addToast, pathname])

  // Page visibility API
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.read).length
    const handleVisibility = () => {
      if (document.hidden && unreadCount > 0) {
        document.title = `(${unreadCount}) BeetleX Hackathon Hub`
      } else {
        document.title = 'BeetleX Hackathon Hub'
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    handleVisibility()
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [notifications])

  const urgentNotif = notifications.find((n) => n.priority === 'urgent' && !n.read)

  return (
    <>
      {urgentNotif && (
        <div className="bg-danger/90 text-white px-4 py-3 flex items-center justify-between shadow-md relative z-50">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-bold text-sm">{urgentNotif.title}</p>
              <p className="text-sm">{urgentNotif.message}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => markAsRead(urgentNotif.id)}
            className="text-white/80 hover:text-white px-3 py-1 rounded border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </>
  )
}
