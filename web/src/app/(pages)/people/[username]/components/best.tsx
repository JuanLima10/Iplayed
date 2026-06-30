import { IGameStatus } from '@/common/interfaces/game-status.interface'
import { SectionTitle } from '@/src/components/shared/section-title'
import { Cover } from '@/src/components/ui/cover'
import clsx from 'clsx'
import { Crown } from 'lucide-react'
import Link from 'next/link'

export function Best({ best }: { best: IGameStatus[] }) {
  return (
    best?.length > 0 && (
      <>
        <SectionTitle>GOATs</SectionTitle>
        <div className="flex justify-center gap-2.5 lg:justify-start">
          {best.map(({ game, best }, index) => (
            <Link
              className="relative"
              key={game?.slug}
              href={`/games/${game?.slug}`}
            >
              {best && <BestBadge position={best} />}
              <Cover
                className="max-w-full"
                src={game?.coverUrl}
                alt={`Top ${index + 1}`}
                width={180}
                height={260}
              />
            </Link>
          ))}
        </div>
      </>
    )
  )
}

export function BestBadge({ position }: { position: number }) {
  return (
    <div
      className={clsx(
        'absolute top-1.5 left-1.5 z-10 flex h-7 min-w-7 items-center justify-center gap-1 rounded-full px-1.5 text-xs font-bold shadow',
        position === 1
          ? 'bg-primary text-primary-foreground'
          : 'bg-card text-foreground'
      )}
    >
      {position === 1 ? (
        <Crown className="size-3.5" suppressHydrationWarning />
      ) : (
        <span>#{position}</span>
      )}
    </div>
  )
}
