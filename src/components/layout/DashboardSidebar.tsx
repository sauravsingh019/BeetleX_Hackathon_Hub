import { Gavel, LayoutDashboard, Megaphone, Send } from 'lucide-react'
import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import type { UserRole } from '@/types'

interface SidebarLink {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
  roles: UserRole[]
}

const sidebarLinks: SidebarLink[] = [
  {
    to: '/dashboard',
    label: 'Team Dashboard',
    icon: LayoutDashboard,
    roles: ['participant'],
  },
  {
    to: '/dashboard/submit',
    label: 'Submit Project',
    icon: Send,
    roles: ['participant'],
  },
  {
    to: '/judge',
    label: 'Judge Portal',
    icon: Gavel,
    roles: ['judge'],
  },
  {
    to: '/organizer',
    label: 'Organizer Console',
    icon: Megaphone,
    roles: ['organizer'],
  },
]

interface DashboardSidebarProps {
  role: UserRole
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const links = sidebarLinks.filter((l) => l.roles.includes(role))

  if (links.length === 0) return null

  return (
    <aside className="w-full shrink-0 border-b border-border bg-surface md:w-56 md:border-b-0 md:border-r">
      <nav className="flex flex-row gap-1 overflow-x-auto p-3 md:flex-col md:overflow-x-visible">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
