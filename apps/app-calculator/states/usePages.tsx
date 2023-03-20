import { ReactNode } from "react"
import { create } from "zustand"

type Pages = 'form' | 'email'
interface PagesState {
  readonly page: Pages,
  readonly set: (page: Pages) => void
}

export const usePages = create<PagesState>((set) => ({
  page: 'form',
  set: (page) => set(() => ({ page }))
}))
