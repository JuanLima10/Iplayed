import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IReview as Review } from '@/common/interfaces/review.interface'
import api from '@/common/lib/api.lib'
import { ReviewQuery as Params } from '@/common/schemas/review.schema'
import { getNextData } from '@/common/utils/next-data-get.util'
import { getNextPage } from '@/common/utils/next-page-get.util'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useGetReview(slug?: string, params?: Params) {
  const baseUrl = slug ? `/review/slug/${slug}` : `/review`

  const { data, ...query } = useInfiniteQuery({
    queryKey: ['reviews', slug, params],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<Response<Review[]>>(baseUrl, {
        params: { ...params, page: pageParam },
      })
      return data
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
