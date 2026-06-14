// Mock data models

export interface HackathonEvent {
  id: string
  title: string
  description: string
  status: 'active' | 'upcoming' | 'closed'
  track: string
  dateStr: string
  participants: number
  submissions: number
  prizePool: string
  isRecommended?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  isLead?: boolean
}

export interface LeaderboardEntry {
  rank: number
  team: string
  score: number
  isCurrentUser?: boolean
}

// Mock Data
const mockEvents: HackathonEvent[] = [
  {
    id: 'evt-hackfest-2025',
    title: 'BeetleX HackFest 2025',
    description: '72-hour global hackathon across AI, Web3, and Open tracks. $50K in prizes.',
    status: 'active',
    track: 'AI / ML',
    dateStr: 'Aug 15–18, 2025',
    participants: 1240,
    submissions: 87,
    prizePool: '$50,000'
  },
  {
    id: 'evt-web3-sprint',
    title: 'Web3 Dev Sprint — Q4',
    description: '48-hour Solana-focused hackathon. Build DeFi, NFT tools, or DAO infrastructure.',
    status: 'upcoming',
    track: 'Web3',
    dateStr: 'Oct 10–12, 2025',
    participants: 320,
    submissions: 0,
    prizePool: '$20,000'
  },
  {
    id: 'evt-ai-agents',
    title: 'AI Agents Hackathon',
    description: 'Build agentic AI systems using any LLM API. Focus on real-world automation workflows.',
    status: 'upcoming',
    track: 'AI / ML',
    dateStr: 'Nov 1–3, 2025',
    participants: 180,
    submissions: 0,
    prizePool: '$15,000'
  },
  {
    id: 'evt-devjam-2024',
    title: 'BeetleX DevJam 2024',
    description: 'Annual open-track hackathon. 800 participants, 210 submissions. View the winning projects.',
    status: 'closed',
    track: 'Open Track',
    dateStr: 'Mar 10–13, 2024',
    participants: 800,
    submissions: 210,
    prizePool: '$30,000 Awarded'
  },
  {
    id: 'evt-dao-collab',
    title: 'DeveloperDAO × BeetleX Collab',
    description: 'Exclusive event for Web3 developers. Ethereum, L2, and account abstraction tracks.',
    status: 'upcoming',
    track: 'Web3',
    dateStr: 'Dec 5–7, 2025',
    participants: 90,
    submissions: 0,
    prizePool: '$25,000',
    isRecommended: true
  }
]

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, team: 'AlphaNeural', score: 87.4 },
  { rank: 2, team: 'DataPunks', score: 84.1 },
  { rank: 3, team: 'NullPointers', score: 81.7, isCurrentUser: true },
  { rank: 4, team: 'ByteBuilders', score: 79.3 },
  { rank: 5, team: 'NeuralNomads', score: 77.0 },
]

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const api = {
  getEvents: async (): Promise<HackathonEvent[]> => {
    await delay(600)
    return mockEvents
  },
  
  getEventDetails: async (id: string): Promise<HackathonEvent> => {
    await delay(400)
    const event = mockEvents.find(e => e.id === id)
    if (!event) throw new Error('Event not found')
    return event
  },

  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    await delay(300)
    return mockLeaderboard
  },
  
  registerParticipant: async (data: any): Promise<{ success: boolean, registrationId: string }> => {
    await delay(1200)
    
    // Simulated check for duplicate email
    if (data.email === 'duplicate@example.com') {
      throw new Error('DUPLICATE_EMAIL')
    }
    
    return { success: true, registrationId: `BXHF-${Math.floor(Math.random() * 10000)}` }
  }
}
