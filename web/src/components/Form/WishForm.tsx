'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ListPlus, ListX } from 'lucide-react';

import { WishFormProps } from '@/Types/Form';
import { deleteLikeWish, postLikeWish } from '@/lib/fetch/like-wish';

export function WishForm(props: WishFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isWish, setIsWish] = useState(props.isWish)

  async function handleWish() {
    if (props.currentUserId) {
      setLoading(true)
      const data = {
        slug: props.slug,
        gameId: props.gameId,
      }
      setIsWish(!isWish)

      if (isWish) {
        const wish = await deleteLikeWish("wish", props.slug)
        setLoading(false)
        return wish
      }
      const wish = await postLikeWish("wish", props.slug, data)
      setLoading(false)
      return wish
    }
    router.push('/login')
  }

  return (
    <button className="cursor-pointer font-semibold text-sm text-center text-white-200 p-2 transition-colors hover:text-green-300 responsive:text-xs small-screen:text-2xs" onClick={handleWish} disabled={loading}>
      {!isWish ?
        <div className="flex flex-col items-center gap-1">
          <ListPlus />
          {props.title && <p>Add to wish</p>}
        </div> :
        <div className="flex flex-col items-center gap-1 text-green-300">
          <ListX />
          {props.title && <p>Added to wish</p>}
        </div>
      }
    </button>
  )
}