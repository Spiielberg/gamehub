'use client'

import { Community } from '@/components/stream-player/chat/community'
import { Form, FormSkeleton } from '@/components/stream-player/chat/form'
import { Header, HeaderSkeleton } from '@/components/stream-player/chat/header'
import {
  MessageList,
  MessageListSkeleton,
} from '@/components/stream-player/chat/message-list'
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface ChatProps {
  hostIdentity: string
  hostName: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  viewerName: string
}

export const Chat = ({
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
  viewerName,
}: ChatProps) => {
  const [value, setValue] = useState('')

  const matches = useMediaQuery('(max-width: 1023px')

  const { onExpand, variant } = useChatSidebar((state) => state)

  const { chatMessages: messages, send } = useChat()

  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isStreamerOnline =
    participant && connectionState === ConnectionState.Connected

  const isChatHidden = !isChatEnabled || !isStreamerOnline

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = () => {
    if (!send) return

    send(value)
    setValue('')
  }

  const onChange = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col border-b border-l bg-background pt-0">
      <Header />
      {variant === ChatVariant.CHAT && (
        <>
          <MessageList
            isChatHidden={isChatHidden}
            messages={reversedMessages}
          />
          <Form
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isChatDelayed={isChatDelayed}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatHidden={isChatHidden}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <Community
          hostName={hostName}
          viewerName={viewerName}
          isChatHidden={isChatHidden}
        />
      )}
    </div>
  )
}

export const ChatSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col border-b border-l pt-0">
      <HeaderSkeleton />
      <MessageListSkeleton />
      <FormSkeleton />
    </div>
  )
}
