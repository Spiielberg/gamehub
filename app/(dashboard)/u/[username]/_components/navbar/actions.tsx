import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-4">
      <Hint label="Exit" asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href="/">
            <LogOutIcon className="size-5" />
          </Link>
        </Button>
      </Hint>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
