'use client'

import { IGame } from '@/common/interfaces/game.interface'
import { getYouTubeThumbnail } from '@/common/utils/thumbnail-get.util'
import { DialogVideo } from '@/src/components/shared/dialog-video'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import Image from 'next/image'
import { useState } from 'react'

export function ScreenshotGallery({ title, video, screenshots }: IGame) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (screenshots) {
    return (
      <Carousel className="mx-auto max-w-360 space-y-4 px-5 lg:px-24">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold text-card-foreground">Gallery</h1>
            <hr className="mb-2.5 w-16 border-2 border-primary" />
          </div>
          <div className="flex justify-end gap-2">
            <CarouselPrevious variant="outline" size="icon" />
            <CarouselNext variant="outline" size="icon" />
          </div>
        </div>

        <CarouselContent>
          {video && (
            <CarouselItem className="basis-full md:basis-1/3">
              <DialogVideo src={video} poster={getYouTubeThumbnail(video)} />
            </CarouselItem>
          )}

          {screenshots?.map((screenshot, index) => (
            <CarouselItem key={index} className="basis-full pr-1 md:basis-1/3">
              <Dialog>
                <DialogTitle />
                <DialogTrigger asChild>
                  <button
                    className="group relative aspect-video w-full overflow-hidden rounded-lg focus:outline-none"
                    onClick={() => {
                      setActiveIndex(index)
                    }}
                  >
                    <Image
                      className="cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      src={screenshot}
                      alt={`${title}-${index}-image`}
                      suppressHydrationWarning
                      fill
                    />
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-7xl p-0">
                  <Carousel
                    className="relativ w-full"
                    opts={{ startIndex: activeIndex }}
                  >
                    <CarouselContent>
                      {screenshots.map((screenshot, index) => (
                        <CarouselItem key={index} className="basis-full">
                          <div className="relative aspect-video w-full">
                            <Image
                              className="object-contain"
                              src={screenshot}
                              alt={`${title}-${index}`}
                              fill
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2" />
                    <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2" />
                  </Carousel>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }
}
