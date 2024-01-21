'use client'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ReactNode, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(max-width: 1023px)')

  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state,
  )

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  )
}
