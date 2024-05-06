import { TopGamesSkeleton } from "@/components/ApiCalls/Games/TopGames";
import { CarouselSkeleton } from "@/components/Carousel";

export default function GamesPageLoading() {
  return (
    <main className="flex flex-col max-w-[2160px] animate-pulse mx-auto pt-[77px]">
      <header className="mt-8 mx-16 responsive:mx-5">
        <div className="w-56 h-8 mb-4 bg-slate-700 rounded-full"></div>
        <div className="w-72 h-5 bg-slate-700 rounded-full"></div>
      </header>
      <section className="animate-pulse my-8">
        <div className="flex items-center justify-center gap-8 mx-16 mb-[54px] navbar:flex-wrap responsive:mx-5 responsive:mb-8">
          {[...Array(2)].map((mainGame, index) => (
            <div key={index} className="w-full max-w-[640px]">
              <div className="w-full h-[240px] bg-slate-700 rounded-lg brightness-[45%] opacity-75 responsive:h-[180px]"></div>
              <div className="flex items-end gap-4 small-screen:flex-wrap small-screen:justify-center small-screen:gap-1">
                <div className="min-w-[136px] h-[189px] relative z-10 bg-slate-700 rounded-lg -mt-[115px] ml-6 responsive:min-w-[100px] responsive:h-[133px] responsive:-mt-20 responsive:ml-4"></div>
                <div className="py-2 small-screen:text-center">
                  <div className="w-80 h-[20px] bg-slate-700 rounded-full mb-4 responsive:w-80 responsive:h-4"></div>
                  <div className="w-36 max-w-full h-4 bg-slate-700 rounded-full responsive:h-[14px]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CarouselSkeleton />
        <TopGamesSkeleton />
      </section>
    </main>
  )
}