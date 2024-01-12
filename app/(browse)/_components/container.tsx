'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { ReactNode, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(max-width: 1024px)')

  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

  useEffect(() => {
    console.log(matches)
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : ' ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  )
}
