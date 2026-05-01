'use client'

import { IVideo, VideoMode } from '@/common/interfaces/video.interface'
import { createPlayer } from '@/common/utils/player-create.util'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

function loadYouTubeAPI() {
  if (window.YT) return

  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.body.appendChild(tag)
}

export function Video(props: IVideo) {
  const {
    src,
    posters = [],
    mode = VideoMode.player,
    autoPlay = false,
    muted = true,
    className,
  } = props

  const isBackground = mode === VideoMode.background
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)

  const [hasError, setHasError] = useState(false)
  const [poster, setPoster] = useState<string | null>(null)
  const [showPoster, setShowPoster] = useState(isBackground)

  useEffect(() => {
    if (posters.length > 0) {
      const random = posters[Math.floor(Math.random() * posters.length)]
      setPoster(random)
    }
  }, [posters])

  useEffect(() => {
    if (!src || !containerRef.current) return

    let interval: any

    const init = () => {
      if (!containerRef.current) return

      playerRef.current = createPlayer({
        container: containerRef.current,
        src,
        autoPlay,
        muted,
        isBackground,
        onReady: (player) => {
          if (isBackground) {
            const duration = player.getDuration()

            player.seekTo(20, true)
            player.mute()
            setShowPoster(false)

            const endAt = Math.max(duration - 20, 60)

            interval = setInterval(() => {
              const current = player.getCurrentTime()
              if (current >= endAt) {
                player.pauseVideo()
                setShowPoster(true)
                clearInterval(interval)
              }
            }, 500)
          } else {
            setShowPoster(false)
          }
        },
        onError: () => {
          setHasError(true)
          setShowPoster(true)
        },
      })
    }

    if (window.YT?.Player) {
      init()
    } else {
      loadYouTubeAPI()
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        init()
      }
    }

    return () => {
      if (interval) clearInterval(interval)
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [src, autoPlay, muted, isBackground])

  return (
    <div
      className={clsx(
        'relative mt-1 h-full w-full overflow-hidden rounded-md sm:rounded-lg',
        className
      )}
    >
      {(showPoster || hasError) && poster && (
        <Image
          className="object-cover transition-opacity duration-500"
          src={poster}
          alt="video background"
          fill
          priority
          suppressHydrationWarning
        />
      )}

      <div
        className={clsx(
          'absolute inset-0',
          (showPoster || hasError) && 'opacity-0',
          isBackground && 'pointer-events-none'
        )}
      >
        <div
          ref={containerRef}
          className={clsx(
            'absolute inset-0',
            isBackground
              ? [
                  'top-1/2 left-1/2',
                  '-translate-x-1/2 -translate-y-1/2',
                  'h-screen w-screen',
                  'min-h-[56.25vw] min-w-[177.77vh]',
                ]
              : ['h-full w-full']
          )}
        />
      </div>
    </div>
  )
}
