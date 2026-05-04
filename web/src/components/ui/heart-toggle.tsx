'use client'

import { cn } from '@/common/utils/cn.util'
import { Heart } from 'lucide-react'

interface HeartToggleProps {
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  className?: string
}

export function HeartToggle({
  value,
  onChange,
  disabled,
  className,
}: HeartToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!value)}
      className={cn(
        'cursor-pointer transition-transform duration-100 hover:scale-110 disabled:cursor-default disabled:hover:scale-100',
        className
      )}
      aria-label="Toggle favorite"
      aria-pressed={value}
    >
      <Heart
        className={cn(
          'h-6 w-6 transition-colors duration-200',
          value
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-muted-foreground'
        )}
      />
    </button>
  )
}
