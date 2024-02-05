'use client'

import {
  UserItem,
  UserItemSkeleton,
} from '@/app/(browse)/_components/sidebar/user-item'
import { useSidebar } from '@/store/use-sidebar'
import { Follow, Stream, User } from '@prisma/client'

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: Stream | null
    }
  })[]
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state)

  if (!data.length) return null

  return (
    <>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(({ following: { id, username, imageUrl, stream } }) => (
          <UserItem
            key={id}
            username={username}
            imageUrl={imageUrl}
            isLive={stream?.isLive}
          />
        ))}
      </ul>
    </>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="flex flex-col gap-y-2 px-2 pt-4 lg:pt-8">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
