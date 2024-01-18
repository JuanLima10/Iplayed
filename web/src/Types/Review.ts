import { UserProps } from "./User";

export interface ReviewProps {
  id: string;
  slug: string;
  name: string;
  review: string;
  rating: string;
  user: UserProps;
}

export interface ReviewCardProps {
  slug: string;
  src?: string;
  limit: number;
  offset: number;
  isImg?: boolean;
  profile?: boolean;
  userId?: string;
  userName?: string;
  title?: boolean;
}

export interface RecentReviewCardProps {
  offset: number;
  limit: number;
}

export interface UserReviewCardProps {
  userId: string;
  userName?: string;
  limit: number;
  offset: number;
  isCover?: boolean;
  title?: boolean;
}