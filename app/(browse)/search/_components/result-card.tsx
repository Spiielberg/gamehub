import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserAvatar } from '@/components/user-avatar'
import { VerifiedMark } from '@/components/verified-mark'
import { stringToColor } from '@/lib/utils'
import { Stream, User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
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
    updatedAt: Stream['updatedAt']
  }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const color = stringToColor(data.user.username)

  return (
    <Link href={`/${data.user.username}`}>
      <div className="group flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
            color={color}
          />
        </div>
        <div className="w-full max-w-[24rem] space-y-1">
          <div className="flex items-center gap-x-2">
            <UserAvatar
              username={data.user.username}
              imageUrl={data.user.imageUrl}
              size="sm"
            />
            <p className="cursor-pointer text-lg font-bold transition-colors group-hover:text-blue-600">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="line-clamp-2 text-ellipsis text-sm text-muted-foreground">
                  {data.name}
                </p>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="px-1 py-0.5">
                <p className="max-w-[24rem] text-xs">{data.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <div className="flex h-7 items-center gap-x-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
