import { http, HttpResponse } from 'msw'
import type { JsonBodyType } from 'msw'
import type { Announcement, Score, Submission, Team } from '@/types'
import {
  announcements,
  events,
  judgeAssignments,
  leaderboard,
  organizerStats,
  registrations,
  scores,
  teams,
  type Registration,
} from './data'

const delay = () =>
  new Promise<void>((resolve) => {
    const ms = 300 + Math.random() * 300
    setTimeout(resolve, ms)
  })

function jsonResponse(data: JsonBodyType, status = 200) {
  return HttpResponse.json(data, { status })
}

export const handlers = [
  http.get('/api/events', async () => {
    await delay()
    return jsonResponse(events)
  }),

  http.get('/api/events/:id', async ({ params }) => {
    await delay()
    const event = events.find((e) => e.id === params.id)
    if (!event) {
      return jsonResponse({ message: 'Event not found' }, 404)
    }
    return jsonResponse(event)
  }),

  http.get('/api/events/:id/leaderboard', async ({ params }) => {
    await delay()
    const event = events.find((e) => e.id === params.id)
    if (!event) {
      return jsonResponse({ message: 'Event not found' }, 404)
    }
    return jsonResponse(event.id === 'BTLX-2026-00481' ? leaderboard : [])
  }),

  http.post('/api/registrations', async ({ request }) => {
    await delay()
    const body = (await request.json()) as Omit<Registration, 'id' | 'createdAt'>
    const exists = registrations.some(
      (r) => r.email === body.email && r.eventId === body.eventId,
    )
    if (exists) {
      return jsonResponse({ message: 'Registration already exists for this email and event' }, 409)
    }
    const registration: Registration = {
      ...body,
      id: `reg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    registrations.push(registration)
    return jsonResponse(registration, 201)
  }),

  http.get('/api/registrations/check', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const email = url.searchParams.get('email') ?? ''
    const eventId = url.searchParams.get('eventId') ?? ''
    const exists = registrations.some((r) => r.email === email && r.eventId === eventId)
    return jsonResponse({ exists })
  }),

  http.get('/api/teams/:id', async ({ params }) => {
    await delay()
    const team = teams.find((t) => t.id === params.id)
    if (!team) {
      return jsonResponse({ message: 'Team not found' }, 404)
    }
    return jsonResponse(team)
  }),

  http.post('/api/teams', async ({ request }) => {
    await delay()
    const body = (await request.json()) as {
      name: string
      eventId: string
      trackId: string
      leader: { name: string; email: string; college: string }
    }
    const team: Team = {
      id: `team-${Date.now()}`,
      name: body.name,
      eventId: body.eventId,
      trackId: body.trackId,
      inviteCode: `INV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      members: [
        {
          id: `mem-${Date.now()}`,
          name: body.leader.name,
          email: body.leader.email,
          role: 'Team Lead',
          college: body.leader.college,
        },
      ],
      submission: null,
    }
    teams.push(team)
    return jsonResponse(team, 201)
  }),

  http.post('/api/teams/join', async ({ request }) => {
    await delay()
    const body = (await request.json()) as {
      inviteCode: string
      member: { name: string; email: string; college: string; role: string }
    }
    const team = teams.find((t) => t.inviteCode === body.inviteCode)
    if (!team) {
      return jsonResponse({ message: 'Invalid invite code' }, 404)
    }
    team.members.push({
      id: `mem-${Date.now()}`,
      ...body.member,
    })
    return jsonResponse(team)
  }),

  http.get('/api/announcements', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const eventId = url.searchParams.get('eventId') ?? ''
    const filtered = announcements.filter((a) => a.eventId === eventId)
    return jsonResponse(filtered)
  }),

  http.post('/api/announcements', async ({ request }) => {
    await delay()
    const body = (await request.json()) as Omit<Announcement, 'id' | 'createdAt'>
    const announcement: Announcement = {
      ...body,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    announcements.push(announcement)
    return jsonResponse(announcement, 201)
  }),

  http.post('/api/submissions', async ({ request }) => {
    await delay()
    const body = (await request.json()) as Omit<
      Submission,
      'id' | 'status' | 'updatedAt' | 'submittedAt'
    > & { status?: Submission['status'] }
    const submission: Submission = {
      ...body,
      id: `sub-${Date.now()}`,
      status: body.status ?? 'draft',
      updatedAt: new Date().toISOString(),
      submittedAt: body.status === 'submitted' ? new Date().toISOString() : undefined,
    }
    const team = teams.find((t) => t.id === body.teamId)
    if (team) {
      team.submission = submission
    }
    return jsonResponse(submission, 201)
  }),

  http.put('/api/submissions/:id', async ({ params, request }) => {
    await delay()
    const body = (await request.json()) as Partial<Submission>
    const team = teams.find((t) => t.submission?.id === params.id)
    if (!team?.submission) {
      return jsonResponse({ message: 'Submission not found' }, 404)
    }
    const updated: Submission = {
      ...team.submission,
      ...body,
      id: team.submission.id,
      teamId: team.submission.teamId,
      updatedAt: new Date().toISOString(),
      submittedAt:
        body.status === 'submitted'
          ? new Date().toISOString()
          : team.submission.submittedAt,
    }
    team.submission = updated
    return jsonResponse(updated)
  }),

  http.get('/api/judge/assignments', async () => {
    await delay()
    return jsonResponse(judgeAssignments)
  }),

  http.post('/api/scores', async ({ request }) => {
    await delay()
    const body = (await request.json()) as Omit<Score, 'id' | 'submittedAt'>
    const score: Score = {
      ...body,
      id: `score-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    }
    scores.push(score)
    const assignment = judgeAssignments.find((a) => a.submissionId === body.submissionId)
    if (assignment) {
      assignment.status = 'reviewed'
    }
    return jsonResponse(score, 201)
  }),

  http.get('/api/organizer/stats', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const eventId = url.searchParams.get('eventId') ?? ''
    if (eventId !== organizerStats.eventId) {
      return jsonResponse({
        eventId,
        totalRegistrations: 0,
        totalTeams: 0,
        submissionsDraft: 0,
        submissionsSubmitted: 0,
        announcementsCount: 0,
      })
    }
    return jsonResponse(organizerStats)
  }),

  http.get('/api/organizer/registrations', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const eventId = url.searchParams.get('eventId') ?? ''
    const filtered = registrations.filter((r) => r.eventId === eventId)
    return jsonResponse(filtered)
  }),
]
