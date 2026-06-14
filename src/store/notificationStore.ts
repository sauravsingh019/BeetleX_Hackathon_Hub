import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NotificationPriority } from '@/types'

export interface AppNotification {
  id: string
  title: string
  message: string
  priority: NotificationPriority
  timestamp: string
  read: boolean
}

interface NotificationState {
  notifications: AppNotification[]
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notif) => set((state) => ({
        notifications: [
          {
            ...notif,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString(),
            read: false
          },
          ...state.notifications
        ]
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      clearAll: () => set({ notifications: [] })
    }),
    {
      name: 'beetlex-notifications'
    }
  )
)
