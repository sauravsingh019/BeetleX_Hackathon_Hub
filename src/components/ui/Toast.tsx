import { X, AlertCircle, Info } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-20 right-4 z-[100] flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`flex min-w-[300px] max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${
            toast.type === 'urgent'
              ? 'border-danger/50 bg-danger/10'
              : 'border-border bg-surface-elevated'
          }`}
        >
          {toast.type === 'urgent' ? (
            <AlertCircle className="h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
          ) : (
            <Info className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          )}
          
          <div className="flex-1">
            {toast.title && (
              <p className="text-sm font-bold text-text-primary mb-1">{toast.title}</p>
            )}
            <p className="text-sm font-medium text-text-primary">{toast.message}</p>
            <p className="mt-0.5 font-mono text-xs text-text-secondary">
              {formatTime(toast.timestamp)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-text-secondary hover:text-text-primary"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
