'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { LogOut, Settings, User2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

import { NavbarDropdownProps } from '@/Types/Navbar';

export function NavbarDropDown(props: NavbarDropdownProps) {
  const router = useRouter()

  function handleOnClick(){
    destroyCookie(null, "iplayed_session")
    router.refresh()
  }

  return (
    <NavigationMenu.Root className="relative list-none">
      <NavigationMenu.Item>
        <NavigationMenu.Trigger asChild>
          {props.children}
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="w-[130px] bg-gray-500 absolute z-20 right-0 rounded-lg p-2 mt-2">
          <Link className="flex items-center justify-end gap-1 font-semibold text-sm text-blue-900 outline-none rounded-lg p-2 transition-colors hover:bg-white-200" href={`/user/${props.userId}`}>
            <User2 size={14} />Profile
          </Link>
          <Link className="flex items-center justify-end gap-1 font-semibold text-sm text-blue-900 outline-none rounded-lg p-2 transition-colors hover:bg-white-200" href={`/user/${props.userId}/settings`}>
            <Settings size={14} />Settings
          </Link>
          <button className="w-full flex items-center justify-end gap-1 font-semibold text-sm text-red-500 outline-none rounded-lg p-2 transition-colors hover:bg-white-200" onClick={handleOnClick}>
            <LogOut size={14} />Log out
          </button>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.Root>

  )
}