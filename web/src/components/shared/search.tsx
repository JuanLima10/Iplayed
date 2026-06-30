'use client'

import { PATH_MAP } from '@/common/interfaces/search.interface'
import { getFullPathname } from '@/common/utils/full-pathname-get.util'
import { useSearchQuery } from '@/src/hooks/search-query.hook'
import { Search as Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Input } from '../ui/input'
import { CommandSearch } from './command-search'

export function Search({ isInput }: { isInput?: boolean }) {
  const pathname = usePathname()
  const fullpath = getFullPathname()

  const gamesConfig = PATH_MAP['/games']
  const peopleConfig = PATH_MAP['/people']

  const isPeople = pathname.startsWith(peopleConfig.path)
  const { path: pathConfig, placeholder } = isPeople
    ? peopleConfig
    : gamesConfig
  const path = isInput ? fullpath : pathConfig

  const searchQuery = useSearchQuery({ path })
  const props = { placeholder, ...searchQuery }

  if (pathname === gamesConfig.path || pathname === peopleConfig.path) {
    return <Input className="w-full" icon={Icon} {...props} />
  }

  if (isInput) {
    return (
      <Input
        className="w-full"
        icon={Icon}
        placeholder="search..."
        {...searchQuery}
      />
    )
  }

  return <CommandSearch />
}
