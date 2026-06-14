import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { DashboardSidebar } from './DashboardSidebar'
import { Footer } from './Footer'
import { Header } from './Header'

const sidebarRoutes = ['/dashboard', '/judge', '/organizer']

interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { role } = useAuthStore()
  const { pathname } = useLocation()
  const showSidebar = sidebarRoutes.some((route) => pathname.startsWith(route))

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        {showSidebar && <DashboardSidebar role={role} />}
        <main className="flex-1 px-4 py-8 sm:px-6">{children ?? <Outlet />}</main>
      </div>
      <Footer />
    </div>
  )
}
