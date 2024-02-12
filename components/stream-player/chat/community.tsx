'use client'

import { CommunityItem } from '@/components/stream-player/chat/community-item'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

interface CommunityProps {
  hostName: string
  viewerName: string
  isChatHidden: boolean
}

export const Community = ({
  hostName,
  viewerName,
  isChatHidden,
}: CommunityProps) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 500)

  const participants = useParticipants()

  const onChange = (newValue: string) => {
    setValue(newValue)
  }

  const filteredParticipants = useMemo(() => {
    const uniqueUserList = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`

        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant)
        }

        return acc
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    )

    return uniqueUserList.filter(
      (participant) =>
        participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
    )
  }, [debouncedValue, participants])

  if (isChatHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Input
        onChange={(event) => onChange(event.target.value)}
        value={value}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="mt-4 gap-y-2">
        <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostname={hostName}
            viewerName={viewerName}
            participantIdentity={participant.identity}
            participantName={participant.name}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
