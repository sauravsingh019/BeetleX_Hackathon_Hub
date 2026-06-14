import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      },
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
    }),
    {
      name: 'beetlex-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme)
        }
      },
    },
  ),
)
