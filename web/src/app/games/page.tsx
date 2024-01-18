import { MostAnticipated, MostAnticipatedSkeleton } from "@/components/ApiCalls/Games/MostAnticipad"
import { TopGames, TopGamesSkeleton } from "@/components/ApiCalls/Games/TopGames"
import { Suspense } from "react"

export default function Games() {
  return (
    <main className="max-w-[1440px] flex flex-col mx-auto pt-[77px]">
      <header className="mt-10 mx-16 responsive:mx-5">
        <span className="font-bold text-xl text-white-100 responsive:text-lg">Most anticipated</span>
        <p className="font-normal text-lg text-white-100 responsive:text-sm">
          Games that the players are waiting to play.
        </p>
      </header>

      <Suspense fallback={<MostAnticipatedSkeleton />}>
        <MostAnticipated />
      </Suspense>

      <Suspense fallback={<TopGamesSkeleton />}>
        <TopGames />
      </Suspense>
    </main>
  )
}
