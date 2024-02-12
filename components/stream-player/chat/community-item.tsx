'use client'

import { onBlock } from '@/actions/block'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { cn, stringToColor } from '@/lib/utils'
import { MinusCircleIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface CommunityItemProps {
  hostname: string
  viewerName: string
  participantIdentity: string
  participantName?: string
}

export const CommunityItem = ({
  hostname,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition()

  const color = stringToColor(participantName || '')

  const isSelf = participantName === viewerName

  const isHost = viewerName === hostname

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Block ${participantName}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <div
      className={cn(
        'group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5',
        isPending && 'pointer-events-none opacity-50',
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block" asChild>
          <Button
            variant="ghost"
            onClick={handleBlock}
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MinusCircleIcon className="size-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  )
}
