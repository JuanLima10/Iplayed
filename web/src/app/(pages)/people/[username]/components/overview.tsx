import { GameStatusOrderBy as OrderBy } from '@/common/interfaces/game-status.interface'
import { mapGameList } from '@/common/utils/game-list-mapper.util'
import {
  CardReview,
  CardReviewContent,
  CardReviewCover,
  CardReviewHeader,
  CardReviewText,
} from '@/src/components/shared/card-review'
import { ReadGame } from '@/src/components/shared/read-game'
import { ReadList } from '@/src/components/shared/read-list'
import { SectionTitle } from '@/src/components/shared/section-title'
import { list_api } from '@/src/services/game-list.service'
import { status_api } from '@/src/services/game-status.service'
import { review_api } from '@/src/services/review.service'
import { Best } from './best'

export async function Overview({ userId }: { userId: string }) {
  const best = await status_api.getByUser(userId, {
    isBest: true,
    order: 'asc',
    orderBy: OrderBy.BEST,
    limit: 4,
  })
  const fav = await status_api.getByUser(userId, {
    isFavorite: true,
    orderBy: OrderBy.UPDATED_AT,
    limit: 4,
  })

  const reviews = await review_api.getByUser(userId, { limit: 4 })
  const lists = await list_api.getByUser(userId, { limit: 8 })

  return (
    <div className="mx-auto flex max-w-360 flex-wrap justify-center gap-12 px-5 lg:flex-nowrap lg:px-24">
      <section className="space-y-6">
        {best.data.length > 0 && <Best best={best.data} />}
        {fav.data.length > 0 && (
          <>
            <SectionTitle action="View more" href="?tab=favorites">
              Favorites
            </SectionTitle>
            <ReadGame
              variant="horizontal"
              games={mapGameList(fav.data)}
              skeleton={{ width: 180, height: 260 }}
            />
          </>
        )}

        <SectionTitle action="Read more" href="?tab=reviews">
          Reviews
        </SectionTitle>
        {reviews?.data?.map(({ user, status, game, ...review }) => (
          <CardReview key={review.id}>
            <CardReviewContent>
              <CardReviewHeader {...user} {...status} />
              <CardReviewText {...user} {...game} {...status} {...review} />
            </CardReviewContent>
            <CardReviewCover {...game} />
          </CardReview>
        ))}
      </section>

      <aside className="mt-1 w-full space-y-10 sm:flex-2">
        <ReadList lists={lists} />
      </aside>
    </div>
  )
}
