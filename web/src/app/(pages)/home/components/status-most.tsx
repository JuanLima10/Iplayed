import {
  GameStatusDateRange,
  GameStatusProgress,
  StatusProgressIcon,
  StatusProgressLabel,
} from '@/common/interfaces/game-status.interface'
import { TooltipTruncate } from '@/src/components/shared/tooltip-truncate'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { Cover } from '@/src/components/ui/cover'
import { status_api } from '@/src/services/game-status.service'
import Link from 'next/link'

export async function MostStatus() {
  const status = GameStatusProgress.COMPLETED
  const range = GameStatusDateRange.MONTH
  const Icon = StatusProgressIcon[status]

  const games = await status_api.most({ status, range, limit: 3 })

  return (
    <Card className="w-93.5 max-w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="text-primary" suppressHydrationWarning />{' '}
          {StatusProgressLabel[status]} of the {range}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {games?.map(({ game, status: count }) => (
          <Link
            className="flex items-start rounded-lg hover:bg-background"
            key={game.id}
            href={`/games/${game.slug}`}
          >
            <Cover
              src={game.coverUrl}
              alt={game.title}
              width={62}
              height={78}
              isText={false}
            />
            <div className="p-4">
              <TooltipTruncate
                className="font-bold"
                text={game.title}
                maxLength={28}
              />
              <p className="text-xs text-secondary lowercase">
                {count} {count > 1 ? 'players' : 'player'}{' '}
                {StatusProgressLabel[status]} this {range}
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
