import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'organizer'
}

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  isCartOpen: boolean
  setCartOpen: (isOpen: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}))
