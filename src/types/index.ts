export type EventStatus = 'upcoming' | 'active' | 'closed'
export type UserRole = 'public' | 'participant' | 'judge' | 'organizer'
export type SubmissionStatus = 'not_started' | 'draft' | 'submitted'
export type NotificationPriority = 'info' | 'urgent'

export interface Track {
  id: string
  name: string
  description: string
}

export interface Prize {
  trackId: string
  place: 1 | 2 | 3
  amount: string
  description?: string
}

export interface Sponsor {
  id: string
  name: string
  tier: 'title' | 'gold' | 'silver' | 'community'
  logoUrl?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface HackathonEvent {
  id: string
  name: string
  tagline: string
  description: string
  status: EventStatus
  startDate: string
  endDate: string
  registrationDeadline: string
  submissionDeadline: string
  rules: string
  eligibility: string
  teamSizeMin: number
  teamSizeMax: number
  participantCount: number
  tracks: Track[]
  prizes: Prize[]
  sponsors: Sponsor[]
  faqs: FAQ[]
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  college: string
}

export interface Submission {
  id: string
  teamId: string
  title: string
  description: string
  techStack: string[]
  demoLink: string
  repoLink: string
  pitchDeckName?: string
  videoLink?: string
  status: SubmissionStatus
  updatedAt: string
  submittedAt?: string
}

export interface Team {
  id: string
  name: string
  eventId: string
  trackId: string
  inviteCode: string
  members: TeamMember[]
  submission: Submission | null
}

export interface LeaderboardEntry {
  teamId: string
  teamName: string
  totalScore: number
  rank: number
  previousRank: number
}

export interface Announcement {
  id: string
  eventId: string
  title: string
  message: string
  priority: NotificationPriority
  createdAt: string
}

export interface Score {
  id: string
  judgeId: string
  submissionId: string
  innovation: number
  technical: number
  impact: number
  presentation: number
  comments: string
  submittedAt: string
}

export interface JudgeAssignment {
  submissionId: string
  projectTitle: string
  teamName: string
  status: 'pending' | 'reviewed'
}
