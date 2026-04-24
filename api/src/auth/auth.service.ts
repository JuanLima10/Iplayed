import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getDiscordUser } from 'common/clients/discord.client';
import { UnauthorizedError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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

  async handleDiscordCallback(code: string) {
    if (!code) throw new UnauthorizedError();

    const data = await getDiscordUser(code);
    const { email, name, username, ...update } = data;

    const user = await this.prisma.user.upsert({
      where: {
        provider_provider_id: {
          provider: 'discord',
          provider_id: data.provider_id,
        },
      },
      update: { ...update, active: true },
      create: { ...data, name, active: true },
    });

    const { id: sub } = user;
    return this.jwtService.sign({ sub, email, username });
  }
}
