import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { ReviewsLoad } from '@/components/LoadScroll/ReviewsLoad';
import { ReviewModal } from '@/components/Modal/ReviewModal';
import { Stars } from '@/components/Stars';

import { api } from '@/lib/api';
import { RecentReviewCardProps } from '@/Types/Review';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function RecentReviewsCard(props: RecentReviewCardProps) {
  const { data, count } = await api.get(`/game/reviews`, {
    params: {
      limit: props.limit,
      offset: props.offset,
    }
  }).then(res => res.data).catch((err) => console.error(err))

  return (
    <>
      {count > 0 && data.map((review: any) => (
        review.data.map((info: any) => (info.user &&
          <div className="w-full flex items-start gap-2 mb-4 responsive:gap-1" key={info.id}>
            <Link className="small-screen:hidden" href={`/user/${info.user.id}`}>
              <Image
                className="max-w-[42px] h-[42px] object-cover rounded-full"
                alt={info.user.name}
                width={42} height={42}
                src={info.user.avatarUrl ?
                  info.user.avatarUrl :
                  "/img-not-found.png"
                }
              />
            </Link>
            <div className="w-full cursor-pointer flex items-start gap-2 responsive:gap-1 responsive:mb-2">
              <ReviewModal
                name={review.data[0].name}
                text={info.review}
                rating={Number(info.rating)}
                src={convertImgToHd(review.data[0].cover.url)}
                userId={info.user.id}
                userName={info.user.name}
                avatarUrl={info.user.avatarUrl}
              >
                <div className="w-full relative flex items-start bg-blue-700 rounded-lg">
                  <div className="w-full flex flex-col justify-between pt-2 px-4 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-md text-white-100 responsive:text-sm small-screen:hidden">{review.data[0].name}</span>
                      <div className="font-normal text-sm text-white-200 responsive:text-xs">
                        Review by <b className="font-semibold text-white-100 mr-1"> {info.user.name}</b>
                        <Stars value={Number(info.rating)} small disabled />
                      </div>
                      {info.review.length > 300 ?
                        <>
                          <p className={clsx("w-full max-w-full max-h-16 relative font-normal text-sm text-white-100 overflow-hidden responsive:max-h-12 responsive:text-xs", {
                            "mb-3 before:w-full before:h-full before:absolute before:bottom-0 before:bg-linear-b-blue before:-mb-1": info.review.length > 360
                          })}>
                            {info.review}
                          </p>
                          <span className="absolute bottom-2 w-full font-semibold text-sm text-blue-300 hover:underline responsive:text-xs">Read more ...</span>
                        </> :
                        <p className="w-full max-w-full h-full relative font-normal text-sm text-white-100 overflow-hidden responsive:text-xs">
                          {info.review}
                        </p>
                      }
                    </div>
                  </div>
                  <Link className="w-[150px] -ml-2 responsive:w-[100px]" href={info.slug ? `/games/${info.slug}` : ""}>
                    <Image
                      className="object-cover rounded-r-lg transition-all ml-2 responsive:rounded-lg responsive:-mt-2 hover:brightness-75"
                      alt={review.data[0].name}
                      width={215} height={300}
                      src={review.data[0].cover.url ? convertImgToHd(review.data[0].cover.url) : "/img-not-found.png"}
                    />
                  </Link>
                </div>
              </ReviewModal>
            </div>
          </div>
        ))
      ))}
      {count > 6 &&
        <ReviewsLoad
          param=""
          type="reviews"
          count={count}
          offset={props.offset + props.limit}
          isProfile isCover isConcat
        />
      }
    </>
  )
}

export function RecentReviewsCardSkeleton() {
  return (
    <div className="w-full mt-0 animate-pulse">
      <div className="w-full flex flex-col items-start gap-4">
        {[...Array(6)].map((reviews, index) => (
          <div className="w-full flex items-start gap-4 responsive:gap-1" key={index}>
            <div className="w-full max-w-[42px] h-[42px] bg-slate-700 rounded-full"></div>
            <div className="w-full h-32 bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}