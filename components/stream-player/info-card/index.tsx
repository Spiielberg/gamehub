'use client'

import { Modal } from '@/components/stream-player/info-card/info-modal'
import { Separator } from '@/components/ui/separator'
import { PencilIcon } from 'lucide-react'
import Image from 'next/image'

interface InfoCardProps {
  hostIdentity: string
  name: string
  viewerIdentity: string
  thumbnailUrl: string | null
}

export const InfoCard = ({
  hostIdentity,
  name,
  thumbnailUrl,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`

  const isHost = viewerIdentity === hostAsViewer

  if (!isHost) return

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-3 p-4 lg:p-6">
          <div className="h-auto w-auto rounded-md bg-white p-2">
            <PencilIcon className="size-5 text-background" />
          </div>
          <div>
            <h2 className="text-sm font-semibold capitalize lg:text-lg">
              Edit your stream info
            </h2>
            <p className="text-xs text-muted-foreground lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <Modal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video w-[200px] overflow-hidden rounded-md border border-white/10">
                <Image
                  src={thumbnailUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
