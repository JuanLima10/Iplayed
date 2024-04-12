import Image from 'next/image';
import Link from 'next/link';

import { fetchSearch } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';
import { getYear } from '@/utils/unixTimeStampToDate';

import { GameProps } from '@/Types/Game';
import { SearchGetProps } from '@/Types/Search';
import { SearchPagination } from '../../Pagination';

export async function SearchGame(props: SearchGetProps) {
  const {data, count} = await fetchSearch(props.search, props.offset, props.limit)
  
  return (
    <div className="flex flex-wrap gap-2 responsive:flex-col">
      {data.map((game: GameProps) => (
        <Link className="flex items-start rounded-md hover:bg-white-200" key={game.id} href={`/game/${game.slug}`}>
          <Image
            className="w-[75px] max-w-full h-[100px] rounded-md"
            src={convertImgToHd(game.cover?.url)}
            alt={game.name}
            width={215} height={300}
          />
          <div className="w-[400px] min-w-[400px] text-white-100 px-4 responsive:w-full responsive:min-w-0">
            <span className="font-semibold text-md responsive:text-sm small-screen:text-xs">
              {game.name.length > 65 ?
                game.name.substring(0, 65).concat('...') : game.name
              }
            </span>
            <p className="font-normal text-sm small-screen:text-xs">{getYear(game.first_release_date)}</p>
          </div>
        </Link>
      ))}
      <SearchPagination
        perPage={props.limit}
        itemsLength={count}
      />
    </div>
  )
}

export function SearchGameSkeleton({ limit }: { limit: number }) {
  return (
    <div className="flex flex-wrap gap-2 responsive:flex-col">
      {[...Array(limit)].map((search, index) =>
        <div key={index} className="flex items-start min-w-[475px] responsive:w-full responsive:min-w-0">
          <div className="w-[75px] max-w-full h-[100px] bg-slate-700 rounded-md"></div>
          <div className="pt-1 px-2">
            <div className="w-48 h-5 bg-slate-700 rounded-lg"></div>
            <div className="w-12 h-5 bg-slate-700 rounded-full mt-1"></div>
          </div>
        </div>
      )}
    </div>
  )
}