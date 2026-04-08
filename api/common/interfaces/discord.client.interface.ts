export interface IDiscordResponse {
  id: string;
  username: string;
  global_name: string | null;
  email: string | null;
  avatar: string | null;
}

export interface IDiscordData {
  provider: 'discord';
  provider_id: string;
  username: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
}
