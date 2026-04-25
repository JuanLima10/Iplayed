import { cn } from '@/common/utils/cn.util'
import { ImageOff } from 'lucide-react'
import Image from 'next/image'

type CoverProps = {
  src?: string | null
  alt: string
  width: number
  height: number
  className?: string
  isText?: boolean
}

function Cover(props: CoverProps) {
  const { src, alt, className, width, height, isText = true } = props

  return (
    <div className="relative rounded-lg border">
      <Image
        className={cn('rounded-lg object-cover', className)}
        src={src ?? '/cover-not-found.png'}
        alt={alt}
        width={width}
        height={height}
        suppressHydrationWarning
      />
      {!src && (
        <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm">
          {isText ? alt : <ImageOff size={14} suppressHydrationWarning />}
        </span>
      )}
    </div>
  )
}

export { Cover }
