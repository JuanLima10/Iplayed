import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel'
import { Cover } from '@/src/components/ui/cover'
import { game_api } from '@/src/services/game.service'
import Link from 'next/link'

export async function Popular() {
  const games = await game_api.get({ limit: 20 })

  return (
    <Carousel className="space-y-8 pt-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-card-foreground sm:text-3xl">
            Popular games
          </h1>
          <hr className="w-8 border-2 border-primary" />
        </div>

        <div className="flex gap-2">
          <CarouselPrevious variant="outline" size="icon" />
          <CarouselNext variant="outline" size="icon" />
        </div>
      </div>

      <CarouselContent>
        {games?.data?.map(({ igdbId, slug, coverUrl, title }) => (
          <CarouselItem key={igdbId} className="basis-1/3 pr-1 md:basis-1/5">
            <Link href={`/games/${slug}`}>
              <Cover
                className="w-full"
                src={coverUrl ?? ''}
                alt={title}
                width={183}
                height={274}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
