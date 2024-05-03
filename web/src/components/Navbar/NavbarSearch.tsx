'use client'
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export function NavbarSearch() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(`/search?search=${search.toLowerCase()}`)
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <div className="relative flex flex-col justify-center responsive:w-full">
      <form className="w-[245px] h-8 max-w-full relative responsive:w-full responsive:h-[38px]" onSubmit={handleSubmit}>
        <input
          className="w-full h-8 max-w-full font-bold text-sm text-blue-900 bg-gray-500 rounded-2xl outline-none pl-7 pr-3 responsive:h-[38px] responsive:text-base responsive:rounded-lg placeholder:font-normal placeholder:text-blue-900"
          type="text"
          value={search}
          placeholder="Search a game or user..."
          onChange={handleChange}
        />
        <div className="absolute top-[9px] left-2 font-semibold text-blue-900 responsive:top-[12px]">
          <SearchIcon size={14} absoluteStrokeWidth />
        </div>
      </form>
    </div>
  )
}