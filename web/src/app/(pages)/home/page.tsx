import { MostAnteciped } from './components/anteciped-most'
import { Lists } from './components/list'
import { Popular } from './components/popular'
import Random from './components/random'
import { Review } from './components/review'
import { MostReviewed } from './components/reviewed-most'
import { MostStatus } from './components/status-most'

export default async function Home() {
  return (
    <main className="space-y-8 sm:space-y-10.5">
      <Random />
      <Popular />
      <section className="flex w-full flex-wrap items-start gap-12 px-5 sm:px-8 lg:flex-nowrap">
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
