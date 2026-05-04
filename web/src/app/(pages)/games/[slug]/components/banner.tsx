import { IGame } from '@/common/interfaces/game.interface'
import { formatDateLong } from '@/common/utils/date.util'
import { pickRandom } from '@/common/utils/random-pick.util'
import { Badge } from '@/src/components/ui/badge'
import { Cover } from '@/src/components/ui/cover'
import Image from 'next/image'

export function Banner(game: IGame) {
  const banner = pickRandom(game.screenshots)

  return (
    <header>
      <div className="relative -z-10">
        <Image
          className="-mt-1 h-72 w-full object-cover object-center opacity-75 sm:h-150"
          src={banner ?? '/cover-not-found.png'}
          alt={game.slug}
          width={1280}
          height={720}
          priority
          suppressHydrationWarning
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background via-background/40 to-background xs:to-background/80" />
      </div>
      <div className="mx-auto -mt-36 flex max-w-360 flex-wrap items-end justify-center gap-4 px-5 xs:-mt-24 xs:flex-nowrap sm:-mt-60 sm:gap-8 lg:px-24">
        <Cover
          className="sm:min-w-56.5"
          src={game.coverUrl}
          alt={game.title}
          width={226}
          height={720}
          priority
        />
        <div className="w-full space-y-3 pb-4 text-center xs:text-left">
          <div className="flex justify-center gap-2 xs:justify-start">
            {game?.genres?.map((genre, index) => (
              <Badge key={index} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold sm:text-6xl">{game.title}</h1>
          <div className="flex items-center justify-center gap-4 text-xs xs:justify-start sm:text-base">
            <span className="font-medium">{game.developers?.[0]}</span> •{' '}
            <span>{formatDateLong(game.releaseDate)}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
