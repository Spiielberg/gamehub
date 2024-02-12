'use client'

import {
  Actions,
  ActionsSkeleton,
} from '@/components/stream-player/header/actions'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { VerifiedMark } from '@/components/verified-mark'
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react'
import { UserIcon } from 'lucide-react'

interface HeaderProps {
  hostIdentity: string
  hostName: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}

export const Header = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: HeaderProps) => {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant

  const participantCount = participants.length - 1

  const hostAsViewer = `host-${hostIdentity}`

  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 pb-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="flex items-center gap-x-1 text-xs font-semibold text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount}{' '}
                {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        hostIdentity={hostIdentity}
        isFollowing={isFollowing}
        isHost={isHost}
      />
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 pb-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-1">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  )
}
