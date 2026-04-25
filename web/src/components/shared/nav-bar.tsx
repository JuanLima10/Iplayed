import Image from 'next/image'
import { Me } from './me'
import { NavLink } from './nav-link'
import { Search } from './search'

export function NavBar() {
  return (
    <header className="flex flex-wrap-reverse justify-center gap-8 px-5 pt-8 pb-8 sm:px-8 sm:pb-16 lg:justify-between">
      <div className="flex flex-wrap items-end justify-center gap-8">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={36}
          suppressHydrationWarning
        />
        <nav className="flex gap-6 font-medium">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/games">Games</NavLink>
          <NavLink href="/people">People</NavLink>
        </nav>
      </div>

      <div className="flex w-full items-center gap-4 lg:w-fit">
        <Search />
        <Me />
      </div>
    </header>
  )
}
