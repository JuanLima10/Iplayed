'use client'

import { IPaginate } from '@/common/interfaces/paginate.interface'
import { cn } from '@/common/utils/cn.util'
import Star from '@/public/icons/star'
import { Cover, CoverSkeleton } from '@/src/components/ui/cover'
import Link from 'next/link'
import { Paginate } from './paginate'

export interface ListGameItem {
  igdbId: number
  slug: string
  title: string
  coverUrl: string
  rating?: number
  progress?: number
}

interface ListGameProps {
  games?: ListGameItem[]
  variant?: 'horizontal' | 'grid'
  className?: string
  isLoading?: boolean
  paginate?: IPaginate
  skeleton?: { limit?: number; width: number; height: number }
}

export function ReadGame({
  games = [],
  variant = 'horizontal',
  isLoading = false,
  paginate,
  skeleton,
  className,
}: ListGameProps) {
  const isGrid = variant === 'grid'
  const containerClass = isGrid
    ? 'flex min-h-98 flex-wrap items-start justify-center gap-3 sm:justify-start'
    : 'flex justify-center gap-2.5 md:justify-start'

  return (
    <div className={cn(isGrid ? 'space-y-8' : 'space-y-4', className)}>
      <div className={containerClass}>
        {isLoading && skeleton && (
          <CoverSkeleton
            limit={skeleton.limit ?? 10}
            width={skeleton.width}
            height={skeleton.height}
          />
        )}

        {!isLoading &&
          games.map(({ igdbId, slug, title, coverUrl, rating, progress }) => {
            return (
              <Link key={igdbId} href={`/games/${slug}`}>
                <div className="relative">
                  <Cover
                    className="max-w-full"
                    src={coverUrl}
                    alt={title}
                    width={skeleton?.width ?? 150}
                    height={skeleton?.height ?? 220}
                  />
                  <GameStats rating={rating} progress={progress} />
                </div>
              </Link>
            )
          })}
      </div>

      {paginate && <Paginate paginate={paginate} disabled={isLoading} />}
    </div>
  )
}

export function GameStats({
  rating,
  progress,
}: {
  rating?: number
  progress?: number
}) {
  if (rating == null && progress == null) return null

  return (
    <>
      {rating != null && (
        <div className="absolute top-1.5 left-1.5 flex gap-1 rounded-md bg-card px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
          <Star fill="full" size="sm" /> {rating.toFixed(1)}
        </div>
      )}

      {progress != null && (
        <div className="absolute right-0 bottom-0 left-0 px-2.5 py-1.5">
          <div className="h-1.5 w-full rounded-full bg-accent">
            <div
              className={cn('h-full rounded-full bg-primary transition-all')}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </>
  )
}
