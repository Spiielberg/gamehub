'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react'

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state,
  )

  const label = collapsed ? 'Expand' : 'Collapse'

  return (
    <>
      {!collapsed ? (
        <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} asChild>
            <Button
              type="button"
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant="ghost"
            >
              <ArrowLeftFromLineIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} asChild>
            <Button
              type="button"
              onClick={onExpand}
              className="h-auto p-2"
              variant="ghost"
            >
              <ArrowRightFromLineIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className="mb-2 hidden items-center justify-between p-3 pl-6 lg:flex">
      <p className="font-semibold text-primary">Dashboard</p>
      <Skeleton className="size-8" />
    </div>
  )
}
