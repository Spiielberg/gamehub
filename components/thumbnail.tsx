import { LiveBadge } from '@/components/live-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/user-avatar'
import Image from 'next/image'

interface ThumbnailProps {
  src: string | null
  fallback: string
  username: string
  isLive: boolean
  color: string
}

export const Thumbnail = ({
  src,
  fallback,
  username,
  isLive,
  color,
}: ThumbnailProps) => {
  let content

  if (src) {
    content = (
      <Image
        src={src}
        fill
        alt={username}
        className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
      />
    )
  } else {
    content = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
        <UserAvatar
          size="lg"
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  }

  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div
        className="absolute inset-0 flex items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
      <div
        className="triangle-left absolute left-[-6px] top-[-6px] opacity-0 transition-transform group-hover:-translate-y-2 group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
      <div
        className="triangle-right absolute bottom-[-6px] right-[-6px] opacity-0 transition-transform group-hover:translate-x-2 group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
      <div className="aspect-video rounded-md bg-background">{content}</div>
      {isLive && (
        <div className="absolute left-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
