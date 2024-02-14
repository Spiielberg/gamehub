'use client'

import { BioModal } from '@/components/stream-player/about-card/bio-modal'
import { VerifiedMark } from '@/components/verified-mark'

interface AboutCardProps {
  hostIdentity: string
  hostName: string
  viewerIdentity: string
  bio: string | null
  followedByCount: number
}

export const AboutCard = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`

  const isHost = hostAsViewer === viewerIdentity

  const followedByLabel = followedByCount === 1 ? 'follower' : 'followers'

  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-background p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{' '}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || 'This user prefers to keep an air of mystery about then'}
        </p>
      </div>
    </div>
  )
}
