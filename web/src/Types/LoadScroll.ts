export interface LoadScrollProps {
  param: string,
  offset: number;
  count: number;
  type: "like" | "wish" | "ratings" | "reviews",
}

export interface ReviewLoadScrollProps extends LoadScrollProps {
  cover?: string;
  isCover?: boolean;
  isConcat?: boolean;
  isProfile?: boolean;
  isUserReview?: boolean
}