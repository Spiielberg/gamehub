'use client'

import { Message } from '@/components/stream-player/chat/message'
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
