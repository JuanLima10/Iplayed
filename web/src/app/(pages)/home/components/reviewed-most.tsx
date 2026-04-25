import { ReviewDateRange } from '@/common/interfaces/review.interface'
import { Cover } from '@/src/components/ui/cover'
import { review_api } from '@/src/services/review.service'
import Link from 'next/link'

export async function MostReviewed() {
  const range = ReviewDateRange.MONTH
  const reviews = await review_api.most({ range, limit: 4 })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-card-foreground sm:text-3xl">
            Most reviewed this {range}
          </h1>
          <hr className="w-8 border-2 border-primary" />
        </div>

        <Link className="text-sm text-primary hover:underline" href="/people">
          View all
        </Link>
      </div>

      <div className="flex gap-2 sm:gap-6">
        {reviews?.data?.map(({ game }) => (
          <Link key={game.igdbId} href={`/games/${game.slug}`}>
            <Cover
              className="w-full"
              src={game.coverUrl}
              alt={game.title}
              width={183}
              height={274}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
