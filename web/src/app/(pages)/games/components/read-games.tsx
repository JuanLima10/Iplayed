import { ISearchParams } from '@/common/interfaces/search-params.interface'
import { GameQuerySchema } from '@/common/schemas/game.schema'
import { parseSearchParams } from '@/common/utils/search-params-parse.util'
import { Paginate } from '@/src/components/shared/paginate'
import { Cover } from '@/src/components/ui/cover'
import { game_api } from '@/src/services/game.service'
import Link from 'next/link'

export async function ReadGames({ searchParams }: ISearchParams) {
  const query = await searchParams
  const { limit = 12, ...params } = parseSearchParams(GameQuerySchema, query)
  const games = await game_api.get({ ...params, limit })

  return (
    <div className="space-y-8">
      <div className="flex min-h-98 flex-wrap items-start justify-center gap-3">
        {games?.data.map(({ igdbId, slug, title, coverUrl }) => (
          <Link key={igdbId} href={`/games/${slug}`}>
            <Cover src={coverUrl} alt={title} width={141} height={196} />
          </Link>
        ))}
      </div>
      <Paginate paginate={games?.paginate} />
    </div>
  )
}
