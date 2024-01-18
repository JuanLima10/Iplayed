import { Pencil, PlusCircle, Twitch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { GalleryScreenshotsGame } from '@/components/ApiCalls/Games/GalleryScreenshotsGame';
import { GraphicGameRatings, GraphicGameRatingsSkeleton } from '@/components/ApiCalls/Games/GraphicGameRatings';
import { InfoGameCard, InfoGameCardSkeleton } from '@/components/ApiCalls/Games/InfoCardGame';
import { InfoStatsGame, InfoStatsGameSkeleton } from '@/components/ApiCalls/Games/InfoStatsGame';
import { ReviewsGameCard, ReviewsGameCardSkeleton } from '@/components/ApiCalls/Games/ReviewsGameCard';
import { ScreenshotGame } from '@/components/ApiCalls/Games/ScreenshotsGame';
import { SimilarGames } from '@/components/ApiCalls/Games/SimilarGames';
import { CarouselGallerySkeleton, CarouselSkeleton } from '@/components/Carousel';
import { GameForm } from '@/components/Form/GameForm';
import { ReadMore } from '@/components/ReadMore';

import { getUser } from '@/lib/auth';

import { GameProps } from '@/Types/Game';
import { ParamsProps } from '@/Types/Params';
import { fetchGame, gameBody } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';
import { findPublisherCompany } from '@/utils/findPublisherCompany';
import { getYear } from '@/utils/unixTimeStampToDate';

export default async function Game({ params }: ParamsProps) {
  const game: GameProps = await fetchGame(gameBody(params.param))

  const user = getUser()
  const igdb = `https://www.igdb.com/games/${game.slug}`
  const twitch = `https://www.twitch.tv/directory/category/${game.slug}`

  return (
    <>
      <div className="w-full relative">
        <ScreenshotGame slug={params.param} />
      </div>

      <header className="max-w-[1440px] flex justify-center gap-8 mx-auto px-16 responsive:gap-[14px] responsive:px-5 small-screen:flex-wrap">
        <div className="flex flex-col items-center gap-[10px] z-0 -mt-36 responsive:min-w-[130px] responsive:-mt-16">
          <Image
            className="aspect-auto max-h-[300px] object-cover rounded-lg shadow-md responsive:max-w-[130px] responsive:max-h-[190px] small-screen:w-full"
            src={convertImgToHd(game.cover?.url)}
            alt={game.name}
            width={255} height={300}
            priority
          />

          <Suspense fallback={<InfoStatsGameSkeleton />}>
            <InfoStatsGame slug={params.param} />
          </Suspense>

          <div className="w-full flex flex-col items-center justify-center gap-4 mt-2">
            {user ?
              <GameForm slug={game.slug} name={game.name} userId={user.sub}>
                <button className="w-full h-12 flex items-center justify-center gap-1 font-semibold text-sm text-black-100 bg-green-300 rounded-full px-4 transition-all hover:brightness-75 responsive:text-xs responsive:h-[30px]">
                  <PlusCircle size={16} /> Rate the game
                </button>
              </GameForm> :
              <Link className="w-full h-12 flex items-center justify-center gap-1 font-semibold text-sm text-black-100 bg-green-300 rounded-full px-4 transition-all hover:brightness-75 responsive:text-xs responsive:h-[30px]" href="/login">
                <PlusCircle size={16} /> Rate the game
              </Link>
            }
            <Link className="w-full h-12 flex items-center justify-center gap-1 font-semibold text-sm text-black-100 bg-blue-300 rounded-full px-4 transition-all hover:brightness-75 responsive:text-xs responsive:h-[30px]" href={user ? `/reviews/${game.slug}/write` : "/login"}>
              <Pencil size={16} /> Write a review
            </Link>
            <a className="w-full h-12 flex items-center justify-center gap-1 font-semibold text-sm text-black-100 bg-purple-twitch rounded-full px-4 transition-all hover:brightness-75 responsive:text-xs responsive:h-[30px]" href={twitch} target='_blank'>
              <Twitch size={16} /> See on Twitch
            </a>
          </div>
        </div>

        <div className="w-full relative flex flex-col items-start justify-between mt-2">
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-xl text-white-100 responsive:text-md">
              {game.name}
              <b className="font-normal text-md ml-1 responsive:text-sm">{getYear(game.first_release_date)}</b>
            </span>
            <span className="font-normal text-sm text-white-100 responsive:text-2xs">
              Published by {' '}
              <b>{findPublisherCompany(game.involved_companies)}</b>
            </span>
            <ReadMore>{game.summary}</ReadMore>
          </div>

          <span className="font-bold text-md mt-4 mb-2 text-white-100 responsive:text-sm responsive:mb-0">Ratings</span>
          <div className="w-full flex items-center justify-center">
            <Suspense fallback={<GraphicGameRatingsSkeleton />}>
              <GraphicGameRatings slug={params.param} />
            </Suspense>
            <div className="w-32 h-full flex flex-col items-center justify-center gap-1 ml-3 navbar:hidden">
              {game.rating && <>
                <span className="font-bold text-xl text-white-100 rounded-full">{game.rating?.toFixed(0)}</span>
                <p className="font-normal text-sm text-center text-white-100">IGBD rating</p></>
              }
              {game.aggregated_rating && <>
                <span className="font-bold text-xl text-white-100 rounded-full">{game.aggregated_rating?.toFixed(0)}</span>
                <p className="font-normal text-sm text-center text-white-100">Critics rating</p></>
              }
            </div>
          </div>
          <a className="font-normal text-sm text-white-100 responsive:text-xs" href={igdb} target='_blank'>
            See more on <b>IGDB</b>
          </a>
        </div>
      </header>

      <main>
        <Suspense fallback={<CarouselGallerySkeleton />}>
          <GalleryScreenshotsGame slug={params.param} />
        </Suspense>

        <section className="w-full max-w-[1440px] flex items-start justify-between gap-6 mx-auto px-16 navbar:flex-col navbar:items-center navbar:gap-0 responsive:mt-2 responsive:px-0">
          <Suspense fallback={<ReviewsGameCardSkeleton />}>
            <ReviewsGameCard
              slug={params.param}
              src={game.cover?.url}
              offset={0} limit={3}
              title profile
            />
          </Suspense>

          <div className="mb-4">
            <span className="font-semibold text-md text-white-100 responsive:mx-5">
              Informations
            </span>
            <Suspense fallback={<InfoGameCardSkeleton />}>
              <InfoGameCard slug={params.param} />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="max-w-[1440px] my-4 mx-auto responsive:mx-auto">
        <span className="font-bold text-md text-white-100 ml-16 responsive:ml-5">Recomendations</span>
        <Suspense fallback={<CarouselSkeleton />}>
          <SimilarGames slug={params.param} />
        </Suspense>
      </footer>
    </>
  )
}