import Image from "next/image"
import { Suspense } from "react"

import { ReviewsGameCard, ReviewsGameCardSkeleton } from "@/components/ApiCalls/Games/ReviewsGameCard"
import { fetchGame, gameBody } from "@/lib/igdb"

import { GameProps } from "@/Types/Game"
import { ParamsProps } from "@/Types/Params"
import { convertImgToHd } from "@/utils/convertImgToHd"

export const metadata = {  title: 'Game reviews' }

export default async function SlugReviews({ params }: ParamsProps) {
  const game: GameProps = await fetchGame(gameBody(params.param))

  if (game) {
    return (
      <main className="max-w-[1440px] flex flex-wrap items-start justify-center gap-8 mx-auto pt-28 px-16 responsive:px-5">
        <Image
          className="aspect-auto max-w-full rounded-lg shadow-md"
          src={convertImgToHd(game.cover.url)}
          alt={game.name}
          width={255} height={300}
        />
        <section>
          <span className="font-bold text-xl text-white-100 responsive:text-md">{game.name}</span>
          <div className="w-[800px] flex flex-col justify-center items-center gap-4 mt-4 navbar:w-full">
            <Suspense fallback={<ReviewsGameCardSkeleton />}>
              <ReviewsGameCard
                slug={params.param}
                src={game.cover.url} 
                offset={0}
                limit={6}
                profile
              />
            </Suspense>
          </div>
        </section>
      </main>
    )
  }
  
  return <span className="fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 font-bold text-xl text-center text-white-200">Game not found</span>
}