export interface GameProps {
  id: number;
  name: string;
  slug: string;
  cover: {
    id: string;
    url: string;
  };
  videos: [
    video_id: any,
  ];
  themes: GameThemesProps[];
  genres: GameGenresProps[];
  player_perspectives: any;
  rating: number;
  summary: string;
  review: string;
  platforms: any;
  first_release_date: number;
  aggregated_rating: number;
  screenshots: GameScreenshotProps[];
  artworks: GameScreenshotProps[];
  involved_companies: GameInvolvedCompanyProps[];
  similar_games: GameProps[];
  data: {
    isTop: boolean;
    isFav: boolean;
    isWish: boolean;
    created_at: Date;
  }
  userId: string;
}

export interface GamePlatformsProps {
  id: number;
  name: string;
}

export interface GameThemesProps {
  id: number;
  name: string;
}

export interface GameGenresProps {
  id: number;
  name: string;
}

export interface GameScreenshotProps {
  id: number;
  url: string;
}

export interface GameInvolvedCompanyProps {
  publisher: boolean;
  developer: boolean;
  company: {
    id: number;
    name: string;
  };
}