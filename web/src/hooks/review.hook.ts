import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IReview as Review } from '@/common/interfaces/review.interface'
import { api, api_auth } from '@/common/lib/api.lib'
import {
  ReviewQuery as Params,
  ReviewCreate,
} from '@/common/schemas/review.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { querySuccess } from '@/common/utils/success-query.util'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export function useGetReview(slug?: string, params?: Params) {
  const baseUrl = slug ? `/review/slug/${slug}` : `/review`

  const { data, ...query } = useInfiniteQuery({
    queryKey: ['reviews', slug, params],
    queryFn: async ({ pageParam }) => {
      return await api<Response<Review[]>>(baseUrl, {
        params: { ...params, page: pageParam },
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ paginate }) => getNextPage(paginate),
    select: (data) => ({ ...data, reviews: getNextData(data) }),
  })

  const reviews = data?.reviews
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query
  const loadMore = { fetchNextPage, hasNextPage, isFetchingNextPage }

  return { ...query, reviews, loadMore }
}

export function useUpsertReview() {
  const queryClient = useQueryClient()
  const queryKey = [['review'], ['status-count'], ['status-rating']]

  const { mutateAsync: upsert, isPending } = useMutation({
    mutationFn: async (body: ReviewCreate) => {
      return await api_auth<Response<Review>>(`/review`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
    onSuccess: () => querySuccess(queryClient, queryKey),
  })

  return { upsert, isPending }
}
