'use client'

import { Toggle } from '@/components/stream-player/chat/toggle'
import { VariantToggle } from '@/components/stream-player/chat/variant-toggle'
import { Skeleton } from '@/components/ui/skeleton'

export const Header = () => {
  return (
    <div className="relative border-b p-3">
      <div className="absolute left-2 top-2 hidden xl:block">
        <Toggle />
      </div>
      <p className="text-center font-semibold text-primary">Stream Chat</p>
      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="relative hidden border-b p-3 md:block">
      <Skeleton className="absolute left-3 top-3 size-6" />
      <Skeleton className="mx-auto h-6 w-28" />
      <Skeleton className="absolute right-3 top-3 size-6" />
    </div>
  )
}
