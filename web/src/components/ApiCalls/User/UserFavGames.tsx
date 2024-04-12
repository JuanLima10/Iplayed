import Image from 'next/image';
import Link from 'next/link';

import { GameProps } from '@/Types/Game';
import { UserFavGameProps } from '@/Types/User';
import { getUserFavorites } from '@/lib/fetch/favorites';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function UserFavGames(props: UserFavGameProps) {
  const favorites = await getUserFavorites(props.userId)

  if (favorites !== null) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {favorites.map((game: GameProps) => (
          <Link key={game.id} href={`/game/${game.slug}`}>
            <Image
              className="w-[150px] h-[200px] rounded-lg transition-all responsive:w-[65px] responsive:h-[90px] hover:brightness-75"
              src={convertImgToHd(game.cover.url)}
              alt={game.name}
              width={215} height={300}
            />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-32 flex items-center justify-center border border-dotted border-white-100 bg-transparent rounded-lg my-1 mx-auto navbar:w-[90%]">
      <span className="font-bold text-lg text-center text-white-100 p-2 responsive:text-sm">There are no favorites yet! 🔝</span>
    </div>
  )
}

export function UserFavGamesSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 animate-pulse mt-4">
      {[...Array(4)].map((fav, index) => (
        <div className="w-[150px] h-[200px] max-w-full bg-slate-700 rounded-lg responsive:w-[60px] responsive:h-[82px]" key={index}></div>
      ))}
    </div>
  )
}