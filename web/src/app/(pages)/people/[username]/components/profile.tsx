import { IUser } from '@/common/interfaces/user.interface'
import { cn } from '@/common/utils/cn.util'
import { ButtonFollow } from '@/src/components/shared/button-follow'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { buttonVariants } from '@/src/components/ui/button'
import { follow_api } from '@/src/services/follow.service'
import { user_api } from '@/src/services/user.service'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { Stats } from './stats'

export async function Profile(props: { user: IUser; tab?: string }) {
  const { user, tab } = props

  if (user) {
    const { id: userId, username, name, avatarUrl } = user
    const followingId = userId

    const me = await user_api.getMe()
    const follow = me && (await follow_api.following(me.id, { followingId }))

    const fallback = username.slice(0, 2).toUpperCase()
    const isFollowing = (follow?.paginate?.count ?? 0) > 0
    const editClassName = cn(buttonVariants({ size: 'sm', variant: 'link' }))

    return (
      <div className="mx-auto -mt-36 flex max-w-360 flex-wrap items-center justify-center gap-4 px-5 xs:-mt-24 xs:flex-nowrap sm:-mt-40 sm:justify-start sm:gap-8 lg:px-24">
        <Avatar size="xl">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-center xs:text-start">
            <div className="flex flex-col-reverse items-center gap-2 xs:flex-row xs:items-end">
              <h1 className="text-4xl font-extrabold">{name}</h1>
              {me && me.id === userId && (
                <Link href="/settings" className={editClassName}>
                  <Pencil suppressHydrationWarning /> Edit profile
                </Link>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 xs:justify-start">
              <span className="text-accent italic">@{username}</span>{' '}
              {me && me.id !== userId && (
                <ButtonFollow userId={userId} isFollowing={isFollowing} />
              )}
            </div>
          </div>
          <Stats userId={userId} tab={tab} />
        </div>
      </div>
    )
  }
}
