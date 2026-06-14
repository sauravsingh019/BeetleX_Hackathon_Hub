import { Bell, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNotificationStore } from '@/store/notificationStore'

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const notifications = useNotificationStore((state) => state.notifications)
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead)
  const clearAll = useNotificationStore((state) => state.clearAll)
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen && unreadCount > 0) {
      markAllAsRead()
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="relative rounded-lg border border-border bg-surface-elevated p-2 text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-surface-elevated shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h3 className="font-semibold text-text-primary">Notifications</h3>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-text-secondary hover:text-danger transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-text-secondary">
                No notifications yet.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map((notif) => (
                  <li 
                    key={notif.id}
                    className={`flex gap-3 px-4 py-3 transition-colors ${
                      notif.read ? 'bg-surface' : 'bg-surface-elevated'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {notif.priority === 'urgent' ? (
                        <div className="h-2 w-2 rounded-full bg-danger mt-1.5" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-accent mt-1.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {notif.title}
                      </p>
                      <p className="text-sm text-text-secondary mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-text-secondary mt-1 font-mono">
                        {formatRelativeTime(notif.timestamp)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
