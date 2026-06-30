'use client'

import { IGame } from '@/common/interfaces/game.interface'
import { ISearch } from '@/common/interfaces/search.interface'
import { useGetGames } from '@/src/hooks/game.hook'
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
import { Cover, CoverPlus } from '../ui/cover'

type Props = {
  isLink?: boolean
  isCoverInput?: boolean
  onSelectGame?: (game: IGame) => void
}

export function CommandSearch({
  isLink = true,
  isCoverInput,
  onSelectGame,
}: Props) {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ISearch>({
    games: { data: [] },
    users: { data: [] },
  })

  const { isFetching, ...infinite } = useGetGames({ search })

  useEffect(() => {
    if (!isLink) return
    if (!search.trim()) {
      setResults({ games: { data: [] }, users: { data: [] } })
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const data = await search_api.search(search)
        setResults(data)
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const onScroll = (e: any) => {
    if (isLink) return

    const el = e.currentTarget
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40

    if (nearBottom && infinite.hasNextPage && !infinite.isFetchingNextPage) {
      infinite.fetchNextPage()
    }
  }

  const gameCount = results?.games?.paginate?.count || 0
  const userCount = results?.users?.paginate?.count || 0

  const hasGames = gameCount > 0
  const hasUsers = userCount > 0

  return (
    <Command className="w-full">
      <CommandTrigger
        className={`w-full ${isCoverInput ? 'cursor-pointer' : 'cursor-text'}`}
      >
        {isCoverInput ? (
          <CoverPlus />
        ) : (
          <div className="flex h-9 w-full items-center gap-2 rounded-md border-2 border-input bg-[#14142e] px-3 py-2 text-sm text-muted-foreground outline-none sm:min-w-60.25">
            <Search size={14} suppressHydrationWarning />
            <span className="font-semibold text-[#3b3b50]">Search...</span>
            <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-xs">
              ⌘K
            </kbd>
          </div>
        )}
      </CommandTrigger>
      <CommandContent className="w-xl max-w-[90svw]">
        <CommandInput
          placeholder="Search games and players..."
          value={search}
          onValueChange={setSearch}
        />

        {(loading || isFetching) && <CommandEmpty>Searching...</CommandEmpty>}
        {!loading && !search.trim() && (
          <CommandEmpty>
            Search your favorite games and find players...
          </CommandEmpty>
        )}
        {!loading && !isFetching && search.trim() && !hasGames && !hasUsers && (
          <CommandEmpty>No results for &ldquo;{search}&rdquo;</CommandEmpty>
        )}

        <CommandList className="max-h-130 overflow-y-auto" onScroll={onScroll}>
          {hasGames && isLink ? (
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
                <CommandItem href={`/games?search=${search}`}>
                  See more results...
                </CommandItem>
              )}
            </CommandGroup>
          ) : (
            <CommandGroup heading="Games">
              {infinite.games?.map((game) => (
                <CommandItem
                  key={game.igdbId}
                  value={game.title}
                  onSelect={() => onSelectGame?.(game)}
                >
                  <Cover
                    src={game.coverUrl}
                    alt={game.title}
                    width={28}
                    height={38}
                    isText={false}
                  />
                  <span className="truncate">{game.title}</span>
                </CommandItem>
              ))}

              {infinite.isFetchingNextPage && (
                <CommandEmpty>Loading more games...</CommandEmpty>
              )}
            </CommandGroup>
          )}

          {hasGames && hasUsers && <CommandSeparator />}

          {isLink && hasUsers && (
            <CommandGroup heading={`Players ${`(${userCount})`}`}>
              {results.users.data.map(({ id, username, avatarUrl }) => (
                <CommandItem
                  key={id}
                  value={username}
                  href={`/people/${username}`}
                >
                  <Avatar size="sm">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">@{username}</span>
                </CommandItem>
              ))}
              {userCount > 4 && (
                <CommandItem href={`/people?search=${search}`}>
                  See more results...
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
