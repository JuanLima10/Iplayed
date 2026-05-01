import { Order } from './components/order'
import { OrderTabs } from './components/order-tabs'
import { ReadGames } from './components/read-games'
import { ReleaseYear } from './components/release-year'

export default function Games() {
  return (
    <main className="mx-auto max-w-360 space-y-8 px-5 pt-64 sm:px-8 sm:pt-32 md:space-y-12">
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
        <ReadGames />
      </section>
    </main>
  )
}
