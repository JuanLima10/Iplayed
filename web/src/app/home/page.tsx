import { BestRatingsGames } from '@/components/ApiCalls/Home/BestRatingsGames';
import { PopularGames } from '@/components/ApiCalls/Home/PopularGames';
import { CarouselSkeleton } from '@/components/Carousel';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col max-w-[2160px] mx-auto pt-[77px]">
      <header className="mt-10 mx-16 responsive:mx-5">
        <span className="font-bold text-xl text-white-100 responsive:text-lg">Hello,
          <b className="text-blue-300"> Player</b>!
        </span>
        <p className="font-normal text-lg text-white-100 responsive:text-sm">
          Let&apos;s review some game today...
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mt-8 mx-16 responsive:mx-5">
          <span className="font-semibold text-md text-white-100">
            Popular Games
          </span>
          <a href="/games#Games" className="font-normal text-sm text-green-300 hover:underline">
            See more +
          </a>
        </div>
        <Suspense fallback={<CarouselSkeleton />}>
          <PopularGames />
        </Suspense>
      </section>

      <section className="mb-4">
        <div className="flex items-center justify-between mt-8 mx-16 responsive:mx-5">
          <span className="font-semibold text-md text-white-100">
            Best Ratings
          </span>
          <a href="/games#Games" className="font-normal text-sm text-green-300 hover:underline">
            See more +
          </a>
        </div>
        <Suspense fallback={<CarouselSkeleton />}>
          <BestRatingsGames />
        </Suspense>
      </section>
    </main>
  )
}
