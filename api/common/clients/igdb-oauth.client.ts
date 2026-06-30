import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IgdbOAuthClient {
  private accessToken: string | null = null;
  private expiresAt = 0;

  private refreshingToken: Promise<string> | null = null;
  async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.accessToken && now < this.expiresAt - 60_000) {
      return this.accessToken;
    }

    if (this.refreshingToken) {
      return this.refreshingToken;
    }

    this.refreshingToken = this.refreshToken();

    try {
      const token = await this.refreshingToken;
      return token;
    } finally {
      this.refreshingToken = null;
    }
  }

  private async refreshToken(): Promise<string> {
    const { data } = await axios.post<{
      access_token: string;
      expires_in: number;
      token_type: 'bearer';
    }>('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: process.env.IGDB_CLIENT_ID,
        client_secret: process.env.IGDB_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });

    this.accessToken = data.access_token;
    this.expiresAt = Date.now() + data.expires_in * 1000;

    return this.accessToken;
  }
}
