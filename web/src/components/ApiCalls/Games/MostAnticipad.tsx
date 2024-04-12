import { GameProps } from '@/Types/Game';
import { Carousel, CarouselSkeleton } from '@/components/Carousel';
import { TimeCounter } from '@/components/TimeCounter';
import { fetchGames, mostAticipatedBody } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';
import { randomBackground } from '@/utils/randomBackground';
import { getFullFormatedDate } from '@/utils/unixTimeStampToDate';
import Image from 'next/image';
import Link from 'next/link';

export async function MostAnticipated() {
  const mostAnticipated = await fetchGames(mostAticipatedBody)

  return (
    <section className="my-8">
      <div className="flex items-start justify-center gap-8 mx-16 mb-[54px] navbar:flex-wrap responsive:mx-5 responsive:mb-8">
        {mostAnticipated && mostAnticipated.slice(0, 2).map((game: GameProps) => (
          <Link key={game.id} className="max-w-full" href={`/game/${game.slug}`}>
            <div className="relative w-full max-w-[640px]">
              <TimeCounter date={game.first_release_date} />
              <Image
                className="w-[640px] max-w-full h-[240px] relative -z-10 object-cover rounded-lg brightness-[45%] opacity-75 responsive:h-[180px]"
                src={randomBackground(game.screenshots)}
                alt={game.name}
                width={1280} height={720}
                priority
              />
            </div>
            <div className="flex items-end gap-4 small-screen:flex-wrap small-screen:justify-center small-screen:gap-1">
              <Image
                className="w-[136px] max-w-full h-[189px] relative z-0 object-cover rounded-lg -mt-[115px] ml-6 responsive:w-[100px] responsive:h-[133px] responsive:-mt-20 responsive:ml-4"
                src={convertImgToHd(game.cover?.url)}
                alt={game.name}
                width={136} height={189}
                priority
              />
              <div className="cursor-pointer text-white-100 py-2 small-screen:text-center">
                <span className="font-bold text-md responsive:text-base">
                  {game.name.length > 38 ?
                    game.name.substring(0, 35).concat('...') :
                    game.name
                  }
                </span>
                <p className="font-semibold text-base responsive:text-sm">
                  {getFullFormatedDate(game.first_release_date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Carousel>
        {mostAnticipated && mostAnticipated.slice(2, 12).map((game: GameProps) => (
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
    </section>
  )
}

export function MostAnticipatedSkeleton() {
  return (
    <section className="animate-pulse my-8">
      <div className="flex items-center justify-center gap-8 mx-16 mb-[54px] navbar:flex-wrap responsive:mx-5 responsive:mb-8">
        {[...Array(2)].map((mainGame, index) => (
          <div key={index} className="w-full max-w-[640px]">
            <div className="w-full h-[240px] bg-slate-700 rounded-lg brightness-[45%] opacity-75 responsive:h-[180px]"></div>
            <div className="flex items-end gap-4 small-screen:flex-wrap small-screen:justify-center small-screen:gap-1">
              <div className="w-[136px] max-w-full h-[189px] relative z-10 bg-slate-700 rounded-lg -mt-[115px] ml-6 responsive:w-[100px] responsive:h-[133px] responsive:-mt-20 responsive:ml-4"></div>
              <div className="text-white-100 py-2 small-screen:text-center">
                <div className="w-80 max-w-full h-[20px] bg-slate-700 rounded-full mb-4 responsive:h-4"></div>
                <div className="w-36 max-w-full h-4 bg-slate-700 rounded-full responsive:h-[14px]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CarouselSkeleton />
    </section>
  )
}