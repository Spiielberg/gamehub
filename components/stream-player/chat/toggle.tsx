'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react'

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state)

  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon

  const onToggle = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }

  const label = collapsed ? 'Expand' : 'Collapse'

  return (
    <Hint label={label} asChild>
      <Button onClick={onToggle} variant="ghost" className="h-auto p-2">
        <Icon className="size-4" />
      </Button>
    </Hint>
  )
}
