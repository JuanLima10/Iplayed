'use client'

import { IVideoProps, VideoMode } from '@/common/interfaces/video.interface'
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

export function Video(props: IVideoProps) {
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
    if (!src) return

    loadYouTubeAPI()

    window.onYouTubeIframeAPIReady = () => {
      if (!containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: src,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          mute: muted ? 1 : 0,
          controls: isBackground ? 0 : 1,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: isBackground ? 60 : undefined,
        },
        events: {
          onReady: (event: any) => {
            const player = event.target

            if (isBackground) {
              const duration = player.getDuration()

              player.seekTo(20, true) // begin after 30 sec
              const endAt = Math.max(duration - 20, 60) // cut last 20 sec

              const interval = setInterval(() => {
                const current = player.getCurrentTime()

                if (current >= endAt) {
                  player.pauseVideo()
                  setShowPoster(true)
                  clearInterval(interval)
                }
              }, 500)
            }

            if (autoPlay) setShowPoster(false)
          },

          onError: () => {
            setHasError(true)
            setShowPoster(true)
          },
        },
      })
    }
  }, [src, autoPlay, muted, isBackground])

  return (
    <div
      className={clsx(
        'relative h-full w-full overflow-hidden rounded-lg',
        className
      )}
    >
      {(showPoster || hasError) && poster && (
        <Image
          src={poster}
          alt="video background"
          fill
          className="object-cover transition-opacity duration-500"
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
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'h-screen w-screen',
            'min-h-[56.25vw] min-w-[177.77vh]',
            !isBackground && 'h-full min-h-0 w-full min-w-0'
          )}
        />
      </div>
    </div>
  )
}
