import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from '@/components/ui/Toast'
import { Header } from './Header'
import { Footer } from './Footer'
import { QuantumCanvas } from '@/components/ui/QuantumCanvas'
import { MagneticCursor } from '@/components/ui/MagneticCursor'

interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <MagneticCursor />
      <QuantumCanvas />
      <Header />
      <main id="main-content" style={{ paddingTop: '90px', minHeight: '100vh' }}>
        {children ?? <Outlet />}
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}
