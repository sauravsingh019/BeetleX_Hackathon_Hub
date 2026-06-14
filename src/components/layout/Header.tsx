import { Moon, Sun } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { DataChip } from '@/components/ui/DataChip'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { RoleSwitcher } from './RoleSwitcher'

const baseLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
]

const roleLinks = {
  participant: [{ to: '/dashboard', label: 'Dashboard' }],
  judge: [{ to: '/judge', label: 'Judge' }],
  organizer: [{ to: '/organizer', label: 'Organizer' }],
}

export function Header() {
  const { role } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  const navLinks = [
    ...baseLinks,
    ...(role !== 'public' ? roleLinks[role] : []),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-text-primary">
              Beetle<span className="text-accent">X</span>
            </span>
            <DataChip variant="live">HUB</DataChip>
          </NavLink>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-elevated text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-surface-elevated p-2 text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
