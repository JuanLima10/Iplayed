import {
  CardReview,
  CardReviewContent,
  CardReviewCover,
  CardReviewHeader,
  CardReviewText,
} from '@/src/components/shared/card-review'
import { review_api } from '@/src/services/review.service'
import Link from 'next/link'

export async function Review() {
  const reviews = await review_api.get({ limit: 4 })

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-card-foreground sm:text-3xl">
            Recent reviews
          </h1>
          <hr className="w-8 border-2 border-primary" />
        </div>

        <Link className="text-sm text-primary hover:underline" href="/people">
          Read more
        </Link>
      </div>

      <div className="space-y-6">
        {reviews?.data?.map(({ user, status, game, ...review }) => (
          <CardReview key={review.id}>
            <CardReviewContent>
              <CardReviewHeader {...user} {...status} />
              <CardReviewText {...user} {...game} {...status} {...review} />
            </CardReviewContent>
            <CardReviewCover {...game} />
          </CardReview>
        ))}
      </div>
    </div>
  )
}
