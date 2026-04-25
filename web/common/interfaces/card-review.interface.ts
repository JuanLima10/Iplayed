import { GameStatusProgress } from './game-status.interface'

export interface ICardReviewProps
  extends ICardReviewCoverProps, ICardReviewHeaderProps {
  text: string
  title: string
}

export interface ICardReviewCoverProps {
  slug: string
  coverUrl?: string
  className?: string
}

export interface ICardReviewHeaderProps {
  userId: string
  name: string
  avatarUrl?: string
  status?: GameStatusProgress
  isFavorite?: boolean
  rating?: number
  progress?: number
  isAvatar?: boolean
}
