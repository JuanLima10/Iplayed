import { BookOpen, Gamepad2, Home, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getUser } from '@/lib/auth';
import { NavbarLink } from './NavbarLinks';
import { NavbarProfile } from './NavbarProfile';
import { NavbarSearch } from './NavbarSearch';
import { NavbarSide } from './NavbarSide';

export function Navbar() {
  return (
    <nav className="w-full h-[77px] absolute z-10 flex flex-wrap-reverse items-center justify-between mt-4 mx-auto px-16 navbar:justify-center navbar:gap-6 responsive:px-5">
      <div className="flex flex-wrap items-end gap-8 responsive:justify-center">
        <Link className="navbar:hidden" href="/home">
          <Image
            className="max-w-full"
            src='/logo.png'
            alt="IPlayed"
            width="150" height="36"
            priority
          />
        </Link>
        <div className="flex flex-wrap items-center gap-4 font-normal text-sm text-white-100 transition-colors responsive:hidden">
          <NavbarLink href="/home">
            <Home className="-mt-[3px]" size={16} /> Home
          </NavbarLink>
          <NavbarLink href="/games">
            <Gamepad2 size={18} /> Games
          </NavbarLink>
          <NavbarLink href="/reviews">
            <BookOpen size={16} /> Reviews
          </NavbarLink>
        </div>
      </div>
      <div className="max-w-full flex items-center justify-center gap-4 responsive:justify-between responsive:w-full">
        <NavbarSide/>
        <NavbarSearch />
        {getUser() ? <NavbarProfile /> :
          <Link className="cursor-pointer flex items-center gap-[10px]" href="/login">
            <div className="responsive:hidden">
              <span className="font-bold text-sm text-white-100">SingIn</span>
              <p className="font-normal text-xs text-white-200">@discord</p>
            </div>
            <div className="text-white-100 bg-white-200 rounded-full p-[10px]">
              <User2 size={25} />
            </div>
          </Link>
        }
      </div>
    </nav>
  )
}