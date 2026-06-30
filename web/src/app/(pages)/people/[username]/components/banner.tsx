import { game_api } from '@/src/services/game.service'
import Image from 'next/image'

export async function Banner({ userId }: { userId: string }) {
  const banner = await game_api.banner(userId)

  return (
    <div className="relative -z-10">
      <Image
        className="-mt-1 h-72 w-full object-cover object-center opacity-75 sm:h-94"
        src={banner ?? '/cover-not-found.png'}
        alt="Banner"
        width={1280}
        height={720}
        priority
        suppressHydrationWarning
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background via-background/40 to-background xs:to-background/80" />
    </div>
  )
}
