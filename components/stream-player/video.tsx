'use client'

import { LiveVideo } from '@/components/stream-player/live-video'
import { LoadingVideo } from '@/components/stream-player/loading-video'
import { OfflineVideo } from '@/components/stream-player/offline-video'
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'

interface VideoProps {
  hostIdentity: string
  hostName: string
}

export const Video = ({ hostIdentity, hostName }: VideoProps) => {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity)

  let content

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />
  } else {
    content = <LiveVideo participant={participant} />
  }

  return (
    <div className="group relative aspect-video border-b bg-black">
      {content}
    </div>
  )
}

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-b bg-black">
      <div className="h-full w-full">
        <LoadingVideo label="Loading" />
      </div>
    </div>
  )
}
