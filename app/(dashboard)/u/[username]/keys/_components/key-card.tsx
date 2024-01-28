'use client'

import { CopyButton } from '@/app/(dashboard)/u/[username]/keys/_components/copy-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface KeyCardProps {
  value: string
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false)

  const onShow = () => {
    setShow((prev) => !prev)
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="mt-2 shrink-0 font-semibold">Stream Key</p>
        <div className="w-full space-y-2">
          <div className="relative flex w-full items-center gap-x-2">
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder="Stream key"
            />
            <CopyButton value={value || ''} />
          </div>
          {!!value && (
            <Button onClick={onShow} variant="link" size="sm">
              {show ? 'Hide' : 'Show'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
