'use client'

import { GameQuerySchema } from '@/common/schemas/game.schema'
import { parseSearchParams } from '@/common/utils/search-params-parse.util'
import { Paginate } from '@/src/components/shared/paginate'
import { Cover, CoverSkeleton } from '@/src/components/ui/cover'
import { useGetGame } from '@/src/hooks/game.hook'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ReadGames() {
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  const { limit = 21, ...params } = parseSearchParams(GameQuerySchema, query)
  const { games, paginate, isFetching } = useGetGame({ limit, ...params })

  return (
    <div className="space-y-8">
      <div className="flex min-h-98 flex-wrap items-start justify-center gap-3 sm:justify-start">
        {isFetching && <CoverSkeleton limit={21} width={141} height={186} />}
        {!isFetching &&
          games?.map(({ igdbId, slug, title, coverUrl }) => (
            <Link key={igdbId} href={`/games/${slug}`}>
              <Cover src={coverUrl} alt={title} width={141} height={196} />
            </Link>
          ))}
      </div>
      <Paginate paginate={paginate} disabled={isFetching} />
    </div>
  )
}
