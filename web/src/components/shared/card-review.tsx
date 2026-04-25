'use client'

import {
  ICardReviewCoverProps,
  ICardReviewHeaderProps,
  ICardReviewProps,
} from '@/common/interfaces/card-review.interface'
import {
  StatusProgressIcon,
  StatusProgressLabel,
} from '@/common/interfaces/game-status.interface'
import { cn } from '@/common/utils/cn.util'
import { truncate } from '@/common/utils/truncate.util'
import { useMaxLength } from '@/src/hooks/max-length.hook'
import { useIsMobile } from '@/src/hooks/mobile-screen.hook'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Cover } from '../ui/cover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Stars } from '../ui/stars'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const gradient = `linear-gradient(to top,#12122B 25%,rgba(11, 11, 36, 0.5) 50%, rgba(15, 15, 40, 0) 100%)`

function CardReview({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex w-full items-start gap-2 sm:gap-4">
      {children}
    </div>
  )
}

function CardReviewContent({ children }: { children: ReactNode }) {
  return (
    <Card className="relative min-h-46.5 w-full py-4">
      <CardContent className="px-4">{children}</CardContent>
    </Card>
  )
}

function CardReviewHeader(props: ICardReviewHeaderProps) {
  const { userId, name, avatarUrl, isAvatar = true, ...info } = props
  const { rating, isFavorite, status, progress } = info

  const isMobile = useIsMobile()
  const Icon = status ? StatusProgressIcon[status] : null

  return (
    <CardHeader className="flex flex-wrap items-center gap-2 px-0">
      {isAvatar && (
        <Link href={`/people/${userId}`}>
          <Avatar>
            <AvatarImage src={avatarUrl} alt={name} />
          </Avatar>
        </Link>
      )}
      <span className="text-white/50">
        Review by <b className="text-foreground">{name}</b>
      </span>

      {rating && <Stars value={rating} size="sm" disabled />}
      {!isMobile && isFavorite && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger suppressHydrationWarning>
              <Heart
                className="text-destructive"
                size={14}
                suppressHydrationWarning
              />
            </TooltipTrigger>
            <TooltipContent>Favorito</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {!isMobile && Icon && status && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger suppressHydrationWarning>
              <Icon
                className="text-secondary"
                size={14}
                suppressHydrationWarning
              />
            </TooltipTrigger>
            <TooltipContent>
              {StatusProgressLabel[status]} {progress}%
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </CardHeader>
  )
}

function CardReviewText(props: ICardReviewProps) {
  const { title, text } = props

  const isMobile = useIsMobile()
  const maxLength = useMaxLength()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: expanded ? '100%' : '11.625rem' }}
    >
      <div className="space-y-1 px-0 py-2">
        <h4 className="text-base font-bold">{title}</h4>
        <p className={cn(`text-sm font-light`, expanded && 'pb-4')}>
          {expanded ? text : truncate(text, { maxLength })}
        </p>
        {text.length > maxLength && !isMobile ? (
          <CardReviewReadMore
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
          />
        ) : (
          <CardReviewDialog {...props} />
        )}
      </div>
    </div>
  )
}

function CardReviewCover(props: ICardReviewCoverProps) {
  const { slug, coverUrl, className } = props
  return (
    <Link href={`/games/${slug}`}>
      <Cover
        className={cn('h-full sm:w-44.5', className)}
        src={coverUrl}
        alt={slug}
        width={178}
        height={186}
      />
    </Link>
  )
}

function CardReviewReadMore({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <Button
      className="absolute bottom-0 left-0 z-20 flex h-[calc(100%-5.5rem)] w-full cursor-pointer items-end justify-end px-8 py-3.5 text-sm font-bold text-secondary outline-none hover:underline sm:p-4"
      variant="ghost"
      style={{ background: expanded ? 'none' : gradient }}
      onClick={onToggle}
      suppressHydrationWarning
    >
      {expanded ? 'Read less...' : 'Read more...'}
    </Button>
  )
}

function CardReviewDialog(props: ICardReviewProps) {
  const { slug, title, rating, coverUrl, text, ...header } = props
  const { isFavorite, status, progress } = header

  const isMobile = useIsMobile()
  const Icon = status ? StatusProgressIcon[status] : null

  return (
    <Dialog>
      {isMobile && (
        <DialogTrigger
          className="absolute bottom-0 left-0 z-20 flex h-26.5 w-full cursor-pointer items-end justify-end px-8 py-3.5 text-sm font-bold text-secondary outline-none hover:underline sm:p-4"
          style={{ background: gradient }}
        >
          Read more...
        </DialogTrigger>
      )}
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <div className="flex items-start gap-3">
            <CardReviewCover
              className="rounded-l-lg"
              slug={slug}
              coverUrl={coverUrl}
            />
            <div className="w-full">
              <CardReviewHeader rating={rating} {...header} />
              <div className="flex flex-col gap-1 py-2">
                {isFavorite && (
                  <span className="flex items-center gap-1 text-destructive">
                    <Heart size={16} suppressHydrationWarning /> Favorito
                  </span>
                )}
                {status && Icon && (
                  <span className="flex items-center gap-1 text-secondary">
                    <Icon size={16} suppressHydrationWarning />{' '}
                    {StatusProgressLabel[status]}
                  </span>
                )}
                {progress && (
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1 text-primary">
                      {progress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="overflow-y-auto">
          {text}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export {
  CardReview,
  CardReviewContent,
  CardReviewCover,
  CardReviewHeader,
  CardReviewText,
}
