'use client'

import { onBlock, onUnblock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  isFollowing: boolean
  isUserBlocked: boolean
  userId: string
}

export const Actions = ({
  isFollowing,
  isUserBlocked,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`)
        })
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`)
        })
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const onClickFollowButton = () => {
    if (!isFollowing) {
      handleFollow()
    } else {
      handleUnfollow()
    }
  }

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          toast.success(`You are now Blocking ${data.blocked.username}`)
        })
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.blocked.username}`)
        })
        .catch(() => toast.error('Something went wrong.'))
    })
  }

  const onClickBlockButton = () => {
    if (!isUserBlocked) {
      handleBlock()
    } else {
      handleUnblock()
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={onClickFollowButton}
        disabled={isPending}
      >
        {!isFollowing ? 'Follow' : 'Unfollow'}
      </Button>

      <Button
        type="button"
        variant="primary"
        onClick={onClickBlockButton}
        disabled={isPending}
      >
        {!isUserBlocked ? 'Block' : 'Unblock'}
      </Button>
    </>
  )
}
