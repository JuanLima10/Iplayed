import Image from 'next/image';
import Link from 'next/link';

import { ReviewModal } from '@/components/Modal/ReviewModal';
import { Stars } from '@/components/Stars';
import { api } from '@/lib/api';

import { ReviewCardProps, ReviewProps } from '@/Types/Review';
import { ReviewsLoad } from '@/components/LoadScroll/ReviewsLoad';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function ReviewsGameCard(props: ReviewCardProps) {
  const { data, count }: any = await api.get(`/game/reviews/${props.slug}`, {
    params: {
      limit: props.limit,
      offset: props.offset,
    }
  }).then(res => res.data)

  if (count > 0) {
    return (
      <div className="w-full responsive:px-5">
        {props.title &&
          <div className="flex items-center justify-between mb-8 responsive:mx-0">
            <span className="font-semibold text-md text-white-100">
              Reviews
            </span>
            <a className="font-normal text-sm text-green-300 hover:underline" href={`/reviews/${props.slug}`}>
              See more +
            </a>
          </div>
        }
        {data.map((review: ReviewProps) => (
          <div className="w-full flex items-start gap-2 mb-4 responsive:gap-1" key={review.id}>
            {props.profile &&
              <Link className="small-screen:hidden" href={`/user/${review.user.id}`}>
                <Image
                  className="max-w-[42px] h-[42px] object-cover rounded-full"
                  alt={review.user.name}
                  width={42} height={42}
                  src={review.user.avatarUrl ? review.user.avatarUrl : "/img-not-found.png"}
                />
              </Link>
            }
            <ReviewModal
              name={review.name}
              text={review.review}
              rating={Number(review.rating)}
              src={convertImgToHd(props.src)}
              userId={review.user.id}
              userName={review.user.name}
              avatarUrl={review.user.avatarUrl}
            >
              <div className="w-full relative flex items-start bg-blue-700 rounded-lg">
                <div className="w-full flex flex-col justify-between pt-2 px-4 pb-4">
                  <div className="cursor-pointer flex flex-col gap-1">
                    <span className="font-semibold text-md text-white-100 responsive:text-sm small-screen:hidden">{review.name}</span>
                    <div className="font-normal text-sm text-white-200 responsive:text-xs">
                      Review by <b className="font-semibold text-white-100 mr-1"> {review.user.name}</b>
                      <Stars value={Number(review.rating)} small disabled />
                    </div>
                    {review.review.length > 300 ?
                      <>
                        <p className={`w-full max-w-full max-h-16 relative font-normal text-sm text-white-100 overflow-hidden ${review.review.length > 360 && "mb-3 before:w-full before:h-full before:absolute before:bottom-0 before:bg-linear-b-blue before:-mb-1"} responsive:max-h-12 responsive:text-xs`}>
                          {review.review}
                        </p>
                        <span className="absolute bottom-2 w-full font-semibold text-sm text-blue-300 hover:underline responsive:text-xs">Read more ...</span>
                      </> :
                      <p className="w-full max-w-full h-full relative font-normal text-sm text-white-100 overflow-hidden responsive:text-xs">
                        {review.review}
                      </p>
                    }
                  </div>
                </div>
                {props.src && props.isImg &&
                  <Link className="w-[150px] -ml-2 responsive:w-[100px]" href={props.slug ? `/games/${props.slug}` : ""}>
                    <Image
                      className="object-cover rounded-r-lg transition-all ml-2 responsive:rounded-lg responsive:-mt-2 hover:brightness-75"
                      alt={review.name}
                      width={215} height={300}
                      src={props.src ? convertImgToHd(props.src) : "/img-not-found.png"}
                    />
                  </Link>
                }
              </div>
            </ReviewModal>
          </div>
        ))}
        {!props.title && count > 6 &&
          <ReviewsLoad
            param={`/${props.slug}`}
            type="reviews"
            count={count}
            cover={props.src}
            offset={props.offset + props.limit}
            isProfile
          />
        }
      </div>
    )
  }
  return ""
}

export function ReviewsGameCardSkeleton() {
  return (
    <div className="w-full mt-0 animate-pulse">
      <div className="w-full flex items-center justify-between mb-11 responsive:mx-0">
        <div className="w-28 h-4 bg-slate-700 rounded-full px-4"></div>
      </div>
      <div className="w-full flex flex-col items-start gap-4">
        {[...Array(3)].map((reviews, index) => (
          <div className="w-full flex items-start gap-4 responsive:gap-1" key={index}>
            <div className="w-full max-w-[42px] h-[42px] bg-slate-700 rounded-full"></div>
            <div className="w-full h-32 bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}