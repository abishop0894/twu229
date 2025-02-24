'use client'

import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  className?: string
}

export default function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    if (!videoRef.current) return

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      sources: [{
        src,
        type: "video/mp4"
      }]
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
      }
    }
  }, [src])

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className={`video-js vjs-big-play-centered ${className}`}
      />
    </div>
  )
} 