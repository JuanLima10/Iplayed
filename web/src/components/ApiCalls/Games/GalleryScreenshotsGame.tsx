import { Image } from 'antd'

import { CarouselGallery } from '@/components/Carousel'
import { VideoPlayer } from '@/components/VideoPlayer'

import { fetchGame, galleryBody } from '@/lib/igdb'
import { GameProps } from '@/Types/Game'
import { convertImgToHd } from '@/utils/convertImgToHd'

export async function GalleryScreenshotsGame({ slug }: { slug: string }) {
  const { screenshots, videos }: GameProps = await fetchGame(galleryBody(slug))

  return (
    screenshots &&
    <section className="max-w-[1440px] mx-auto my-10 pl-16 responsive:my-4 responsive:mx-auto responsive:p-0">
      <div className="relative my-8 responsive:mb-0 responsive:mx-5">
        {screenshots.length > 2 ?
          <CarouselGallery>
            {videos && videos[0].video_id &&
              <VideoPlayer videoId={videos[0].video_id} />
            }
            {screenshots.map((img) => (
              <div className="w-full min-w-[450px] h-full max-h-[250px] cursor-pointer relative rounded-lg keen-slider__slide responsive:min-w-full responsive:h-[200px]" key={img.id}>
                <Image
                  className="aspect-video object-cover bg-slate-700"
                  style={{ width: '100%', height: '100%' }}
                  fallback="/img-not-found.png"
                  src={convertImgToHd(img.url) + "?1000"}
                  alt="Gallery Image"
                  loading="lazy"
                  width={450} height={250}
                  placeholder={
                    <div className="max-w-full min-w-[450px] h-[250px] bg-slate-700 rounded-lg animate-pulse responsive:h-[200px]"></div>
                  }
                />
              </div>
            ))}
          </CarouselGallery> :
          videos && videos[0].video_id &&
          <VideoPlayer videoId={videos[0].video_id} />
        }
      </div>
    </section>
  )
}