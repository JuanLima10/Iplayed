import { ISearchParams } from '@/common/interfaces/search-params.interface'
import { CoverSkeleton } from '@/src/components/ui/cover'
import { Suspense } from 'react'
import { Order } from './components/order'
import { OrderTabs } from './components/order-tabs'
import { ReadGames } from './components/read-games'
import { ReleaseYear } from './components/release-year'

export default async function Games({ searchParams }: ISearchParams) {
  const query = await searchParams
  const suspenseKey = new URLSearchParams(
    Object.entries(query ?? {}).map(([k, v]) => [k, String(v)])
  ).toString()

  return (
    <main className="space-y-8 px-5 sm:px-8 md:space-y-12">
      <header className="flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-125 space-y-2">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold sm:text-4xl">Browse Games</h1>
            <hr className="mb-3 w-12 border-2 border-primary" />
          </div>
          <p className="text-sm">
            Curating the definitive digital ledger of interactive experiences.
            Filter by your preferences or explore our archival highlights.
          </p>
        </div>
        <OrderTabs />
      </header>

      <section className="flex flex-wrap gap-8 md:flex-nowrap">
        <aside className="flex w-full gap-8 sm:min-w-51.25 sm:flex-col lg:w-fit lg:gap-6">
          <ReleaseYear />
          <Order />
        </aside>
        <Suspense
          key={suspenseKey}
          fallback={
            <div className="flex min-h-98 flex-wrap items-center justify-center gap-3 pb-20">
              <CoverSkeleton limit={12} width={141} height={186} />
            </div>
          }
        >
          <ReadGames searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  )
}
