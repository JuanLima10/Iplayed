'use client'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ReviewModal } from '../Modal/ReviewModal';
import { Stars } from '../Stars';

import { ReviewLoadScrollProps } from '@/Types/LoadScroll';
import { ReviewProps } from '@/Types/Review';
import { api } from '@/lib/api';
import { convertImgToHd } from '@/utils/convertImgToHd';
import { FadeInRightDiv } from '../Motion/FadeInRight';


export function ReviewsLoad(props: ReviewLoadScrollProps) {
  const { ref, inView } = useInView()
  const [offset, setOffset] = useState(props.offset)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (inView) {
      while (offset < props.count) {
        setLoading(true)
        const wait = setTimeout(async () => {
          await api.get(`/${props.isUserReview ? 'user' : 'game'}/${props.type}${props.param}`, {
            params: {
              offset: offset,
              limit: 6
            }
          }).then((res) => {
            setData([...data, ...res.data.data])
            if (offset >= props.count) {
              setOffset(props.count)
            } else {
              setOffset(offset + 6)
            }
          }).catch((err) => (console.error(err)))

          setLoading(false)
        }, 500)
        return () => clearTimeout(wait)
      }
    }
  }, [props, inView, offset, data, loading])

  if (props.isConcat) {
    return (
      <>
        {data.map((review: any) => (
          review.data.map((info: any) => ( info.user && 
            <FadeInRightDiv key={info.id}>
              <div className="w-full flex items-start gap-2 mb-4 responsive:gap-1 responsive:mb-6">
                {props.isProfile &&
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
                }
                <ReviewModal
                  name={review.data[0].name}
                  text={info.review}
                  rating={Number(info.rating)}
                  src={convertImgToHd(review.data[0].cover.url)}
                  userId={info.user.id}
                  userName={info.user.name}
                >
                  <div className="w-full cursor-pointer relative flex items-start bg-blue-700 rounded-lg">
                    <div className="w-full flex flex-col justify-between pt-2 px-4 pb-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-md text-white-100 responsive:text-sm small-screen:hidden">{review.data[0].name}</span>
                        <div className="font-normal text-sm text-white-200 responsive:text-xs">
                          Review by <b className="font-semibold text-white-100 mr-1"> {info.user.name}</b>
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
                      <Link className="w-[150px] -ml-2 responsive:w-[100px]" href={info.slug ? `/games/${info.slug}` : ""}>
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
            </FadeInRightDiv>
          ))
        ))}
        <section className="w-full flex justify-center mt-4" ref={ref}>
          {inView && loading && <Loader2 className="text-white-100 text-center animate-spin" size={32} />}
        </section>
      </>
    )
  }

  return (
    <>
      {data.map((review: ReviewProps) => (
        <FadeInRightDiv key={review.id}>
          <div className="w-full flex items-start gap-2 mb-4 responsive:gap-1">
            {props.isProfile &&
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
              src={convertImgToHd(props.cover)}
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
              </div>
            </ReviewModal>
          </div>
        </FadeInRightDiv>
      ))}
      <section className="w-full flex justify-center mt-4" ref={ref}>
        {inView && loading && <Loader2 className="text-white-100 text-center animate-spin" size={32} />}
      </section>
    </>
  )
}