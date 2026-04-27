'use client'

import { IPaginateProps } from '@/common/interfaces/paginate.interface'
import { cn } from '@/common/utils/cn.util'
import { getPage } from '@/common/utils/page-get.util'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '../ui/button'

export function Paginate({
  paginate,
  param = 'page',
  className,
}: IPaginateProps) {
  if (paginate) {
    const { push } = useRouter()
    const searchParams = useSearchParams()

    const { page, pages } = paginate

    const navigate = useCallback(
      (p: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(param, String(p))
        push(`?${params.toString()}`, { scroll: false })
      },
      [push, searchParams, param]
    )

    if (pages <= 1) return null

    const pageNumbers = getPage(page, pages)

    return (
      <nav
        className={cn(
          'flex items-center justify-center gap-1 px-5 sm:justify-end sm:px-8',
          className
        )}
        aria-label="Pagination"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => navigate(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} suppressHydrationWarning />
        </Button>

        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span
              className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
              key={`ellipsis-${i}`}
            >
              <MoreHorizontal size={16} suppressHydrationWarning />
            </span>
          ) : (
            <Button
              className="size-10"
              key={p}
              onClick={() => navigate(p)}
              variant={p === page ? 'default' : 'outline'}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Button>
          )
        )}

        <Button
          size="icon"
          variant="outline"
          onClick={() => navigate(page + 1)}
          disabled={page >= pages}
          aria-label="Next page"
        >
          <ChevronRight size={16} suppressHydrationWarning />
        </Button>
      </nav>
    )
  }
}
