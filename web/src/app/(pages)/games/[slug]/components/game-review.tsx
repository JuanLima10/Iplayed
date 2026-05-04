'use client'

import { ButtonLoadMore } from '@/src/components/shared/button-load-more'
import {
  CardReview,
  CardReviewContent,
  CardReviewHeader,
  CardReviewSkeleton,
  CardReviewText,
} from '@/src/components/shared/card-review'
import { useGetReview } from '@/src/hooks/review.hook'

export function GameReview({ slug }: { slug: string }) {
  const { reviews, loadMore, isLoading } = useGetReview(slug, { limit: 4 })

  const title = (
    <div className="flex items-end gap-3">
      <h1 className="text-2xl font-bold text-card-foreground">Reviews</h1>
      <hr className="mb-2.5 w-12 border-2 border-primary" />
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-8">
        {title}
        <div className="flex flex-col items-center gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardReviewSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (reviews && reviews?.length > 0) {
    return (
      <div className="flex w-full flex-col gap-8">
        {title}
        <div className="flex flex-col items-center gap-6">
          {reviews.map(({ user, status, game, ...review }) => (
            <CardReview key={review.id}>
              <CardReviewContent className="min-h-full">
                <CardReviewHeader {...user} {...status} />
                <CardReviewText {...user} {...game} {...status} {...review} />
              </CardReviewContent>
            </CardReview>
          ))}

          <ButtonLoadMore variant="link" {...loadMore} />
        </div>
      </div>
    )
  }
}
