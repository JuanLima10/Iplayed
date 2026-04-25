'use client'

import { IShare } from '@/common/interfaces/share.interface'
import { share } from '@/common/utils/share.util'
import { Share2 } from 'lucide-react'
import { Button } from '../ui/button'

export function ButtonShare(props: IShare & { size?: number }) {
  const { title, text, url, size = 20 } = props

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => share({ title, text, url })}
      aria-label="Compartilhar"
    >
      <Share2 size={size} suppressHydrationWarning />
    </Button>
  )
}
