import { cn } from '@/common/utils/cn.util'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { CarouselNext, CarouselPrevious } from '../ui/carousel'

type SectionTitleVariant = 'md' | 'lg' | 'icon'

interface SectionTitleProps {
  children: ReactNode
  variant?: SectionTitleVariant
  action?: string | 'carousel'
  icon?: LucideIcon
  href?: string
  className?: string
}

export function SectionTitle({
  children,
  variant = 'md',
  action,
  href,
  icon: Icon,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('flex items-end justify-between', className)}>
      {variant === 'md' && (
        <div className="flex w-full max-w-40 items-end gap-3">
          <h1 className="text-2xl font-bold whitespace-nowrap text-card-foreground">
            {children}
          </h1>
          <hr className="mb-2.5 h-1 flex-1 border-none bg-primary" />
        </div>
      )}

      {variant === 'lg' && (
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-card-foreground sm:text-3xl">
            {children}
          </h1>
          <hr className="w-8 border-2 border-primary" />
        </div>
      )}

      {Icon && variant === 'icon' && (
        <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon className="text-primary" suppressHydrationWarning />
          {children}
        </h1>
      )}

      {action && href && action !== 'carousel' && (
        <Link href={href} className="text-sm text-primary hover:underline">
          {action}
        </Link>
      )}

      {action === 'carousel' && (
        <div className="flex gap-2">
          <CarouselPrevious variant="outline" size="icon" />
          <CarouselNext variant="outline" size="icon" />
        </div>
      )}
    </div>
  )
}
