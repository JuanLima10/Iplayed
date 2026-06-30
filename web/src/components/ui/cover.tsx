import { cn } from '@/common/utils/cn.util'
import { ImageOff, Plus } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Skeleton } from './skeleton'

interface ICover {
  src?: string | null
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  isText?: boolean
}

interface ICoverSkeleton {
  limit?: number
  width?: number
  height?: number
  fill?: boolean
}

function CoverFrame(props: { children: ReactNode; className?: string }) {
  const { children, className } = props
  return (
    <div className={cn('relative rounded-lg border', className)}>
      {children}
    </div>
  )
}

function Cover(props: ICover) {
  const { src, alt, className, isText = true, ...img } = props

  return (
    <CoverFrame>
      <Image
        className={cn('rounded-lg object-cover', className)}
        src={src ?? '/cover-not-found.png'}
        alt={alt}
        {...img}
        suppressHydrationWarning
      />
      {!src && (
        <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm">
          {isText ? alt : <ImageOff size={14} suppressHydrationWarning />}
        </span>
      )}
    </CoverFrame>
  )
}

function CoverPlus() {
  return (
    <CoverFrame className="aspect-3/4">
      <Image
        className="object-cover opacity-60"
        src="/cover-not-found.png"
        alt="Adicionar game"
        fill
      />

      <span className="absolute inset-0 flex items-center justify-center">
        <Plus />
      </span>
    </CoverFrame>
  )
}

function CoverSkeleton({
  limit = 1,
  fill,
  width = 141,
  height = 196,
}: ICoverSkeleton) {
  if (fill) {
    return Array.from({ length: limit }).map((_, index) => (
      <Skeleton
        className="aspect-3/4 w-full animate-pulse rounded-lg border"
        key={index}
      />
    ))
  }

  return Array.from({ length: limit }).map((_, index) => (
    <Skeleton
      className="h-full w-full animate-pulse rounded-lg border"
      key={index}
      style={{ width, height }}
    />
  ))
}

export { Cover, CoverPlus, CoverSkeleton }
