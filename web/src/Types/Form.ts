import { StarProps } from './Stars';

export interface GameFormProps {
  rating: string; 
  review: boolean; 
  like: boolean; 
  wish: boolean;
}

export interface LikeFormProps {
  slug: string;
  title?: boolean;
  gameId?: string;
  isLike?: any;
  currentUserId?: string;
}

export interface WishFormProps {
  slug: string;
  title?: boolean;
  gameId?: string;
  isWish?: boolean;
  currentUserId?: string;
}

export interface ReviewFormProps {
  slug: string;
  gameId?: string;
  review?: string;
  rating?: number;
  isLike?: boolean;
  isWish?: boolean;
  currentUserId?: string;
}

export interface SettingsFormProps {
  id: string;
  login: string;
  name: string;
  email: string;
}

export interface RatingProps extends StarProps{
  slug: string;
  gameId?: string;
}