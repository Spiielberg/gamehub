'use client'

import {
  UserItem,
  UserItemSkeleton,
} from '@/app/(browse)/_components/sidebar/user-item'
import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'

interface RecommendedProps {
  data: User[]
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state)

  const showLabel = !collapsed && data.length > 0

  return (
    <>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(({ id, username, imageUrl }) => (
          <UserItem
            key={id}
            username={username}
            imageUrl={imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="flex flex-col gap-y-2 px-2 pt-4 lg:pt-8">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
