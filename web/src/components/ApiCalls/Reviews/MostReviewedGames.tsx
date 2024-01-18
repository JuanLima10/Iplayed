import Image from 'next/image';
import Link from 'next/link';

import { Carousel } from '../../Carousel';

import { GameProps } from '@/Types/Game';
import { api } from '@/lib/api';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function MostReviewedGames() {
  const MostReviewed = await api.get('/game/most-reviewed')
    .then(res => res.data).catch((err) => console.error(err))

  return (
    <Carousel>
      {MostReviewed && MostReviewed.map((game: GameProps) => (
        <Link key={game.id} className="keen-slider__slide" href={`/games/${game.slug}`}>
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