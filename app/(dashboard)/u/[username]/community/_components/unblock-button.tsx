'use client'

import { onUnblock } from '@/actions/block'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface UnblockButtonProps {
  userId: string
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`User ${data.blocked.username} unblocked`),
        )
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isPending}
      size="sm"
      variant="link"
      className="text-blue-600"
    >
      Unblock
    </Button>
  )
}
