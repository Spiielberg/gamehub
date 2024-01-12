'use client'

import { RecommendedSkeleton } from '@/app/(browse)/_components/sidebar/recommended'
import { ToggleSkeleton } from '@/app/(browse)/_components/sidebar/toggle'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'

interface WrapperProps {
  children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient()
  const { collapsed } = useSidebar((state) => state)

  if (!isClient) {
    return (
      <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35] bg-background',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
