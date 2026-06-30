import { IGame as Game } from '@/common/interfaces/game.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { api } from '@/common/lib/api.lib'
import { GameQuery as Params } from '@/common/schemas/game.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export function useGetGame(params?: Params) {
  const { data, ...query } = useQuery({
    queryKey: ['games', params],
    queryFn: async () => {
      return await api<Response<Game[]>>(`/game`, { params })
    },
    placeholderData: (prev) => prev,
  })

  const games = data?.data
  const paginate = data?.paginate

  return { ...query, games, paginate }
}

export function useGetGames(params?: Params) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ['search-games', params],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await api<Response<Game[]>>(`/game`, {
        params: { ...params, page: pageParam },
      })
    },
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({ ...data, games: getNextData(data) }),
  })

  const games = data?.games
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, games, loadMore }
}
