import { IUser } from '@/common/interfaces/user.interface'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import Link from 'next/link'

export function HeaderProfile(user: IUser) {
  const { username, name, avatarUrl } = user
  const fallback = username.slice(0, 2).toUpperCase()

  return (
    <header>
      <Link
        className="flex w-fit flex-wrap items-center justify-center gap-4"
        href={`/people/${username}`}
      >
        <Avatar size="lg">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="space-y-0 text-center xs:text-start">
          <h1 className="text-xl">
            {name}{' '}
            <b className="font-medium text-muted-foreground">(@{username})</b>
          </h1>
          <span className="text-muted-foreground">Your personal account</span>
        </div>
      </Link>
    </header>
  )
}
