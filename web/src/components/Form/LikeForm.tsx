'use client'
import Image from 'next/image';
import { useState } from 'react';

import { Heart } from 'lucide-react';

import { LikeFormProps } from '@/Types/Form';
import { api } from '@/lib/api';
import { headers } from '@/lib/header';
import { useRouter } from 'next/navigation';

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
        const likeId = await api.get(`/like/${props.slug}`, headers)
          .then(res => res.data)
        const like = await api.delete(`/game/like/${likeId.id}`, headers)
        setLoading(false)
        return like
      }
      const like = await api.post(`/game/like/${props.slug}`, data, headers)
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