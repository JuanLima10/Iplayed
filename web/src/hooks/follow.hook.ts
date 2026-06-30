import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IUser as Follow } from '@/common/interfaces/user.interface'
import { api, api_auth } from '@/common/lib/api.lib'
import { toastError } from '@/common/lib/toast-error.lib'
import {
  FollowCreate,
  FollowQuery as Params,
} from '@/common/schemas/follow.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { querySuccess } from '@/common/utils/success-query.util'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export function useGetFollowing(userId: string, params?: Params) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ['following', userId],
    queryFn: async ({ pageParam }) => {
      return await api<Response<Follow[]>>(`/follow/following/${userId}`, {
        params: { ...params, page: pageParam },
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({
      ...data,
      count: data.pages[0].paginate?.count,
      gameFollowing: getNextData(data),
    }),
  })

  const count = data?.count ?? 0
  const following = data?.gameFollowing
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, following, count, loadMore }
}

export function useGetFollowers(userId: string, params?: Params) {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam }) => {
      return await api<Response<Follow[]>>(`/follow/followers/${userId}`, {
        params: { ...params, page: pageParam },
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({
      ...data,
      count: data.pages[0].paginate?.count,
      gameFollowers: getNextData(data),
    }),
  })

  const count = data?.count ?? 0
  const followers = data?.gameFollowers
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, followers, count, loadMore }
}

export function useCreateFollow() {
  const queryClient = useQueryClient()
  const queryKey = [['following'], ['followers']]

  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: async ({ userId }: FollowCreate) => {
      return await api_auth<Response<Follow>>(`/follow/${userId}`, {
        method: 'POST',
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
    onError: toastError,
  })

  return { create, isPending }
}

export function useRemoveFollow() {
  const queryClient = useQueryClient()
  const queryKey = [['following'], ['followers']]

  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: async ({ userId }: FollowCreate) => {
      return await api_auth<Response<Follow>>(`/follow/${userId}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
    onError: toastError,
  })

  return { remove, isPending }
}
