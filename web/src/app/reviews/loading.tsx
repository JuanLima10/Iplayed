import { ReviewsGameCardSkeleton } from '@/components/ApiCalls/Games/ReviewsGameCard';
import { CarouselSkeleton } from '@/components/Carousel';

export default function LoadingReviewPage() {
  return (
    <main className="w-full max-w-[1440px] mx-auto animate-pulse mt-16 pt-32 responsive:pt-24">
      <section>
        <div className="w-36 h-5 bg-slate-700 rounded-xl mt-10 mx-16 responsive:mt-8 responsive:mx-5"></div>
        <CarouselSkeleton />
      </section>
      <section className="py-8 px-16 responsive:px-5">
        <div className="w-36 h-5 bg-slate-700 rounded-xl mb-8 responsive:mt-8 responsive:mx-5"></div>
        <ReviewsGameCardSkeleton />
      </section>
    </main>
  )
}