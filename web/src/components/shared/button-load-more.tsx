'use client'

import { Button, IButton } from '@/src/components/ui/button'
import { Loader2 } from 'lucide-react'

export function ButtonLoadMore({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  ...props
}: {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
} & IButton) {
  if (!hasNextPage) return null

  return (
    <Button onClick={fetchNextPage} disabled={isFetchingNextPage} {...props}>
      {isFetchingNextPage ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        'See More'
      )}
    </Button>
  )
}
