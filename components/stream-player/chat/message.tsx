'use client'

import { formatDate, stringToColor } from '@/lib/utils'
import { ReceivedChatMessage } from '@livekit/components-react'

interface MessageProps {
  data: ReceivedChatMessage
}

export const Message = ({ data }: MessageProps) => {
  const color = stringToColor(data.from?.name || '')

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="mt-[3px] text-xs text-white/40">
        {formatDate(data.timestamp)}
      </p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color }}>
            {data.from?.name}
          </span>
        </p>
        <p className="break-all text-sm">{data.message}</p>
      </div>
    </div>
  )
}
