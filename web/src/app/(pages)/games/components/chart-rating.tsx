import Star from '@/public/icons/star'
import { ChartBar } from '@/src/components/ui/chart'
import { Stars } from '@/src/components/ui/stars'
import { status_api } from '@/src/services/game-status.service'

export async function ChartRating({ slug }: { slug: string }) {
  const rating = await status_api.rating(slug)

  if (rating.avg !== null) {
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
