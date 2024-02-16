import { WifiOffIcon } from 'lucide-react'

interface OfflineVideoProps {
  username: string
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="mx-auto flex aspect-video max-h-[calc(100vh-168px)] flex-col items-center justify-center space-y-4">
      <WifiOffIcon className="size-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  )
}
