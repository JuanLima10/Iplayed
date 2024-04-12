import { getUserBanner } from "@/lib/fetch/user"
import { randomBackground } from "@/utils/randomBackground"
import Image from "next/image"

export async function BannerUser({ userId }: { userId: string }) {
  const banner = await getUserBanner(userId)
    
  return (
    <div className="relative">
      {banner ?
        <>
          <div className="w-full h-[290px] absolute -z-30 bg-slate-700 animate-pulse responsive:h-60"></div>
          <Image
            className="w-full h-[290px] object-cover object-center responsive:h-60"
            src={randomBackground(banner)}
            alt="Profile background"
            width={1920} height={1080}
            priority
          />
        </> :
        <div className="w-full h-[290px] top-0 bg-black-100 opacity-50 responsive:h-60"></div>
      }
      <div className="w-full h-full absolute bottom-0 bg-black-100 opacity-25"></div>
      <div className="w-full h-full absolute bottom-0 bg-linear-t-blue"></div>
    </div>
  )
}