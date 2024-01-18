import { getUser } from '@/lib/auth';
import Image from 'next/image';

import { NavbarDropDown } from './NavbarDropDown';

export function NavbarProfile() {
  const { sub, name, login, avatarUrl } = getUser()
  return (
    <NavbarDropDown userId={sub}>
      <div className="cursor-pointer flex items-center gap-[10px]">
        <div className="text-end responsive:hidden">
          <span className="font-bold text-sm text-white-100">{name}</span>
          <p className="font-normal text-xs text-white-200">@{login}</p>
        </div>
        <div className="relative">
          <div className="w-[10px] h-[10px] absolute right-0 bg-green-300 rounded-full"></div>
          <Image
            className="max-w-[45px] h-[45px] object-cover rounded-full"
            src={avatarUrl ? avatarUrl : "img-not-found.png"}
            alt="Avatar"
            width={600} height={600}
          />
        </div>
      </div>
    </NavbarDropDown>
  )
}