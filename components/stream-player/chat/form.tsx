'use client'

import { Info } from '@/components/stream-player/chat/info'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { FormEvent, useState } from 'react'

interface FormProps {
  onSubmit: () => void
  value: string
  onChange: (value: string) => void
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  isChatHidden: boolean
  isFollowing: boolean
}

export const Form = ({
  onSubmit,
  value,
  onChange,
  isChatDelayed,
  isChatFollowersOnly,
  isChatHidden,
  isFollowing,
}: FormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false)

  const isChatFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing
  const isChatDisabled =
    isChatHidden || isDelayBlocked || isChatFollowersOnlyAndNotFollowing

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!value || isChatDisabled) return

    onSubmit()

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true)

      setTimeout(() => {
        setIsDelayBlocked(false)
      }, 3000)
    }
  }

  if (isChatHidden) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <Info
          isChatDelayed={isChatDelayed}
          isChatFollowersOnly={isChatFollowersOnly}
        />
        <Input
          onChange={(event) => onChange(event.target.value)}
          value={value}
          disabled={isChatDisabled}
          placeholder="Send a message"
          maxLength={256}
          className={cn(
            'border-white/10',
            (isChatFollowersOnly || isChatDelayed) &&
              'rounded-t-none border-t-0',
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isChatDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
}

export const FormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="size-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  )
}
