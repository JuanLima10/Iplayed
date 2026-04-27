'use client'

import { PATH_MAP } from '@/common/interfaces/search.interface'
import { useSearchQuery } from '@/src/hooks/search-query.hook'
import { Search as Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Input } from '../ui/input'
import { CommandSearch } from './command-search'

export function Search() {
  const pathname = usePathname()

  const gamesConfig = PATH_MAP['/games']
  const peopleConfig = PATH_MAP['/people']

  if (pathname === gamesConfig.path || pathname === peopleConfig.path) {
    const isPeople = pathname.startsWith(peopleConfig.path)
    const { path, placeholder } = isPeople ? peopleConfig : gamesConfig

    const { value, onChange } = useSearchQuery({ path })
    const props = { placeholder, value, onChange }

    return <Input className="w-full" icon={Icon} {...props} />
  }

  return <CommandSearch />
}
