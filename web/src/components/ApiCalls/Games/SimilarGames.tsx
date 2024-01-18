import Image from 'next/image';
import Link from 'next/link';

import { fetchGame, similarGamesBody } from '@/lib/igdb';
import { Carousel } from '../../Carousel';

import { GameProps } from '@/Types/Game';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function SimilarGames({slug}: {slug: string}) {
  const {similar_games} = await fetchGame(similarGamesBody(slug))

  return (
    <Carousel>
      {similar_games && similar_games.map((game: GameProps) => (
        <Link key={game.id} href={`/games/${game.slug}`} className="keen-slider__slide">
          <Image
            className="w-full h-full rounded-lg transition-all hover:brightness-75"
            src={convertImgToHd(game.cover?.url)}
            alt={game.name}
            loading="lazy"
            width={200} height={255}
          />
        </Link>
      ))}
    </Carousel>
  )
}