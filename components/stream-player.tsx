'use client'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'

interface StreamPlayerProps {
  user: User & { stream: Stream | null }
  isFollowing: boolean
}

export const StreamPlayer = ({ user }: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id)

  if (!identity || !name || !token) {
    return (
      <>
        <p>Cannot watch the stream</p>
      </>
    )
  }

  return (
    <>
      <p>Allowed to watch the stream</p>
    </>
  )
}
