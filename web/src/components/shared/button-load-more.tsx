'use client'

import { Button, IButton } from '@/src/components/ui/button'

export function ButtonLoadMore({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  type,
  ...props
}: {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
} & IButton) {
  if (!hasNextPage) return null

  return (
    <Button
      type="button"
      onClick={fetchNextPage}
      loading={isFetchingNextPage}
      {...props}
    >
      See More
    </Button>
  )
}
