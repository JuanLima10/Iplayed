import { cn } from '@/common/utils/cn.util'
import { buttonVariants, IButton } from '@/src/components/ui/button'
import Link from 'next/link'

export function AuthRedirect({ children, variant }: IButton) {
  const className = cn('min-w-full', buttonVariants({ size: 'md', variant }))
  return (
    <Link href="/auth" className={className}>
      {children}
    </Link>
  )
}
