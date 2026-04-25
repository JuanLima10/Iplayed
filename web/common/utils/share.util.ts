'use client'

import { toast } from 'sonner'
import { IShare } from '../interfaces/share.interface'

export async function share(payload: IShare) {
  if (typeof window === 'undefined') return

  const data: IShare = {
    title: payload.title ?? document.title,
    text: payload.text,
    url: payload.url ?? window.location.href,
  }

  if (navigator.share) {
    try {
      await navigator.share(data)
      return
    } catch {
      return
    }
  }

  if (data.url) {
    await navigator.clipboard.writeText(data.url)
    toast.success('Link copied to clipboard.', {
      position: 'bottom-center',
    })
  }
}
