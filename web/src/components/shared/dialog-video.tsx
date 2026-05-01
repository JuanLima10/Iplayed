'use client'

import { IVideoDialog, VideoMode } from '@/common/interfaces/video.interface'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { Video } from '../ui/video'

export function DialogVideo({ src, poster }: IVideoDialog) {
  return (
    <Dialog>
      <DialogTitle className="sr-only" />
      <DialogTrigger asChild>
        <button className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-black">
          {poster && (
            <Image
              className="object-cover transition-transform duration-300"
              src={poster}
              alt="Video preview"
              fill
              suppressHydrationWarning
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-background/60 p-4 transition group-hover:scale-110">
              <Play
                className="h-6 w-6 fill-card-foreground text-card-foreground"
                suppressHydrationWarning
              />
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl overflow-hidden p-0">
        <div className="aspect-video w-full bg-black">
          <Video
            key={src}
            src={src}
            mode={VideoMode.player}
            autoPlay
            muted={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
