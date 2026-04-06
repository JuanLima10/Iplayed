import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'common/errors/http-status.error';
import { handlePrismaError } from 'common/errors/prisma-error.mapper';
import { PrismaService } from 'prisma/prisma.service';
import { getDiscordUser } from 'services/discord-oauth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  getDiscordAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      response_type: 'code',
      scope: 'identify email',
    });

    return `${process.env.DISCORD_OAUTH_URL}?${params.toString()}`;
  }

  async handleDiscordCallback(code: string): Promise<string> {
    if (!code) throw new UnauthorizedError();
    const data = await getDiscordUser(code);

    try {
      const { id: sub } = await this.prisma.user.upsert({
        where: {
          provider_provider_id: {
            provider: 'discord',
            provider_id: data.provider_id,
          },
        },
        update: data,
        create: data,
      });

      return this.jwtService.sign({ sub });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
