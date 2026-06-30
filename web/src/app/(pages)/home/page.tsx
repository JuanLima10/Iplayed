import { MostAnteciped } from './components/anteciped-most'
import { Lists } from './components/list'
import { Popular } from './components/popular'
import Random from './components/random'
import { Review } from './components/review'
import { MostReviewed } from './components/reviewed-most'
import { MostStatus } from './components/status-most'

export default async function HomePage() {
  return (
    <main className="mx-auto max-w-360 space-y-8 pt-64 sm:space-y-10.5 sm:pt-32">
      <Random />
      <Popular />
      <section className="flex w-full flex-wrap items-start justify-center gap-12 px-5 sm:px-8 lg:flex-nowrap">
        <div className="flex flex-col gap-10.5">
          <MostReviewed />
          <Review />
        </div>
        <div className="flex w-full flex-wrap justify-center gap-10.5 lg:max-w-93.5">
          <MostStatus />
          <MostAnteciped />
          <Lists />
        </div>
      </section>
    </main>
  )
}
