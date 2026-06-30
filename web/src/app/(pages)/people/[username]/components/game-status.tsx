import { GameStatusOrderBy } from '@/common/interfaces/game-status.interface'
import { IFilters } from '@/common/interfaces/search-params.interface'
import {
  GAME_STATUS_ORDER_BY_OPTIONS,
  GameStatusQuerySchema,
} from '@/common/schemas/game-status.schema'
import { USER_TABS_CONFIG, UserTab } from '@/common/schemas/user.schema'
import { mapGameList } from '@/common/utils/game-list-mapper.util'
import { Order } from '@/src/components/shared/order'
import { OrderBy } from '@/src/components/shared/order-by'
import { ReadGame } from '@/src/components/shared/read-game'
import { Search } from '@/src/components/shared/search'
import { SectionTitle } from '@/src/components/shared/section-title'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion'
import { status_api } from '@/src/services/game-status.service'

export async function GameStatus(props: {
  userId: string
  tab: UserTab
  filters?: IFilters
}) {
  const { userId, tab, filters } = props

  const { params: tabs, label } = USER_TABS_CONFIG[tab]
  if (!tabs) return null

  const params = { ...tabs, ...filters }
  const parsedQuery = GameStatusQuerySchema.parse(params)
  const games = await status_api.getByUser(userId, parsedQuery)

  const { data, paginate } = games
  const gameData = { games: mapGameList(data), paginate }

  const filter = (
    <>
      <Order />
      <OrderBy
        options={GAME_STATUS_ORDER_BY_OPTIONS}
        defaultValue={GameStatusOrderBy.CREATED_AT}
      />
    </>
  )

  return (
    <section className="mx-auto max-w-360 space-y-6 px-5 lg:px-24">
      <SectionTitle>{label}</SectionTitle>

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

        {!games.data?.length && (
          <div className="flex w-full justify-center">
            <h1 className="text-3xl font-semibold">No games found</h1>
          </div>
        )}
        <ReadGame variant="grid" {...gameData} />
      </div>
    </section>
  )
}
