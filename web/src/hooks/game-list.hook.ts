import { IGameList as List } from '@/common/interfaces/game-list.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { api, api_auth } from '@/common/lib/api.lib'
import {
  GameListCreate,
  GameListQuery as Params,
} from '@/common/schemas/game-list.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { querySuccess } from '@/common/utils/success-query.util'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export function useGetList(userId?: string, params?: Params) {
  const baseUrl = userId ? `/game-list/user/${userId}` : `/game-list`

  const { data, ...query } = useInfiniteQuery({
    queryKey: ['game-list', userId, params],
    queryFn: async ({ pageParam }) => {
      return await api<Response<List[]>>(baseUrl, {
        params: { ...params, page: pageParam },
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({ ...data, gameLists: getNextData(data) }),
  })

  const lists = data?.gameLists
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, lists, loadMore }
}

export function useUpsertList() {
  const queryClient = useQueryClient()
  const queryKey = [['game-list']]

  const { mutateAsync: upsert, isPending } = useMutation({
    mutationFn: async (body: GameListCreate) => {
      return await api_auth<Response<List>>(`/game-list`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
  })

  return { upsert, isPending }
}
