'use client'
import { useIsMobile } from '@/src/hooks/mobile-screen.hook'

export function getPage(current: number, total: number): (number | '...')[] {
  const isMobile = useIsMobile()

  if (isMobile) {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1)

    if (current === 1) return [1, 2, '...']
    if (current === total) return ['...', total - 1, total]

    return [current, current + 1, '...', total]
  }

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3)
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
}
