'use client'

import { Hint } from '@/components/hint'
import { MaximizeIcon, MinimizeIcon } from 'lucide-react'

interface FullscreenControlProps {
  isFullScreen: boolean
  onToggle: () => void
}

export const FullscreenControl = ({
  isFullScreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullScreen ? MinimizeIcon : MaximizeIcon

  const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="size-5" />
        </button>
      </Hint>
    </div>
  )
}
