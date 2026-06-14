import { create } from 'zustand'
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
}

export const useNotificationStore = create<NotificationState>()(() => ({
  notifications: [],
}))
