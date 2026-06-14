import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/types'

const Landing = lazy(() => import('@/pages').then(m => ({ default: m.Landing })))
const EventListing = lazy(() => import('@/pages').then(m => ({ default: m.EventListing })))
const EventDetails = lazy(() => import('@/pages').then(m => ({ default: m.EventDetails })))
const Registration = lazy(() => import('@/pages').then(m => ({ default: m.Registration })))
const LeaderboardPage = lazy(() => import('@/pages').then(m => ({ default: m.LeaderboardPage })))
const TeamDashboard = lazy(() => import('@/pages').then(m => ({ default: m.TeamDashboard })))
const ProjectSubmission = lazy(() => import('@/pages').then(m => ({ default: m.ProjectSubmission })))
const JudgeDashboard = lazy(() => import('@/pages').then(m => ({ default: m.JudgeDashboard })))
const JudgeReviewPage = lazy(() => import('@/pages').then(m => ({ default: m.JudgeReviewPage })))
const OrganizerDashboard = lazy(() => import('@/pages').then(m => ({ default: m.OrganizerDashboard })))
const ShowcaseGallery = lazy(() => import('@/pages').then(m => ({ default: m.ShowcaseGallery })))
const UserSettings = lazy(() => import('@/pages').then(m => ({ default: m.UserSettings })))

function Fallback() {
  return (
    <div style={{ display: 'flex', minHeight: '50vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', border: '4px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.2
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page active"
    >
      <Suspense fallback={<Fallback />}>{children}</Suspense>
    </motion.div>
  )
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: UserRole[] }) {
  const role = useAuthStore((state) => state.role)
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="/events" element={<PageWrapper><EventListing /></PageWrapper>} />
          <Route path="/events/:eventId" element={<PageWrapper><EventDetails /></PageWrapper>} />
          <Route path="/events/:eventId/register" element={<PageWrapper><Registration /></PageWrapper>} />
          <Route path="/events/:eventId/leaderboard" element={<PageWrapper><LeaderboardPage /></PageWrapper>} />
          <Route path="/showcase" element={<PageWrapper><ShowcaseGallery /></PageWrapper>} />
          
          {/* Participant Routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['participant']}><PageWrapper><TeamDashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/dashboard/submit" element={<ProtectedRoute allowedRoles={['participant']}><PageWrapper><ProjectSubmission /></PageWrapper></ProtectedRoute>} />
          
          {/* Settings Route (Any logged in user) */}
          <Route path="/settings" element={<ProtectedRoute allowedRoles={['participant', 'judge', 'organizer']}><PageWrapper><UserSettings /></PageWrapper></ProtectedRoute>} />
          
          {/* Judge Routes */}
          <Route path="/judge" element={<ProtectedRoute allowedRoles={['judge']}><PageWrapper><JudgeDashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/judge/review/:submissionId" element={<ProtectedRoute allowedRoles={['judge']}><PageWrapper><JudgeReviewPage /></PageWrapper></ProtectedRoute>} />
          
          {/* Organizer Routes */}
          <Route path="/organizer" element={<ProtectedRoute allowedRoles={['organizer']}><PageWrapper><OrganizerDashboard /></PageWrapper></ProtectedRoute>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
