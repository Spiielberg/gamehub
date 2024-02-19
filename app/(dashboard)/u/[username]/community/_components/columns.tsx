'use client'

import { UnblockButton } from '@/app/(dashboard)/u/[username]/community/_components/unblock-button'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'

export type Payment = {
  id: string
  userId: string
  imageUrl: string
  username: string
  createdAt: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-x-1">
          <span>Username</span>
          <Button
            variant="ghost"
            className="size-7 items-center justify-center p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDownIcon className="size-3.5" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <UserAvatar
          size="sm"
          username={row.original.username}
          imageUrl={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-x-1">
          <span>Date blocked</span>
          <Button
            variant="ghost"
            className="size-7 items-center justify-center p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDownIcon className="size-3.5" />
          </Button>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
]
