import { GameOrderBy } from '@/common/interfaces/game.interface'
import { formatDateLong } from '@/common/utils/date.util'
import { Countdown } from '@/src/components/shared/countdown'
import { Cover } from '@/src/components/ui/cover'
import { game_api } from '@/src/services/game.service'
import { Clock2 } from 'lucide-react'
import Link from 'next/link'

export async function MostAnteciped() {
  const games = await game_api.get({
    orderBy: GameOrderBy.AWAITED,
    order: 'asc',
    limit: 2,
  })

  return (
    <div className="w-93.5 max-w-full">
      <div className="space-y-6">
        <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Clock2 className="text-primary" suppressHydrationWarning />
          Most anteciped
        </h1>

        <div className="flex flex-wrap gap-4">
          {games?.data.map(({ slug, coverUrl, title, releaseDate }) => (
            <Link key={slug} href={`/games/${slug}`} className="relative">
              <Cover
                className="max-h-35 opacity-45"
                src={coverUrl}
                alt="background"
                width={375}
                height={140}
              />
              <div className="absolute inset-0 mb-12 flex items-center justify-center">
                <Countdown releaseDate={releaseDate ?? ''} />
              </div>
              <div className="-mt-8 flex items-end px-3">
                <Cover src={coverUrl} alt={slug} width={80} height={110} />
                <div className="w-full p-2 text-foreground">
                  <span className="text-sm font-bold">{title}</span>
                  <p className="text-xs font-medium">
                    {formatDateLong(releaseDate)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
