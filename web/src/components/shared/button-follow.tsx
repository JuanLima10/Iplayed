'use client'

import { useCreateFollow, useRemoveFollow } from '@/src/hooks/follow.hook'
import { useState } from 'react'
import { Button } from '../ui/button'

export function ButtonFollow(props: { isFollowing?: boolean; userId: string }) {
  const { userId, isFollowing: initial } = props
  const [isFollowing, setIsFollowing] = useState(initial)

  const { create, isPending: creating } = useCreateFollow()
  const { remove, isPending: removing } = useRemoveFollow()
  const isPending = creating || removing

  async function handleClick() {
    setIsFollowing((prev) => !prev)
    try {
      if (isFollowing) await remove({ userId })
      else await create({ userId })
    } catch {
      setIsFollowing((prev) => !prev)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
