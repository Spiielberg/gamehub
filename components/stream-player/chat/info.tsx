import { Hint } from '@/components/hint'
import { InfoIcon } from 'lucide-react'
import { useMemo } from 'react'

interface InfoProps {
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export const Info = ({ isChatDelayed, isChatFollowersOnly }: InfoProps) => {
  const hint = useMemo(() => {
    if (!isChatDelayed && isChatFollowersOnly) {
      return 'Only followers can chat'
    }

    if (isChatDelayed && !isChatFollowersOnly) {
      return 'Messages are delayed by 3 seconds'
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return 'Only followers can chat and messages are delayed by 3 seconds.'
    }

    return ''
  }, [isChatDelayed, isChatFollowersOnly])

  const label = useMemo(() => {
    if (!isChatDelayed && isChatFollowersOnly) {
      return 'Followers only'
    }

    if (isChatDelayed && !isChatFollowersOnly) {
      return 'Slow mode'
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return 'Followers only and slow mode'
    }

    return ''
  }, [isChatDelayed, isChatFollowersOnly])

  if (!isChatDelayed && !isChatFollowersOnly) return null

  return (
    <div className="flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2 text-muted-foreground">
      <Hint label={hint}>
        <InfoIcon className="size-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  )
}
