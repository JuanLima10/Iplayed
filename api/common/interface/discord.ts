export interface DiscordTokenResponse {
  access_token?: string;
}

export interface DiscordUserResponse {
  id: string;
  username: string;
  global_name: string | null;
  email: string | null;
  avatar: string | null;
}

export interface DiscordUserData {
  provider: 'discord';
  provider_id: string;
  username: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
}
