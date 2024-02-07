'use client'

import { Hint } from '@/components/hint'
import { Slider } from '@/components/ui/slider'
import { Volume1Icon, Volume2Icon, VolumeXIcon } from 'lucide-react'

interface VolumeControlProps {
  onChange: (value: number) => void
  onToggle: () => void
  value: number
}

export const VolumeControl = ({
  onChange,
  onToggle,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0
  const isAboveHalf = value > 50

  let Icon = Volume1Icon

  if (isMuted) {
    Icon = VolumeXIcon
  } else if (isAboveHalf) {
    Icon = Volume2Icon
  }

  const label = isMuted ? 'Unmute' : 'Mute'

  const handleChange = (value: number[]) => {
    onChange(value[0])
  }

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="size-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={5}
      />
      {value >= 0 && <span className="ml-1 text-sm text-white">{value}%</span>}
    </div>
  )
}
