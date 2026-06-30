'use client'

import { IUser } from '@/common/interfaces/user.interface'
import { cn } from '@/common/utils/cn.util'
import { useLogout } from '@/src/hooks/auth.hook'
import { LogOut, Settings, User2 } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar'
import { buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown'

export function ProfileDropdown(me: IUser) {
  const { name, username, avatarUrl } = me
  const { logout, isPending } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2" align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuItem href={`/people/${username}`}>
          <User2 suppressHydrationWarning />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem href={`/settings`}>
          <Settings suppressHydrationWarning />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn(
            'min-w-full',
            buttonVariants({ size: 'sm', variant: 'destructive' })
          )}
          disabled={isPending}
          onClick={() => void logout()}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
