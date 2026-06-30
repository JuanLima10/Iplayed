import { cn } from '@/common/utils/cn.util'
import { buttonVariants } from '@/src/components/ui/button'
import { status_api } from '@/src/services/game-status.service'
import Link from 'next/link'
import { Followers } from './followers'
import { Following } from './following'

export async function Stats(props: { userId: string; tab?: string }) {
  const { userId, tab } = props

  const status = await status_api.count(userId)
  const { playing, played, favorites, reviews, wantPlay } = status

  const stats = [
    { label: 'Playing', value: playing },
    { label: 'Played', value: played },
    { label: 'Favorites', value: favorites },
    { label: 'Wishes', value: wantPlay },
    { label: 'Reviews', value: reviews },
  ]

  const btnVariant = (value: string) => {
    return cn(
      'border border-secondary/30 bg-secondary/20 text-secondary',
      buttonVariants({ variant: tab === value ? 'ghost' : 'outline' })
    )
  }

  return (
    <div className="space-y-4 sm:space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-2 xs:justify-start">
        <Followers userId={userId} /> •
        <Following userId={userId} />
      </div>
      <div className="no-scrollbar flex items-center gap-2 overflow-auto sm:px-0">
        <Link href="?tab=overview" className={btnVariant('overview')}>
          Overview
        </Link>

        {stats.map(({ label, value }) => {
          const lowerLabel = label.toLowerCase()
          const href = `?tab=${lowerLabel}`

          return (
            <Link key={label} href={href} className={btnVariant(lowerLabel)}>
              {value} {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
