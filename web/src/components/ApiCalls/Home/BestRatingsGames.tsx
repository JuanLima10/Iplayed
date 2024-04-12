import Image from 'next/image';
import Link from 'next/link';

import { Carousel } from '@/components/Carousel';

import { GameProps } from '@/Types/Game';
import { fetchGames, ratingBody } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function BestRatingsGames() {
  const bestRatings = await fetchGames(ratingBody)

  return (
    <Carousel>
      {bestRatings && bestRatings.map((game: GameProps) => (
        <Link key={game.id} className="keen-slider__slide" href={`/game/${game.slug}`}>
          <Image
            className="rounded-lg transition-all hover:brightness-75"
            src={convertImgToHd(game.cover.url)}
            alt={game.name}
            width={200} height={255}
            priority
          />
        </Link>
      ))}
    </Carousel>
  )
}