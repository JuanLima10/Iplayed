import { Suspense } from 'react'

import { MostReviewedGames } from '@/components/ApiCalls/Reviews/MostReviewedGames'
import { RecentReviewsCard, RecentReviewsCardSkeleton } from '@/components/ApiCalls/Reviews/RecentReviewsCard'
import { CarouselSkeleton } from '@/components/Carousel'

export const metadata = { title: 'Reviews' }

export default async function Reviews() {
  return (
    <main className="w-full max-w-[1440px] mx-auto pt-32 responsive:pt-24">
      <section>
        <span className="font-semibold text-md text-white-100 mx-16 mb-8 responsive:mx-5">Most Reviewed</span>
        <Suspense fallback={<CarouselSkeleton />}>
          <MostReviewedGames />
        </Suspense>
      </section>
      <section className="py-8 px-16 responsive:px-5">
        <span className="font-semibold text-md text-white-100">Recent Reviews</span>
        <div className="mt-8">
          <Suspense fallback={<RecentReviewsCardSkeleton />}>
            <RecentReviewsCard offset={0} limit={6} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}