'use client'
import Star from '@/public/icons/star'
import { ChartBar, ChartBarSkeleton } from '@/src/components/ui/chart'
import { Stars } from '@/src/components/ui/stars'
import { useRatingStatus } from '@/src/hooks/game-status.hook'

export function ChartRating({ slug }: { slug: string }) {
  const { rating, isLoading } = useRatingStatus(slug)

  if (isLoading) {
    return <ChartBarSkeleton />
  }

  if (rating) {
    return (
      <div className="flex w-full items-end justify-center gap-1">
        <Star fill="full" size="sm" />

        <ChartBar {...rating} />

        <div className="flex flex-col items-center gap-1 pb-1">
          <h1 className="text-4xl font-bold">{rating.avg}</h1>
          <Stars size="sm" value={rating.avg} disabled />
        </div>
      </div>
    )
  }
}
