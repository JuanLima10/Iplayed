import { Dot } from 'lucide-react'
import Image from 'next/image'

export default function Loading() {
  const background = 'bg-[#0B0B24]!'
  const dotClassName = `animate-bounce rounded-full ${background}`

  return (
    <div
      className={`flex h-svh w-full flex-col items-center justify-center gap-4 ${background}`}
    >
      <Image
        className={`${background}`}
        src="/logo.png"
        alt="IPlayed"
        width={150}
        height={36}
        priority
        suppressHydrationWarning
      />

      <div className={`flex items-end gap-1 ${background}`}>
        <Dot className={dotClassName} style={{ animationDelay: '0ms' }} />
        <Dot className={dotClassName} style={{ animationDelay: '150ms' }} />
        <Dot className={dotClassName} style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
