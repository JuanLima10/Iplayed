import { GameProps } from "@/Types/Game"
import { fetchGames, games } from "@/lib/igdb"
import { convertImgToHd } from "@/utils/convertImgToHd"
import { getYear } from "@/utils/unixTimeStampToDate"
import Image from "next/image"
import Link from "next/link"

export async function TopGames() {
  const topGames = await fetchGames(games)

  return (
    <div id="Games">
      <span className="font-semibold text-lg text-white-100 mx-16 responsive:mx-5">
        Hot 100 Games now
      </span>
      <div className="flex flex-wrap items-center gap-8 my-8 mx-16 responsive:gap-4 responsive:mx-5">
        {topGames && topGames.map((game: GameProps) => (
          <Link className="w-[304px] flex items-center rounded-md hover:bg-white-200 responsive:w-full" key={game.id} href={`/game/${game.slug}`}>
            <Image
              className="w-[100px] max-w-full h-[133px] rounded-md"
              src={game.cover.url ? convertImgToHd(game.cover?.url) : "/img-not-found.png"}
              alt={game.name}
              width={215} height={300}
              loading="lazy"
            />
            <div className="w-full text-white-100 px-4">
              <span className="font-normal text-md responsive:text-base small-screen:text-sm">
                {game.name?.length > 65 ?
                  game.name.substring(0, 65).concat('...') : game.name
                }
              </span>
              <p className="font-normal text-sm small-screen:text-xs">
                {getYear(game.first_release_date)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function TopGamesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-56 h-6 bg-slate-700 rounded-full mt-8 mx-16 responsive:mx-5"></div>
      <div className="flex flex-wrap items-center gap-8 my-8 mx-16 responsive:gap-4 responsive:mx-5">
        {[...Array(100)].map((topGames, index) => (
          <div className="w-[304px] flex items-center" key={index}>
            <div className="w-[150px] h-[133px] bg-slate-700 rounded-md"></div>
            <div className="w-full px-4">
              <div className="w-32 h-5 bg-slate-700 rounded-full mb-1 responsive:h-4 small-screen:h-[14px]"></div>
              <div className="w-14 h-[14px] bg-slate-700 rounded-full small-screen:h-[10px]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}