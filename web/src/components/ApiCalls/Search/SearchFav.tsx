import Image from 'next/image';

import { fetchSearch } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';
import { getYear } from '@/utils/unixTimeStampToDate';

import { GameProps } from '@/Types/Game';
import { SearchGetProps } from '@/Types/Search';
import { SearchPagination } from '../../Pagination';

export async function SearchFav(props: SearchGetProps) {
  await new Promise((resolve) => { setTimeout(resolve, 500) })
  const { data, count } = await fetchSearch(props.search, props.offset, props.limit)

  return (
    <div className="flex flex-wrap gap-2 responsive:flex-col">
      {data && data.map((game: GameProps) => (
        <div className="relative flex items-start rounded-md hover:bg-white-200" key={game.id}>
          <Image
            className="w-[75px] max-w-full h-[100px] rounded-md"
            src={convertImgToHd(game.cover?.url)}
            alt={game.name}
            width={215} height={300}
          />
          <label className="w-[400px] min-w-[400px] text-white-100 px-4 responsive:w-full responsive:min-w-0">
            <span className="font-semibold text-md responsive:text-sm small-screen:text-xs">
              {game.name.length > 65 ?
                game.name.substring(0, 65).concat('...') : game.name
              }
            </span>
            <p className="font-normal text-sm small-screen:text-xs">{getYear(game.first_release_date)}</p>
          </label>
          <input className="absolute cursor-pointer w-full h-full opacity-0 after:content-none" type="radio" name="game" value={game.slug} />
        </div>
      ))}
      <SearchPagination
        perPage={props.limit}
        itemsLength={count}
      />
    </div>
  )
}

export function SearchFavSkeleton({ limit }: { limit: number }) {
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