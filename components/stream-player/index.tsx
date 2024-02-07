'use client'

import { LoadingVideo } from '@/components/stream-player/loading-video'
import { Video } from '@/components/stream-player/video'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

interface StreamPlayerProps {
  isFollowing: boolean
  user: User & { stream: Stream | null }
}

export const StreamPlayer = ({ user }: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id)

  if (!identity || !name || !token) {
    return (
      <>
        <LoadingVideo label="Loading..." />
      </>
    )
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className="grid h-full grid-cols-1 xl:grid-cols-4 xl:gap-y-0 2xl:grid-cols-5"
    >
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 xl:col-span-3 xl:overflow-y-auto 2xl:col-span-4">
        <Video hostIdentity={user.id} hostName={user.username} />
      </div>
    </LiveKitRoom>
  )
}
