'use client'

import { Button } from '@/components/ui/button'
import { CheckCheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
  value: string
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = () => {
    if (!value) {
      return
    }

    setIsCopied(true)
    navigator.clipboard.writeText(value)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const Icon = isCopied ? CheckCheckIcon : CopyIcon

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
      className="absolute right-1"
    >
      <Icon className="size-4" />
    </Button>
  )
}
