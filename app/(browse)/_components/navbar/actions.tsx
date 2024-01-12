import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import { ClapperboardIcon } from 'lucide-react'
import Link from 'next/link'

export const Actions = async () => {
  const user = await currentUser()

  return (
    <div className="ml-4 flex items-center justify-end lg:ml-0">
      {!user ? (
        <SignInButton>
          <Button size="sm" variant="primary">
            Sign In
          </Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <ClapperboardIcon className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  )
}
