'use client'

import { ButtonLoadMore } from '@/src/components/shared/button-load-more'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { useGetFollowing } from '@/src/hooks/follow.hook'
import Link from 'next/link'

export function Following({ userId }: { userId: string }) {
  const { following, count, loadMore, isLoading } = useGetFollowing(userId)

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer flex-col p-1.5 text-foreground transition-colors hover:text-muted-foreground">
        {count} Following
      </DialogTrigger>
      {count > 0 && (
        <DialogContent className="w-md">
          <DialogTitle>Following</DialogTitle>
          <DialogDescription className="space-y-2">
            {!isLoading &&
              following?.map(({ id, avatarUrl, username }) => (
                <Link
                  className="flex cursor-pointer items-center gap-2 rounded-sm p-2.5 text-sm hover:bg-muted"
                  href={`/people/${username}`}
                  key={id}
                >
                  <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">@{username}</span>
                </Link>
              ))}
            <ButtonLoadMore variant="link" {...loadMore} />
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}
