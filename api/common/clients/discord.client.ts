import axios from 'axios';
import { UnauthorizedError } from 'common/errors/http-status.error';
import {
  IDiscordData,
  IDiscordResponse,
} from 'common/interfaces/discord.client.interface';

export async function getDiscordUser(code: string): Promise<IDiscordData> {
  if (!code) throw new UnauthorizedError();
  const { data } = await getDiscord(code);

  return {
    provider: 'discord',
    provider_id: data.id,
    username: data.username,
    name: data.global_name,
    email: data.email,
    avatar_url: data.avatar
      ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
      : null,
  };
}

export async function getDiscord(code: string) {
  const { data: tokenResponse } = await axios.post<{ access_token?: string }>(
    'https://discord.com/api/oauth2/token',
    new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const { access_token } = tokenResponse;
  if (!access_token) throw new UnauthorizedError('Invalid Discord token');

  return await axios.get<IDiscordResponse>(
    'https://discord.com/api/users/@me',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}
