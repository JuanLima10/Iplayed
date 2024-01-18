import { Suspense } from 'react';

import { SearchGame, SearchGameSkeleton } from '@/components/ApiCalls/Search/SearchGame';
import { SearchUser, SearchUserSkeleton } from '@/components/ApiCalls/Search/SearchUser';
import { Tabs } from '@/components/Tabs/Tabs';

import { ParamsProps } from '@/Types/Params';

export const metadata = { title: 'Search' }

export default async function Search({ searchParams }: ParamsProps) {
  const page = Number(searchParams['page'] ?? '1')
  const start = (page - 1) * 12
  const end = 12

  return (
    <div className="max-w-[2160px] mx-auto pt-28 px-16 pb-8 responsive:px-5">
      <Tabs.Root className="flex flex-col items-start" defaultValue="games">
        <Tabs.List className="w-full flex border-b border-white-200">
          <Tabs.Trigger className="h-11 cursor-pointer flex items-center justify-center text-sm text-white-100 outline-none px-5 hover:text-green-300 data-[state=active]:text-green-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_2px_0_0]" value="games">
            Games
          </Tabs.Trigger>
          <Tabs.Trigger className="h-11 cursor-pointer flex items-center justify-center text-sm text-white-100 outline-none px-5 hover:text-green-300 data-[state=active]:text-green-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_2px_0_0]" value="users">
            Users
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="w-full outline-none pt-5" value="games" key={Math.random()}>
          <Suspense fallback={<SearchGameSkeleton limit={Number(end)} />}>
            <SearchGame
              search={String(searchParams.search)}
              offset={Number(start)}
              limit={Number(end)}
            />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content className="w-full outline-none pt-5" value="users">
          <Suspense fallback={<SearchUserSkeleton limit={Number(end)} />}>
            <SearchUser
              search={String(searchParams.search)}
              offset={Number(start)}
              limit={Number(end)}
            />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}