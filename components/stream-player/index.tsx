'use client'

import { Chat } from '@/components/stream-player/chat'
import { Toggle } from '@/components/stream-player/chat/toggle'
import { LoadingVideo } from '@/components/stream-player/loading-video'
import { Video } from '@/components/stream-player/video'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

interface StreamPlayerProps {
  isFollowing: boolean
  stream: Stream
  user: User & { stream: Stream | null }
}

export const StreamPlayer = ({
  isFollowing,
  stream,
  user,
}: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id)

  const { collapsed } = useChatSidebar((state) => state)

  if (!identity || !name || !token) {
    return (
      <>
        <LoadingVideo label="Loading..." />
      </>
    )
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[72px] z-50 hidden xl:block">
          <Toggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid h-full grid-cols-1 xl:grid-cols-4 xl:gap-y-0 2xl:grid-cols-5',
          collapsed && 'xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 xl:col-span-3 xl:overflow-y-auto 2xl:col-span-4">
          <Video hostIdentity={user.id} hostName={user.username} />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            hostIdentity={user.id}
            hostName={user.username}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            viewerName={name}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}
