import { IGames } from '@/common/interfaces/game.interface'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel'
import { Cover } from '@/src/components/ui/cover'
import Link from 'next/link'

export async function SimilarGames({ games }: { games?: IGames[] }) {
  if (games) {
    return (
      <Carousel className="mx-auto max-w-360 space-y-8 px-5 pt-8 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold text-card-foreground">Similar</h1>
            <hr className="mb-2.5 w-16.25 border-2 border-primary" />
          </div>

          <div className="flex gap-2">
            <CarouselPrevious variant="outline" size="icon" />
            <CarouselNext variant="outline" size="icon" />
          </div>
        </div>

        <CarouselContent>
          {games.map(({ igdbId, slug, coverUrl, title }) => (
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
}
