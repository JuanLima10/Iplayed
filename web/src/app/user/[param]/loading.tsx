import { InfoStatsUserSkeleton } from '@/components/ApiCalls/User/InfoStatsUser';
import { UserFavGamesSkeleton } from '@/components/ApiCalls/User/UserFavGames';
import { UserLikedGamesSkeleton } from '@/components/ApiCalls/User/UserLikedGames';
import { UserRatedGamesSkeleton } from '@/components/ApiCalls/User/UserRatedGames';
import { UserReviewedGamesSkeleton } from '@/components/ApiCalls/User/UserReviewedGames';

export default function Loading() {
  return (
    <main className="relative h-full flex flex-col max-w-[2160px] overflow-y-clip animate-pulse mx-auto">
      <div className="w-full h-[290px] bg-current responsive:h-60"></div>
      <div className="w-full h-[290px] absolute top-0 bg-linear-t-blue responsive:h-60"></div>
      <header className="relative flex flex-wrap justify-center items-center gap-4 -mt-4 mb-4">
        <div className="w-[200px] h-[200px] bg-slate-700 rounded-full -mt-14 responsive:w-32 responsive:h-32 responsive:-mt-6"></div>
        <div className="text-start mr-4 small-screen:text-center">
          <div className="w-36 h-8 mb-4 bg-slate-700 rounded-full"></div>
          <div className="w-32 h-5 bg-slate-700 rounded-full responsive:h-3"></div>
        </div>
        <InfoStatsUserSkeleton />
      </header>
      <section className="w-[860px] max-w-full flex flex-col items-center justify-center mt-4 mx-auto">
        <div className="w-32 h-5 bg-slate-700 rounded-lg"></div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <UserFavGamesSkeleton />
        </div>
      </section>
      <section className="w-[860px] max-w-full mt-8 mx-auto">
        <div className="w-[25%] h-5 bg-slate-700 rounded-lg mx-5"></div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 responsive:gap-3">
          <UserLikedGamesSkeleton limit={5} />
        </div>
      </section>
      <section className="w-[860px] max-w-full mt-8 mx-auto">
        <div className="w-[25%] h-5 bg-slate-700 rounded-lg mx-5"></div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 responsive:gap-3">
          <UserRatedGamesSkeleton limit={5} />
        </div>
      </section>
      <footer className="w-[860px] max-w-full mt-8 mx-auto responsive:w-[400px]">
        <div className="w-[25%] h-5 bg-slate-700 rounded-lg mx-5"></div>
        <div className="flex flex-col justify-center items-center gap-4 py-8 px-5">
          <UserReviewedGamesSkeleton limit={3} />
        </div>
      </footer>
    </main>
  )
}