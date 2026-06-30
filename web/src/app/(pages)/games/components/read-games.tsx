'use client'

import { GameQuerySchema } from '@/common/schemas/game.schema'
import { parseSearchParams } from '@/common/utils/search-params-parse.util'
import { ReadGame } from '@/src/components/shared/read-game'
import { useGetGame } from '@/src/hooks/game.hook'
import { useSearchParams } from 'next/navigation'

export function ReadGames() {
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  const { limit = 21, ...params } = parseSearchParams(GameQuerySchema, query)
  const { games, paginate, isFetching } = useGetGame({ limit, ...params })

  return (
    <div className="space-y-8">
      <ReadGame
        games={games}
        variant="grid"
        isLoading={isFetching}
        paginate={paginate}
        skeleton={{
          limit: 21,
          width: 141,
          height: 186,
        }}
      />
    </div>
  )
}
