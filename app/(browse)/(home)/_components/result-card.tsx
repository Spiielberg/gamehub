import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { stringToColor } from '@/lib/utils'
import { Stream, User } from '@prisma/client'
import Link from 'next/link'

interface ResultCardProps {
  data: {
    user: {
      username: User['username']
      imageUrl: User['imageUrl']
    }
    thumbnailUrl: Stream['thumbnailUrl']
    isLive: Stream['isLive']
    name: Stream['name']
  }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const color = stringToColor(data.user.username)

  return (
    <Link href={`/${data.user.username}`}>
      <div className="group h-full w-full">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          username={data.user.username}
          isLive={data.isLive}
          color={color}
        />
        <div className="mt-2 flex items-center gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
          />
          <div className="flex flex-col overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="truncate text-sm font-semibold">{data.name}</p>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="px-1 py-0.5">
                  <p className="max-w-52 text-xs">{data.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-xs" style={{ color }}>
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full">
      <ThumbnailSkeleton />
      <div className="mt-2 flex items-center gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
