'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { MessageSquareIcon, UsersIcon } from 'lucide-react'

export const VariantToggle = () => {
  const { onChangeVariant, variant } = useChatSidebar((state) => state)

  const isChat = variant === ChatVariant.CHAT

  const Icon = isChat ? UsersIcon : MessageSquareIcon

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT

    onChangeVariant(newVariant)
  }

  const label = isChat ? 'Community' : 'Go back to chat'

  return (
    <Hint label={label} asChild>
      <Button onClick={onToggle} variant="ghost" className="h-auto p-2">
        <Icon className="size-4" />
      </Button>
    </Hint>
  )
}
