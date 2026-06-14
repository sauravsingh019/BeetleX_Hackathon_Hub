import type {
  Announcement,
  HackathonEvent,
  JudgeAssignment,
  LeaderboardEntry,
  Score,
  Team,
} from '@/types'

export const AI_BUILDERS_EVENT_ID = 'BTLX-2026-00481'

const aiBuildersTracks = [
  {
    id: 'track-genai',
    name: 'Generative AI Tools',
    description:
      'Build production-ready tools that leverage LLMs, diffusion models, or multimodal AI to solve real developer workflows.',
  },
  {
    id: 'track-agentic',
    name: 'Agentic Workflows',
    description:
      'Design autonomous or semi-autonomous agent systems that plan, execute, and verify multi-step tasks.',
  },
  {
    id: 'track-web3ai',
    name: 'Web3 + AI',
    description:
      'Combine on-chain primitives with AI for verifiable inference, decentralized coordination, or trust-minimized automation.',
  },
]

const aiBuildersPrizes = [
  { trackId: 'track-genai', place: 1 as const, amount: '$8,000', description: 'Best Generative AI Tool' },
  { trackId: 'track-genai', place: 2 as const, amount: '$4,000' },
  { trackId: 'track-genai', place: 3 as const, amount: '$2,000' },
  { trackId: 'track-agentic', place: 1 as const, amount: '$8,000', description: 'Best Agentic Workflow' },
  { trackId: 'track-agentic', place: 2 as const, amount: '$4,000' },
  { trackId: 'track-agentic', place: 3 as const, amount: '$2,000' },
  { trackId: 'track-web3ai', place: 1 as const, amount: '$8,000', description: 'Best Web3 + AI Project' },
  { trackId: 'track-web3ai', place: 2 as const, amount: '$4,000' },
  { trackId: 'track-web3ai', place: 3 as const, amount: '$2,000' },
]

const aiBuildersSponsors = [
  { id: 'spn-neuralforge', name: 'NeuralForge Labs', tier: 'title' as const },
  { id: 'spn-cloudstack', name: 'CloudStack', tier: 'gold' as const },
  { id: 'spn-chainpulse', name: 'ChainPulse', tier: 'silver' as const },
  { id: 'spn-devguild', name: 'DevGuild Community', tier: 'community' as const },
]

const aiBuildersFaqs = [
  {
    id: 'faq-1',
    question: 'Who can participate?',
    answer:
      'Students, early-career developers, and independent builders worldwide. Teams must have at least one member enrolled in or graduated from an accredited institution within the last two years.',
  },
  {
    id: 'faq-2',
    question: 'Can I join multiple teams?',
    answer: 'No. Each participant may belong to only one team per event. Duplicate registrations are automatically rejected.',
  },
  {
    id: 'faq-3',
    question: 'What is the team size limit?',
    answer: 'Teams must have between 2 and 4 members. Solo submissions are not accepted for this event.',
  },
  {
    id: 'faq-4',
    question: 'Are pre-existing projects allowed?',
    answer:
      'Projects started before the event kickoff are not eligible. All substantive code and demos must be built during the hackathon window.',
  },
  {
    id: 'faq-5',
    question: 'How are projects judged?',
    answer:
      'Judges score on innovation, technical depth, impact, and presentation. Each submission receives independent reviews from at least two judges.',
  },
  {
    id: 'faq-6',
    question: 'What do I need to submit?',
    answer:
      'A public repository, live demo link, 3-minute pitch video, and a short written description including tech stack and problem statement.',
  },
]

export const events: HackathonEvent[] = [
  {
    id: 'BTLX-2026-00312',
    name: 'Quantum Code Sprint',
    tagline: '48 hours at the edge of compute',
    description:
      'Explore quantum-inspired algorithms and high-performance computing patterns in a fast-paced virtual sprint.',
    status: 'upcoming',
    startDate: '2026-07-10T09:00:00Z',
    endDate: '2026-07-12T18:00:00Z',
    registrationDeadline: '2026-07-08T23:59:00Z',
    submissionDeadline: '2026-07-12T17:00:00Z',
    rules: 'All code must be original and open-sourced under MIT license at submission time.',
    eligibility: 'Open to university students and recent graduates (within 24 months).',
    teamSizeMin: 2,
    teamSizeMax: 4,
    participantCount: 0,
    tracks: [{ id: 'track-quantum', name: 'Quantum Algorithms', description: 'Quantum and quantum-inspired solutions.' }],
    prizes: [{ trackId: 'track-quantum', place: 1, amount: '$5,000' }],
    sponsors: [{ id: 'spn-qbit', name: 'QBit Research', tier: 'title' }],
    faqs: [{ id: 'faq-q1', question: 'Is travel covered?', answer: 'This is a fully remote event.' }],
  },
  {
    id: 'BTLX-2026-00398',
    name: 'GreenTech Builders',
    tagline: 'Code for climate resilience',
    description:
      'Build software that helps communities monitor, adapt to, and mitigate climate-related challenges.',
    status: 'upcoming',
    startDate: '2026-08-01T09:00:00Z',
    endDate: '2026-08-03T18:00:00Z',
    registrationDeadline: '2026-07-28T23:59:00Z',
    submissionDeadline: '2026-08-03T17:00:00Z',
    rules: 'Projects must include a measurable environmental impact hypothesis.',
    eligibility: 'Open to all developers aged 18+ with a valid student or professional email.',
    teamSizeMin: 2,
    teamSizeMax: 5,
    participantCount: 142,
    tracks: [{ id: 'track-climate', name: 'Climate Tech', description: 'Sustainability and resilience tooling.' }],
    prizes: [
      { trackId: 'track-climate', place: 1, amount: '$6,000' },
      { trackId: 'track-climate', place: 2, amount: '$3,000' },
    ],
    sponsors: [{ id: 'spn-eco', name: 'EcoVentures', tier: 'gold' }],
    faqs: [{ id: 'faq-g1', question: 'Hardware projects allowed?', answer: 'Yes, with a working software component.' }],
  },
  {
    id: AI_BUILDERS_EVENT_ID,
    name: 'AI Builders League 2026',
    tagline: 'Ship intelligent systems that developers actually use',
    description:
      'A flagship BeetleX hackathon focused on generative AI, agentic workflows, and Web3+AI intersections. Teams compete across three tracks with dedicated prize pools, mentor office hours, and live judging.',
    status: 'active',
    startDate: '2026-06-01T09:00:00Z',
    endDate: '2026-06-14T18:00:00Z',
    registrationDeadline: '2026-05-28T23:59:00Z',
    submissionDeadline: '2026-06-14T17:00:00Z',
    rules:
      'All submissions must include a public GitHub repository created during the event window, a deployed demo accessible without local setup, and a pitch video under four minutes. Third-party API keys must be documented in the README. Plagiarism or misrepresentation results in immediate disqualification. Organizers reserve the right to verify commit history and demo authenticity.',
    eligibility:
      'Participants must be 18 or older. At least one team member must be a current student or have graduated within the past 24 months from an accredited institution. Teams of 2–4 members only. Employees of title sponsors may participate but are ineligible for sponsor-track prizes.',
    teamSizeMin: 2,
    teamSizeMax: 4,
    participantCount: 486,
    tracks: aiBuildersTracks,
    prizes: aiBuildersPrizes,
    sponsors: aiBuildersSponsors,
    faqs: aiBuildersFaqs,
  },
  {
    id: 'BTLX-2026-00502',
    name: 'FinEdge Challenge',
    tagline: 'Reimagine developer-first fintech',
    description:
      'Design APIs, dashboards, and automation tools that make financial infrastructure accessible to builders.',
    status: 'active',
    startDate: '2026-05-20T09:00:00Z',
    endDate: '2026-06-05T18:00:00Z',
    registrationDeadline: '2026-05-18T23:59:00Z',
    submissionDeadline: '2026-06-05T17:00:00Z',
    rules: 'No live trading with real funds. Sandbox and simulated environments only.',
    eligibility: 'Open to developers with fintech interest; students and professionals welcome.',
    teamSizeMin: 2,
    teamSizeMax: 4,
    participantCount: 318,
    tracks: [{ id: 'track-fintech', name: 'Developer Fintech', description: 'APIs and tooling for financial products.' }],
    prizes: [
      { trackId: 'track-fintech', place: 1, amount: '$7,000' },
      { trackId: 'track-fintech', place: 2, amount: '$3,500' },
    ],
    sponsors: [{ id: 'spn-ledger', name: 'LedgerFlow', tier: 'title' }],
    faqs: [{ id: 'faq-f1', question: 'Regulatory compliance required?', answer: 'Use mock data and sandbox APIs only.' }],
  },
  {
    id: 'BTLX-2025-00941',
    name: 'DevTools Derby 2025',
    tagline: 'Better tools for better builders',
    description: 'A classic BeetleX event where teams shipped IDE plugins, CLI utilities, and observability tooling.',
    status: 'closed',
    startDate: '2025-10-05T09:00:00Z',
    endDate: '2025-10-07T18:00:00Z',
    registrationDeadline: '2025-10-03T23:59:00Z',
    submissionDeadline: '2025-10-07T17:00:00Z',
    rules: 'Open-source license required at submission.',
    eligibility: 'Students and indie developers worldwide.',
    teamSizeMin: 1,
    teamSizeMax: 4,
    participantCount: 412,
    tracks: [{ id: 'track-devtools', name: 'Developer Tools', description: 'Productivity and DX improvements.' }],
    prizes: [{ trackId: 'track-devtools', place: 1, amount: '$5,000' }],
    sponsors: [{ id: 'spn-toolkit', name: 'ToolKit Inc', tier: 'gold' }],
    faqs: [{ id: 'faq-d1', question: 'Winners announced?', answer: 'Results published within 72 hours of close.' }],
  },
  {
    id: 'BTLX-2025-00877',
    name: 'HealthHack Global',
    tagline: 'Digital health for underserved communities',
    description: 'Teams built accessible health monitoring and triage tools for low-bandwidth environments.',
    status: 'closed',
    startDate: '2025-03-15T09:00:00Z',
    endDate: '2025-03-17T18:00:00Z',
    registrationDeadline: '2025-03-13T23:59:00Z',
    submissionDeadline: '2025-03-17T17:00:00Z',
    rules: 'HIPAA-aware design required; no real patient data in demos.',
    eligibility: 'Healthcare and CS students; interdisciplinary teams encouraged.',
    teamSizeMin: 2,
    teamSizeMax: 5,
    participantCount: 267,
    tracks: [{ id: 'track-health', name: 'Digital Health', description: 'Accessible care delivery tools.' }],
    prizes: [
      { trackId: 'track-health', place: 1, amount: '$10,000' },
      { trackId: 'track-health', place: 2, amount: '$5,000' },
    ],
    sponsors: [{ id: 'spn-medbridge', name: 'MedBridge', tier: 'title' }],
    faqs: [{ id: 'faq-h1', question: 'Clinical validation needed?', answer: 'Proof-of-concept only; no FDA claims.' }],
  },
]

export const teams: Team[] = [
  {
    id: 'team-neuronauts',
    name: 'NeuroNauts',
    eventId: AI_BUILDERS_EVENT_ID,
    trackId: 'track-genai',
    inviteCode: 'NEURO-7X2K',
    members: [
      {
        id: 'mem-1',
        name: 'Alex Chen',
        email: 'alex.chen@university.edu',
        role: 'Team Lead',
        college: 'State Institute of Technology',
      },
      {
        id: 'mem-2',
        name: 'Sam Rivera',
        email: 'sam.rivera@university.edu',
        role: 'ML Engineer',
        college: 'State Institute of Technology',
      },
      {
        id: 'mem-3',
        name: 'Morgan Blake',
        email: 'morgan.blake@university.edu',
        role: 'Frontend',
        college: 'Coastal Polytechnic',
      },
    ],
    submission: {
      id: 'sub-neuronauts-001',
      teamId: 'team-neuronauts',
      title: 'PromptForge Studio',
      description:
        'A collaborative prompt engineering workspace with versioned templates, eval harnesses, and one-click deployment to edge runtimes.',
      techStack: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL'],
      demoLink: 'https://promptforge-demo.beetlex.dev',
      repoLink: 'https://github.com/neuronauts/promptforge-studio',
      pitchDeckName: 'PromptForge_Pitch.pdf',
      videoLink: 'https://videos.beetlex.dev/neuronauts-pitch',
      status: 'draft',
      updatedAt: '2026-06-12T14:22:00Z',
    },
  },
  {
    id: 'team-chainmind',
    name: 'ChainMind',
    eventId: AI_BUILDERS_EVENT_ID,
    trackId: 'track-web3ai',
    inviteCode: 'CHAIN-9M4P',
    members: [
      {
        id: 'mem-4',
        name: 'Riya Patel',
        email: 'riya.patel@university.edu',
        role: 'Team Lead',
        college: 'Metro University',
      },
      {
        id: 'mem-5',
        name: 'Chris Okafor',
        email: 'chris.okafor@university.edu',
        role: 'Smart Contracts',
        college: 'Metro University',
      },
    ],
    submission: null,
  },
]

export const leaderboard: LeaderboardEntry[] = [
  { teamId: 'team-neuronauts', teamName: 'NeuroNauts', totalScore: 92.4, rank: 1, previousRank: 2 },
  { teamId: 'team-chainmind', teamName: 'ChainMind', totalScore: 88.1, rank: 2, previousRank: 1 },
  { teamId: 'team-synthwave', teamName: 'SynthWave Labs', totalScore: 85.7, rank: 3, previousRank: 4 },
  { teamId: 'team-orbital', teamName: 'Orbital Agents', totalScore: 84.2, rank: 4, previousRank: 3 },
  { teamId: 'team-lattice', teamName: 'Lattice Logic', totalScore: 81.9, rank: 5, previousRank: 6 },
  { teamId: 'team-helix', teamName: 'Helix Protocol', totalScore: 79.5, rank: 6, previousRank: 5 },
  { teamId: 'team-nexus', teamName: 'Nexus Forge', totalScore: 76.3, rank: 7, previousRank: 8 },
  { teamId: 'team-pulse', teamName: 'Pulse AI', totalScore: 74.8, rank: 8, previousRank: 7 },
]

export const announcements: Announcement[] = [
  {
    id: 'ann-001',
    eventId: AI_BUILDERS_EVENT_ID,
    title: 'Submission deadline extended by 2 hours',
    message: 'Final submissions now due at 7:00 PM UTC. Ensure all links are public and accessible.',
    priority: 'urgent',
    createdAt: '2026-06-14T10:00:00Z',
  },
  {
    id: 'ann-002',
    eventId: AI_BUILDERS_EVENT_ID,
    title: 'Mentor office hours — Track 2',
    message: 'Agentic Workflows mentors available in Discord #office-hours from 2–4 PM UTC.',
    priority: 'info',
    createdAt: '2026-06-13T09:30:00Z',
  },
]

export const judgeAssignments: JudgeAssignment[] = [
  {
    submissionId: 'sub-neuronauts-001',
    projectTitle: 'PromptForge Studio',
    teamName: 'NeuroNauts',
    status: 'pending',
  },
  {
    submissionId: 'sub-synthwave-002',
    projectTitle: 'AgentOps Canvas',
    teamName: 'SynthWave Labs',
    status: 'reviewed',
  },
  {
    submissionId: 'sub-orbital-003',
    projectTitle: 'OrbitPlanner',
    teamName: 'Orbital Agents',
    status: 'pending',
  },
]

export const scores: Score[] = []

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  college: string
  trackPreference: string
  createdAt: string
}

export const registrations: Registration[] = [
  {
    id: 'reg-001',
    eventId: AI_BUILDERS_EVENT_ID,
    name: 'Taylor Kim',
    email: 'taylor.kim@university.edu',
    college: 'Northern Tech College',
    trackPreference: 'track-agentic',
    createdAt: '2026-05-20T11:00:00Z',
  },
  {
    id: 'reg-002',
    eventId: AI_BUILDERS_EVENT_ID,
    name: 'Jordan Lee',
    email: 'jordan.lee@beetlex.dev',
    college: 'BeetleX HQ',
    trackPreference: 'track-genai',
    createdAt: '2026-05-18T09:15:00Z',
  },
]

export interface OrganizerStats {
  eventId: string
  totalRegistrations: number
  totalTeams: number
  submissionsDraft: number
  submissionsSubmitted: number
  announcementsCount: number
}

export const organizerStats: OrganizerStats = {
  eventId: AI_BUILDERS_EVENT_ID,
  totalRegistrations: 486,
  totalTeams: 142,
  submissionsDraft: 38,
  submissionsSubmitted: 89,
  announcementsCount: announcements.length,
}
