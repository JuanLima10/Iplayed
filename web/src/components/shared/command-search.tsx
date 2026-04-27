'use client'

import { ISearch } from '@/common/interfaces/search.interface'
import { search_api } from '@/src/services/search.service'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandTrigger,
} from '../ui/command'
import { Cover } from '../ui/cover'

export function CommandSearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ISearch>({
    games: { data: [] },
    users: { data: [] },
  })

  useEffect(() => {
    if (!query.trim()) {
      setResults({ games: { data: [] }, users: { data: [] } })
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const data = await search_api.search(query)
        setResults(data)
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const gameCount = results?.games?.paginate?.count || 0
  const userCount = results?.users?.paginate?.count || 0

  const hasGames = gameCount > 0
  const hasUsers = userCount > 0

  return (
    <Command className="w-full">
      <CommandTrigger className="w-full cursor-text" asChild>
        <div className="flex h-9 w-full items-center gap-2 rounded-md border-2 border-input bg-input px-3 py-2 text-sm text-muted-foreground outline-none sm:min-w-60.25">
          <Search size={14} suppressHydrationWarning />
          <span className="font-semibold text-[#3b3b50]">Search...</span>
          <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">
            ⌘K
          </kbd>
        </div>
      </CommandTrigger>
      <CommandContent className="w-xl max-w-[90svw]">
        <CommandInput
          placeholder="Search games and players..."
          value={query}
          onValueChange={setQuery}
        />

        {loading && <CommandEmpty>Searching...</CommandEmpty>}
        {!loading && !query.trim() && (
          <CommandEmpty>
            Search your favorite games and find players...
          </CommandEmpty>
        )}
        {!loading && query.trim() && !hasGames && !hasUsers && (
          <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>
        )}

        <CommandList>
          {hasGames && (
            <CommandGroup heading={`Games ${`(${gameCount})`}`}>
              {results.games.data.map((game) => (
                <CommandItem
                  key={game.igdbId}
                  value={game.title}
                  href={`/games/${game.slug}`}
                >
                  <Cover
                    className="shrink-0 rounded"
                    src={game.coverUrl}
                    alt={game.title}
                    width={28}
                    height={38}
                    isText={false}
                  />
                  <span className="truncate">{game.title}</span>
                </CommandItem>
              ))}
              {gameCount > 4 && (
                <CommandItem href={`/games?search=${query}`}>
                  Ver mais resultados...
                </CommandItem>
              )}
            </CommandGroup>
          )}

          {hasGames && hasUsers && <CommandSeparator />}

          {hasUsers && (
            <CommandGroup heading={`Players ${`(${userCount})`}`}>
              {results.users.data.map(({ id, username, avatarUrl }) => (
                <CommandItem
                  key={id}
                  value={username}
                  href={`/users/${username}`}
                >
                  <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">@{username}</span>
                </CommandItem>
              ))}
              {userCount > 4 && (
                <CommandItem href={`/people?search=${query}`}>
                  Ver mais resultados...
                </CommandItem>
              )}
            </CommandGroup>
          )}
        </CommandList>
        <CommandFooter />
      </CommandContent>
    </Command>
  )
}
