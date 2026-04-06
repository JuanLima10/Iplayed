import axios from 'axios';
import { UnauthorizedError } from 'common/errors/http-status.error';
import {
  DiscordTokenResponse,
  DiscordUserData,
  DiscordUserResponse,
} from 'common/interface/discord';

export async function getDiscordUser(code: string): Promise<DiscordUserData> {
  if (!code) throw new UnauthorizedError();

  const { data: tokenResponse } = await axios.post<DiscordTokenResponse>(
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

  if (!access_token) {
    throw new UnauthorizedError('Invalid Discord token response');
  }

  const { data: discordUser } = await axios.get<DiscordUserResponse>(
    'https://discord.com/api/users/@me',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return {
    provider: 'discord',
    provider_id: discordUser.id,
    username: discordUser.username,
    name: discordUser.global_name,
    email: discordUser.email,
    avatar_url: discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : null,
  };
}
