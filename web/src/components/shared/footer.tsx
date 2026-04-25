import { cn } from '@/common/utils/cn.util'
import { Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { ButtonShare } from './button-share'

export function Footer() {
  const igdb = {
    target: '_blank',
    href: 'https://www.igdb.com/',
    className: 'text-primary hover:underline',
  }
  const gitHub = {
    target: '_blank',
    href: 'https://github.com/JuanLima10',
    className: cn(buttonVariants({ variant: 'ghost', size: 'icon' })),
  }
  const share = {
    title: 'IPlayed',
    text: 'Check list and games on IPlayed',
  }

  return (
    <footer className="mt-20 flex flex-wrap items-center justify-center gap-8 border-t border-border p-12 lg:justify-between">
      <div className="space-y-2">
        <Image
          src="/logo.png"
          alt="IPlayed"
          width={150}
          height={36}
          suppressHydrationWarning
        />
        <span className="text-xs font-light">
          © 2026 Iplayed. Data via <a {...igdb}>IGDB</a>.
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-8">
        <Link href="/home">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/people">People</Link>
        <Link href="/about">About</Link>
      </nav>

      <div className="flex items-center gap-1">
        <a {...gitHub}>
          <Globe size={20} suppressHydrationWarning />
        </a>
        <ButtonShare {...share} />
      </div>
    </footer>
  )
}
