import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { getDiscordUser } from 'common/clients/discord.client';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from 'common/errors/http-status.error';
import { IAuthUser } from 'common/interfaces/auth.interface';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto as CreateDto } from './dto/create-auth.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private sign(user: IAuthUser): string {
    const { id: sub, email, username } = user;
    return this.jwtService.sign({ sub, email, username });
  }

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
    const { name, provider_id, ...update } = data;

    const user = await this.prisma.user.upsert({
      where: {
        provider_provider_id: {
          provider: 'discord',
          provider_id,
        },
      },
      update: { ...update, active: true },
      create: { ...data, name, active: true },
    });

    return this.sign(user);
  }

  async login(dto: AuthDto): Promise<{ token: string }> {
    const isEmail = dto.login.includes('@');
    const where = isEmail ? { email: dto.login } : { username: dto.login };
    const user = await this.prisma.user.findFirst({ where });

    if (!user) throw new NotFoundError('User not found');
    const { id, email, username, active, password } = user;

    if (!active) throw new UnauthorizedError('Invalid credentials');
    if (!password) throw new UnauthorizedError('Use OAuth to sign in');

    const valid = await bcrypt.compare(dto.password, password);
    if (!valid) throw new UnauthorizedError('Invalid credentials');

    return { token: this.sign({ id, email, username }) };
  }

  async create(dto: CreateDto): Promise<{ token: string }> {
    const { passwordConfirm, ...create } = dto;
    if (passwordConfirm !== dto.password) {
      throw new BadRequestError('Passwords do not match');
    }

    const where = { OR: [{ email: dto.email }, { username: dto.username }] };
    const conflict = await this.prisma.user.findFirst({ where });

    if (conflict) {
      const { email, username } = conflict;

      if (email === dto.email)
        throw new ConflictError('Email already in use, try OAuth to sign in');
      if (username?.toLowerCase() === dto.username?.toLowerCase())
        throw new ConflictError('Username already taken');
    }

    const providers = { provider: 'local', provider_id: dto.username };
    const password = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const data = { ...create, ...providers, password, active: true };
    const select = { id: true, email: true, username: true };

    const user = await this.prisma.user.create({ data, select });

    return { token: this.sign(user) };
  }
}
