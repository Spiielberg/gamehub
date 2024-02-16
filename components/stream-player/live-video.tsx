'use client'

import { FullscreenControl } from '@/components/stream-player/fullscreen-control'
import { VolumeControl } from '@/components/stream-player/volume-control'
import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

interface LiveVideoProps {
  participant: Participant
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [aspectRatio, setAspectRatio] = useState(0)
  const [volume, setVolume] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastVolumeBeforeMute, setLastVolume] = useState(50)

  const onVolumeChange = (value: number) => {
    setVolume(+value)

    if (videoRef.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = +value * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0

    if (isMuted) {
      setVolume(lastVolumeBeforeMute)
    } else {
      setLastVolume(volume)
      setVolume(0)
    }

    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? lastVolumeBeforeMute * 0.01 : 0
    }
  }

  const toggleFullscreen = () => {
    if (wrapperRef.current) {
      if (isFullscreen) {
        document.exitFullscreen()
      } else {
        wrapperRef.current.requestFullscreen()
      }
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null
    setIsFullscreen(isCurrentlyFullscreen)
  }

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)

  useEventListener('keydown', (event) => {
    if (wrapperRef.current && wrapperRef.current === document.activeElement) {
      if (event.key === 'M' || event.key === 'm') {
        toggleMute()
      }

      if (event.key === 'F' || event.key === 'f') {
        toggleFullscreen()
      }
    }
  })

  useEffect(() => {
    onVolumeChange(0)
  }, [])

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        const { videoWidth, videoHeight } = videoRef.current

        if (videoWidth > 0 && videoHeight > 0 && aspectRatio === 0) {
          setAspectRatio(videoWidth / videoHeight)
        }

        track.publication.track?.attach(videoRef.current)
      }
    })

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      className="relative mx-auto flex max-h-[calc(100vh-168px)] outline-none"
      style={{ aspectRatio: aspectRatio > 0 ? `${aspectRatio}` : '16 / 9' }}
    >
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-opacity">
        <div className="absolute bottom-0 flex h-10 w-full items-center justify-between bg-black/50 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            onToggle={toggleMute}
            value={volume}
          />
          <FullscreenControl
            isFullScreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}
