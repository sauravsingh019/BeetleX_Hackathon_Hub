import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRole } from '@/types'

interface AuthUser {
  name: string
  email: string
}

interface AuthState {
  role: UserRole
  user: AuthUser | null
  setRole: (role: UserRole) => void
}

const demoUsers: Record<Exclude<UserRole, 'public'>, AuthUser> = {
  participant: { name: 'Alex Chen', email: 'alex.chen@university.edu' },
  judge: { name: 'Dr. Priya Sharma', email: 'priya.sharma@beetlex.dev' },
  organizer: { name: 'Jordan Lee', email: 'jordan.lee@beetlex.dev' },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'public',
      user: null,
      setRole: (role) =>
        set({
          role,
          user: role === 'public' ? null : demoUsers[role],
        }),
    }),
    { name: 'beetlex-auth' },
  ),
)
