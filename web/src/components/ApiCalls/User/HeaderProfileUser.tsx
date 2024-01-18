import Image from "next/image";
import { Suspense } from "react";
import { BannerUser } from "./BannerUser";
import { InfoStatsUser, InfoStatsUserSkeleton } from "./InfoStatsUser";

export async function HeaderProfileUser(props: { userId: string, name: string, login: string, avatarUrl?: string }) {
  return (
    <>
      <BannerUser userId={props.userId} />
      <header className="relative flex flex-wrap justify-center items-center gap-4 z-0 -mt-4 mb-4">
        <Image
          className="w-[200px] h-[200px] rounded-full -mt-14 responsive:w-32 responsive:h-32 responsive:-mt-6"
          src={props.avatarUrl ? props.avatarUrl : '/img-not-found.png'}
          alt="Avatar"
          width={600} height={600}
        />
        <div className="text-start mr-4 small-screen:text-center">
          <span className="font-bold text-xl text-white-100">{props.name}</span>
          <p className="font-semibold text-md text-gray-500 responsive:text-base">@{props.login}</p>
        </div>
        <Suspense fallback={<InfoStatsUserSkeleton />}>
          <InfoStatsUser id={props.userId} />
        </Suspense>
      </header>
    </>
  )
}

export function HeaderProfileUserSkeleton() {
  return (
    <>
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
    </>
  )
}