import { GameProps, GameScreenshotProps } from "./Game";

export interface UserProps {
  id: string;
  sub?: string;
  login: string;
  email: string;
  name: string;
  avatarUrl?: string;
  created_at?: string;
}

export interface ProfileProps {
  user: UserProps;
  favs: GameProps[]
  banner: GameScreenshotProps[]
}

export interface UserInfoGameProps {
  userId: string;
  limit: number;
  offset: number;
  isList?: boolean;
}

export interface UserFavGameProps {
  userId: string;
}