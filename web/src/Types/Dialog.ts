import { ReactNode } from 'react';

export interface DialogProps {
  name?: string;
  text?: any;
  src?: string;
  avatarUrl?: string;
  userName?: string;
  userId?: string;
  rating?: number;
  review?: string;
  children: ReactNode;
}

export interface DialogFormProps extends DialogProps {
  slug: string;
}

export interface UserGamesModal {
  userId: string;
  children: ReactNode;
}