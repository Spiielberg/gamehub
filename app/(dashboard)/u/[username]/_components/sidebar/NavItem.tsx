import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface NavItemProps {
  params: {
    label: string
    href: string
    icon: LucideIcon
  }
  isActive: boolean
}

export const NavItem = ({
  params: { label, href, icon: Icon },
  isActive,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state)

  return (
    <Button
      variant="ghost"
      className={cn(
        'h-12 w-full',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent',
      )}
      asChild
    >
      <Link href={href}>
        <div className="flex items-center gap-x-2">
          <Icon className={cn('size-4', collapsed ? 'mr-0' : 'mr-2')} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  )
}

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-3 lg:py-3 lg:pl-3">
      <Skeleton className="min-h-12 min-w-[53px] rounded-md lg:min-h-6 lg:min-w-6" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
