import { create } from 'zustand'

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

interface ChatSidebarStore {
  collapsed: boolean
  onCollapse: () => void
  onExpand: () => void
  variant: ChatVariant
  onChangeVariant: (variant: ChatVariant) => void
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  onCollapse: () => set(() => ({ collapsed: true })),
  onExpand: () => set(() => ({ collapsed: false })),
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant) => set(() => ({ variant })),
}))
