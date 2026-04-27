'use client'

import { GameOrderBy } from '@/common/interfaces/game.interface'
import { cn } from '@/common/utils/cn.util'
import { Button } from '@/src/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const OPTIONS = [
  { label: 'Popularity', value: GameOrderBy.POPULAR },
  { label: 'Highest Rated', value: GameOrderBy.RATING },
  { label: 'Most anticipated', value: GameOrderBy.AWAITED },
  { label: 'Release Date', value: GameOrderBy.RELEASE_DATE },
]

export function OrderTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current = searchParams.get('orderBy') ?? GameOrderBy.POPULAR

  function getDefaultOrder(orderBy: GameOrderBy) {
    if (
      orderBy === GameOrderBy.RELEASE_DATE ||
      orderBy === GameOrderBy.AWAITED
    ) {
      return 'asc'
    }

    return 'desc'
  }

  function onChange(value: GameOrderBy) {
    const params = new URLSearchParams(searchParams.toString())

    params.set('orderBy', value)
    params.set('order', getDefaultOrder(value))
    params.delete('page')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex w-fit flex-wrap rounded-lg bg-muted p-1">
      {OPTIONS.map((opt) => {
        const active = current === opt.value

        return (
          <Button
            variant="ghost"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition',
              active
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {opt.label}
          </Button>
        )
      })}
    </div>
  )
}
