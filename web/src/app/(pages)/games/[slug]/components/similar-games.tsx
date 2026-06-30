import { IGames } from '@/common/interfaces/game.interface'
import { SectionTitle } from '@/src/components/shared/section-title'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/src/components/ui/carousel'
import { Cover } from '@/src/components/ui/cover'
import Link from 'next/link'

export async function SimilarGames({ games }: { games?: IGames[] }) {
  if (games) {
    return (
      <Carousel className="mx-auto max-w-360 space-y-8 px-5 pt-8 lg:px-24">
        <SectionTitle action="carousel">Similar</SectionTitle>

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
