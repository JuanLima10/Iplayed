import { VideoMode } from '@/common/interfaces/video.interface'
import { cn } from '@/common/utils/cn.util'
import { Video } from '@/src/components/shared/video'
import { Badge } from '@/src/components/ui/badge'
import { buttonVariants } from '@/src/components/ui/button'
import { game_api } from '@/src/services/game.service'
import Link from 'next/link'

export default async function Random() {
  const game = await game_api.random()

  const button = cn(buttonVariants({ size: 'lg' }))
  const href = `/games/${game?.slug}`

  return (
    <section className="relative h-125 w-full overflow-hidden rounded-t-lg">
      <div className="absolute bottom-0 z-20 w-full space-y-4 p-4 sm:max-w-165 sm:px-11 sm:py-16">
        <div className="flex flex-wrap gap-2">
          <Badge>Hot 100</Badge>
          {game?.genres?.map((genre, index) => (
            <Badge key={index} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-card-foreground sm:text-6xl">
          {game?.title}
        </h1>
        <p className="text-base font-light sm:text-lg">
          How about giving this one a try? Discover what makes this game one of
          the 100 most popular games of all time.
        </p>
        <Link href={href} className={button}>
          Game page
        </Link>
      </div>

      <Video
        className="pointer-events-none absolute inset-0 z-0 opacity-85"
        src={game?.video}
        posters={game?.screenshots}
        mode={VideoMode.background}
        autoPlay
        muted
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background via-background/25 to-transparent" />
    </section>
  )
}
