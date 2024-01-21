import { create } from 'zustand'

interface CreatorSidebarStore {
  collapsed: boolean
  onCollapse: () => void
  onExpand: () => void
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
  collapsed: false,
  onCollapse: () => set(() => ({ collapsed: true })),
  onExpand: () => set(() => ({ collapsed: false })),
}))
