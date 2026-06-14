import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import {
  EventDetails,
  EventListing,
  JudgeDashboard,
  Landing,
  OrganizerDashboard,
  ProjectSubmission,
  Registration,
  TeamDashboard,
} from '@/pages'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventListing />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/events/:eventId/register" element={<Registration />} />
          <Route path="/dashboard" element={<TeamDashboard />} />
          <Route path="/dashboard/submit" element={<ProjectSubmission />} />
          <Route path="/judge" element={<JudgeDashboard />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
