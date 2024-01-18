'use client'
import { ReactNode, useState } from 'react';

export function ReadMore({ children }: { children?: ReactNode }) {
  const [read, setRead] = useState(false)

  if(children && children.toLocaleString().length > 400){
    return (
      <div className="cursor-pointer" onClick={() => setRead(!read)}>
        {read ?
          <p className="font-normal text-sm text-white-100 responsive:text-2xs">{children}</p> :
          <div className="flex flex-col font-normal text-sm text-white-100 responsive:text-2xs">
            <p className="max-h-12 relative overflow-hidden responsive:h-10 before:absolute before:bottom-0 before:bg-linear-b-dark-blue before:w-full before:h-full">{children}</p>
            <b className="cursor-pointer text-blue-300 hover:underline">Read more ...</b>
          </div>
        }
      </div>
    )
  }
  return <p className="font-normal text-sm text-white-100 responsive:text-2xs">{children}</p>
}