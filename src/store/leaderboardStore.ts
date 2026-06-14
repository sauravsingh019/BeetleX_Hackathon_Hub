import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LeaderboardState {
  resultsPublished: boolean
  setResultsPublished: (published: boolean) => void
}

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set) => ({
      resultsPublished: false,
      setResultsPublished: (published) => set({ resultsPublished: published }),
    }),
    { name: 'beetlex-leaderboard' },
  ),
)
