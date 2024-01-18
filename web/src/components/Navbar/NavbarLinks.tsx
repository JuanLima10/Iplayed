'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavbarLinkProps } from '@/Types/Navbar';

export function NavbarLink(props: NavbarLinkProps){
  const pathName = usePathname()
  const isActive = pathName === props.href.toString();

  return(
    <Link className={`flex items-center gap-1 ${isActive ? 'text-green-300' : 'text-white-100'} hover:text-green-300`} href={props.href}>
      {props.children}
    </Link>
  )
}