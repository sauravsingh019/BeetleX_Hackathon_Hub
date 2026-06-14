import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { UserRole } from '@/types'
import { useAuthStore } from '@/store/authStore'

const roles: { value: UserRole; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'participant', label: 'Participant' },
  { value: 'judge', label: 'Judge' },
  { value: 'organizer', label: 'Organizer' },
]

export function RoleSwitcher() {
  const role = useAuthStore((state) => state.role)
  const setRole = useAuthStore((state) => state.setRole)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = roles.find((r) => r.value === role)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
      >
        Demo role: <span className="text-text-primary">{current?.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-surface-elevated py-1 shadow-xl">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => {
                setRole(r.value)
                setOpen(false)
              }}
              className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-surface ${
                role === r.value ? 'text-accent' : 'text-text-secondary'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
