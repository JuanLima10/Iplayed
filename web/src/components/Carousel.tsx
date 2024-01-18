'use client'
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';

import 'keen-slider/keen-slider.min.css';

export function Carousel({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      "(min-width: 1920px)": {
        slides: { perView: 8.5, spacing: 16 },
      },
      "(max-width: 1920px)": {
        slides: { perView: 7.5, spacing: 32 },
      },
      "(max-width: 1475px)": {
        slides: { perView: 5.5, spacing: 32 },
      },
      "(max-width: 800px)": {
        slides: { perView: 3.5, spacing: 32 },
      },
      "(max-width: 600px)": {
        slides: { perView: 2.5, spacing: 32 },
      },
      "(max-width: 420px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
    },
    slides: { origin: "auto", perView: 5.5, spacing: 32 },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="mt-8 ml-16 responsive:mt-[10px] responsive:ml-5">
      <div ref={sliderRef} className="keen-slider relative rounded-l-lg">
        {children}
        {loaded && instanceRef.current && (
          <div className="block transition-all responsive:hidden">
            <button className="absolute w-16 h-full text-transparent rounded-l-lg left-0 pl-3 hover:text-white-100 hover:bg-linear-l-black"
              onClick={() => instanceRef.current?.prev()}>
              <ChevronLeft size={36} />
            </button>
            <button className="absolute w-16 h-full text-white-100 bg-linear-r-black right-0 pl-3"
              onClick={() => instanceRef.current?.next()}>
              <ChevronRight size={36} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function CarouselGallery({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: "auto", spacing: 16 },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider rounded-lg">
      {children}
      {loaded && instanceRef.current && (
        <div className="block transition-all">
          <button className="absolute z-0 w-16 h-full text-transparent rounded-l-lg left-0 pl-3 hover:text-white-100 hover:bg-linear-l-black"
            onClick={() => instanceRef.current?.prev()}>
            <ChevronLeft size={36} />
          </button>
          <button className="absolute z-0 w-16 h-full text-white-100 bg-linear-r-black right-0 pl-3 hover:bg-linear-r-black"
            onClick={() => instanceRef.current?.next()}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  )
}

export function CarouselSkeleton() {
  return (
    <div className="overflow-hidden animate-pulse mt-8 ml-16 responsive:mt-[10px] responsive:ml-5">
      <div className="w-full flex items-center justify-start gap-8 responsive:gap-4">
        {[...Array(9)].map((game, index) => (
          <div key={index} className="min-w-[200px] h-[255px] bg-slate-700 rounded-lg responsive:min-w-[140px] responsive:h-[185px]"></div>
        ))}
      </div>
    </div>
  )
}

export function CarouselGallerySkeleton() {
  return (
    <div className="max-w-[1440px] overflow-hidden animate-pulse mx-auto pl-16 responsive:my-4 responsive:mx-auto responsive:px-5">
      <div className="w-full relative flex items-center justify-start gap-4 my-8 responsive:mb-0">
        {[...Array(9)].map((game, index) => (
          <div key={index} className="min-w-[450px] h-[253px] bg-slate-700 rounded-lg responsive:hidden"></div>
        ))}
        <div className="min-w-full h-[200px] hidden bg-slate-700 rounded-lg responsive:block"></div>
      </div>
    </div>
  )
}
