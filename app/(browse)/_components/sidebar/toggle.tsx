'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react'

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

  const label = collapsed ? 'Expand' : 'Collapse'

  return (
    <>
      {!collapsed ? (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} asChild>
            <Button
              type="button"
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant="ghost"
            >
              <ArrowLeftFromLineIcon className="h-4 w-4" />
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
              <ArrowRightFromLineIcon className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
