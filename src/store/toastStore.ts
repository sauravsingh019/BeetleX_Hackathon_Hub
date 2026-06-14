import { create } from 'zustand'

export interface Toast {
  id: string
  title?: string
  message: string
  type?: 'info' | 'urgent'
  timestamp: string
}

interface ToastState {
  toasts: Toast[]
  showToast: (toastData: { message: string, title?: string, type?: 'info' | 'urgent' }) => void
  dismissToast: (id: string) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  showToast: ({ message, title, type = 'info' }) => {
    const toast: Toast = {
      id: `toast-${Date.now()}`,
      message,
      title,
      type,
      timestamp: new Date().toISOString(),
    }
    set((state) => ({ toasts: [...state.toasts, toast] }))
    
    if (type !== 'urgent') {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== toast.id) }))
      }, 6000)
    }
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
