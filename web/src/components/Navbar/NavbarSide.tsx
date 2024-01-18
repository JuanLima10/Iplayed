'use client'
import { ArrowRight, BookOpen, Gamepad2, Home, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FadeInRightDiv } from '../Motion/FadeInRight';
import { NavbarLink } from './NavbarLinks';

export function NavbarSide() {
  const [sidebar, setSidebar] = useState(false)
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if(sidebar && eventData.dir === 'Left'){
        setSidebar(false)
      }
    }
  })
  return (
    <section>
      <button className="hidden cursor-pointer bg-transparent text-white-100 py-[6px] responsive:block" onClick={() => setSidebar(true)}>
        <Menu size={25} strokeWidth={2.5} />
      </button>
      {sidebar &&
        <div {...handlers}>
          <div className="bg-blue-900 opacity-90 data-[state=open]:animate-overlayShow fixed z-10 inset-0" onClick={() => setSidebar(false)} />
          <div className="w-[220px] h-full fixed top-0 left-0 z-20 overflow-auto bg-blue-900 rounded-r-lg p-6 shadow-md data-[state=open]:animate-contentShow focus:outline-none">
            <FadeInRightDiv>
              <div className="flex flex-col items-start gap-8">
                <Link href="/home">
                  <Image
                    className="max-w-full"
                    src='/logo.png'
                    alt="IPlayed"
                    width="150" height="36"
                    priority
                  />
                </Link>
                <div className="flex flex-col items-start gap-4 font-normal text-sm text-white-100" onClick={() => setSidebar(false)}>
                  <NavbarLink href="/home">
                    <Home className="-mt-[3px]" size={16} /> Home
                  </NavbarLink>
                  <NavbarLink href="/games" >
                    <Gamepad2 size={18} /> Games
                  </NavbarLink>
                  <NavbarLink href="/reviews">
                    <BookOpen size={16} /> Reviews
                  </NavbarLink>
                </div>
                <button className="flex items-end gap-1 font-normal text-sm text-green-300 hover:text-red-500" onClick={() => setSidebar(false)}>
                  Back to page <ArrowRight size={18} />
                </button>
              </div>
            </FadeInRightDiv>
          </div>
        </div>
      }
    </section >
  )
}