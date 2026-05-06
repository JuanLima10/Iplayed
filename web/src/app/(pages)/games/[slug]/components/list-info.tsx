'use client'

import { IGameStatusItem } from '@/common/interfaces/game-status.interface'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useCountStatus } from '@/src/hooks/game-status.hook'

export function ListInfo({ slug }: { slug: string }) {
  const { count, isLoading } = useCountStatus(slug)

  const items: IGameStatusItem[] = [
    { key: 'ratings', label: 'Rated by' },
    { key: 'played', label: 'Played by' },
    { key: 'playing', label: 'Playing now' },
    { key: 'wantPlay', label: 'Want to play' },
    { key: 'favorites', label: 'Favorited by' },
    { key: 'abandoned', label: 'Abandoned by' },
  ]

  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>
    )
  }

  if (count) {
    return (
      <div className="space-y-4">
        {items.map(({ key, label }) => {
          const value = Number(count[key] ?? 0)

          if (value <= 0) return null

          return (
            <div key={key} className="flex items-center justify-between gap-2">
              <span className="text-xs text-card-foreground">{label}</span>

              <span className="text-sm font-bold">
                {value} {value === 1 ? 'player' : 'players'}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}
