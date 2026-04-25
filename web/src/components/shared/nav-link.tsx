'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function NavLink(props: { href: string; children: ReactNode }) {
  const { href, children } = props

  let path = usePathname()
  if (path === '/') path = '/home'
  const active = path === href

  if (!active) {
    return (
      <Link href={href} className="hover:text-primary">
        {children}
      </Link>
    )
  }

  return (
    <div className="flex flex-col gap-1 text-primary">
      <Link href={href}>{children}</Link>
      <hr className="border border-primary" />
    </div>
  )
}
