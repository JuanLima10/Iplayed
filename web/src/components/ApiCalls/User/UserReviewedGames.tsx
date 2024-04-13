import Image from 'next/image';
import Link from 'next/link';

import { ReviewModal } from '@/components/Modal/ReviewModal';
import { Stars } from '@/components/Stars';
import { api } from '@/lib/api';

import { UserReviewCardProps } from '@/Types/Review';
import { ReviewsLoad } from '@/components/LoadScroll/ReviewsLoad';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function UserReviewedGames(props: UserReviewCardProps) {
  const { data, count } = await api.get(`/user/reviews/${props.userId}`, {
    params: {
      limit: props.limit,
      offset: props.offset,
    }
  }).then(res => res.data).catch((err) => console.error(err))

  if (count > 0) {
    return (
      <>
        {data.map((review: any) => (
          review.data.map((info: any) => (info.user &&
            <div className="w-full cursor-pointer flex items-start gap-2 mb-4 responsive:gap-1 responsive:mb-6" key={info.id}>
              <ReviewModal
                name={review.data[0].name}
                text={info.review}
                rating={Number(info.rating)}
                src={convertImgToHd(review.data[0].cover.url)}
                userId={props.userId}
                userName={props.userName}
              >
                <div className="w-full relative flex items-start bg-blue-700 rounded-lg">
                  <div className="w-full flex flex-col justify-between pt-2 px-4 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-md text-white-100 responsive:text-sm small-screen:hidden">{review.data[0].name}</span>
                      <div className="font-normal text-sm text-white-200 responsive:text-xs">
                        Review by <b className="font-semibold text-white-100 mr-1"> {props.userName}</b>
                        <Stars value={Number(info.rating)} small disabled />
                      </div>
                      {info.review.length > 300 ?
                        <>
                          <p className={`w-full max-w-full max-h-16 relative font-normal text-sm text-white-100 overflow-hidden ${info.review.length > 360 && "mb-3 before:w-full before:h-full before:absolute before:bottom-0 before:bg-linear-b-blue before:-mb-1"} responsive:max-h-12 responsive:text-xs`}>
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
                  {props.isCover &&
                    <Link className="w-[150px] -ml-2 responsive:w-[100px]" href={info.slug ? `/game/${info.slug}` : ""}>
                      <Image
                        className="object-cover rounded-r-lg transition-all ml-2 responsive:rounded-lg responsive:-mt-2 hover:brightness-75"
                        alt={review.data[0].name}
                        width={215} height={300}
                        src={review.data[0].cover.url ?
                          convertImgToHd(review.data[0].cover.url) :
                          "/img-not-found.png"
                        }
                      />
                    </Link>
                  }
                </div>
              </ReviewModal>
            </div>
          ))
        ))}
        {!props.title && count > 6 &&
          <ReviewsLoad
            type="reviews"
            count={count}
            param={`/${props.userId}`}
            offset={props.offset + props.limit}
            isCover isUserReview isConcat
          />
        }
      </>
    )
  }
  return (
    <div className="w-full h-32 flex items-center justify-center border border-dotted border-white-100 bg-blue-900 rounded-lg m-1">
      <span className="font-bold text-lg text-center text-white-100 p-2 responsive:text-sm">There are no Reviews yet! ✍🏾</span>
    </div>
  )

}

export function UserReviewedGamesSkeleton({ limit }: { limit: number }) {
  return (
    <div className="w-full mt-0 animate-pulse">
      <div className="w-full flex flex-col items-start gap-4">
        {[...Array(limit)].map((reviews, index) => (
          <div className="w-full flex items-start gap-4 responsive:gap-1" key={index}>
            <div className="w-full h-32 bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}