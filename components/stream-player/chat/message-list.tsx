'use client'

import { Message } from '@/components/stream-player/chat/message'
import { Skeleton } from '@/components/ui/skeleton'
import { ReceivedChatMessage } from '@livekit/components-react'

interface MessageListProps {
  isChatHidden: boolean
  messages: ReceivedChatMessage[]
}

export const MessageList = ({ isChatHidden, messages }: MessageListProps) => {
  if (isChatHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isChatHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3">
      {messages.map((message) => (
        <Message key={message.timestamp} data={message} />
      ))}
    </div>
  )
}

export const MessageListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="h-6 w-1/2" />
    </div>
  )
}
