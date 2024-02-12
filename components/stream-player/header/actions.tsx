'use client'

import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  hostIdentity: string
  isHost: boolean
  isFollowing: boolean
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`),
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in')
    }

    if (isHost) return

    if (isFollowing) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <HeartIcon
        className={cn('mr-2 h-4 w-4', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const ActionsSkeleton = () => {
  return <Skeleton className="h-9 w-full lg:w-24" />
}
