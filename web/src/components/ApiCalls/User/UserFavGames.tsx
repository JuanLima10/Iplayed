import Image from 'next/image';
import Link from 'next/link';

import { GameProps } from '@/Types/Game';
import { UserFavGameProps } from '@/Types/User';
import { api } from '@/lib/api';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function UserFavGames(props: UserFavGameProps) {
  const { data } = await api.get(`/user/fav/${props.userId}`)
    .then(res => res)

  if (data !== null) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {data.map((game: GameProps) => (
          <Link key={game.id} href={`/games/${game.slug}`}>
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