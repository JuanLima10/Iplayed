'use client'
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteLikeWish, postLikeWish } from '@/lib/fetch/like-wish';
import { LikeFormProps } from '@/Types/Form';

export function LikeForm(props: LikeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isLike, setIsLike] = useState(props.isLike)

  async function handleLike() {
    if (props.currentUserId) {
      setLoading(true)
      const data = {
        slug: props.slug,
        gameId: props.gameId,
      }
      setIsLike(!isLike)
      if (isLike) {
        const like = await deleteLikeWish("like", props.slug)
        setLoading(false)
        return like
      }
      const like = await postLikeWish("like", props.slug, data)
      setLoading(false)
      return like
    }
    router.push('/login')
  }

  return (
    <button className="cursor-pointer font-semibold text-sm text-center text-white-200 p-2 transition-colors hover:text-red-500 responsive:text-xs small-screen:text-2xs" onClick={handleLike} disabled={loading}>
      {isLike ?
        <div className="flex flex-col items-center gap-1 text-red-500">
          <Image src="/heart-fill.svg" alt="heart" width={24} height={24} />
          {props.title && <p>Like</p>}
        </div> :
        <div className="flex flex-col items-center gap-1">
          <Heart size={24} />
          {props.title && <p>Like</p>}
        </div>
      }
    </button>
  )
}