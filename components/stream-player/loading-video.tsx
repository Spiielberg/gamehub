import { LoaderIcon } from 'lucide-react'

interface LoadingVideoProps {
  label: string
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="mx-auto flex aspect-video max-h-[calc(100vh-168px)] flex-col items-center justify-center space-y-4">
      <LoaderIcon className="size-10 animate-spin text-muted-foreground" />
      <p className="capitalize text-muted-foreground">{label}</p>
    </div>
  )
}
