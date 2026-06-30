import {
  IGameStatus as Status,
  IGameStatusCount as StatusCount,
  IGameStatusRating as StatusRating,
} from '@/common/interfaces/game-status.interface'
import { IResponse as Response } from '@/common/interfaces/response.interface'
import { api, api_auth } from '@/common/lib/api.lib'
import {
  GameStatusQuery as Params,
  GameStatusCreate as StatusCreate,
} from '@/common/schemas/game-status.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { querySuccess } from '@/common/utils/success-query.util'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export function useCountStatus(param: string) {
  const { data, ...query } = useQuery({
    queryKey: ['status-count', param],
    queryFn: async () => {
      return await api<StatusCount>(`/game-status/count/${param}`)
    },
    placeholderData: (prev) => prev,
  })

  return { ...query, count: data }
}

export function useRatingStatus(slug: string) {
  const { data, ...query } = useQuery({
    queryKey: ['status-rating', slug],
    queryFn: async () => {
      return await api<StatusRating>(`/game-status/rating/${slug}`)
    },
    placeholderData: (prev) => prev,
  })

  return { ...query, rating: data }
}

export function useGetUserStatus(userId: string, params?: Params) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ['status-user', userId, params],
    queryFn: async ({ pageParam }) => {
      return await api<Response<Status[]>>(`/game-status/${userId}`, {
        params: { ...params, page: pageParam },
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({ ...data, status: getNextData(data) }),
  })

  const status = data?.status
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, status, loadMore }
}

export function useUpsertStatus() {
  const queryClient = useQueryClient()
  const queryKey = [['status-user'], ['status-count']]

  const { mutateAsync: upsert, isPending } = useMutation({
    mutationFn: async (body: StatusCreate) => {
      return await api_auth<Response<Status>>(`/game-status`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
  })

  return { upsert, isPending }
}
