import {
  REVIEW_ORDER_BY_OPTIONS,
  ReviewOrderBy,
} from '@/common/interfaces/review.interface'
import { IFilters } from '@/common/interfaces/search-params.interface'
import { ReviewQuerySchema } from '@/common/schemas/review.schema'
import {
  CardReview,
  CardReviewContent,
  CardReviewCover,
  CardReviewHeader,
  CardReviewText,
} from '@/src/components/shared/card-review'
import { Order } from '@/src/components/shared/order'
import { OrderBy } from '@/src/components/shared/order-by'
import { Search } from '@/src/components/shared/search'
import { SectionTitle } from '@/src/components/shared/section-title'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion'
import { review_api } from '@/src/services/review.service'

export async function Reviews(props: { userId: string; filters?: IFilters }) {
  const { userId, filters } = props

  const params = ReviewQuerySchema.parse(filters)
  const reviews = await review_api.getByUser(userId, params)

  const filter = (
    <>
      <Order />
      <OrderBy
        options={REVIEW_ORDER_BY_OPTIONS}
        defaultValue={ReviewOrderBy.CREATED_AT}
      />
    </>
  )

  return (
    <section className="mx-auto max-w-360 space-y-6 px-5 lg:px-24">
      <SectionTitle>Review</SectionTitle>

      <div className="md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="filters">
            <AccordionTrigger>Filters</AccordionTrigger>

            <AccordionContent className="flex h-full w-full flex-col gap-4">
              {filter}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-wrap gap-4 md:flex-nowrap md:gap-8">
        <div className="w-full space-y-6 md:w-fit">
          <div className="w-full space-y-3 md:w-fit">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Search
            </h3>
            <Search isInput />
          </div>
          <aside className="hidden max-w-60 md:flex md:min-w-60 md:flex-col md:gap-6">
            {filter}
          </aside>
        </div>

        <div className="w-full space-y-6">
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
    </section>
  )
}
