import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Swagger } from 'common/decorators/swagger.decorator';
import { InternalServerError } from 'common/errors/http-status.error';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('discord')
  @Swagger({ status: 200, auth: false })
  redirectToDiscord(@Res() res: Response) {
    const url = this.service.getDiscordAuthUrl();
    return res.redirect(url);
  }

  @Get('discord/callback')
  @Swagger({ status: 200, auth: false })
  async discordCallback(@Res() res: Response, @Query('code') code: string) {
    try {
      const token = await this.service.handleDiscordCallback(code);
      const url = process.env.FRONTEND_URL;
      if (!url) throw new InternalServerError('FRONTEND_URL is not defined');

      const redirectUrl = new URL(url);
      redirectUrl.searchParams.set('token', token);

      return res.redirect(redirectUrl.toString());
    } catch {
      const url = process.env.FRONTEND_URL ?? '/';
      const redirectUrl = new URL(url);

      redirectUrl.searchParams.set('error', 'auth_failed');
      return res.redirect(redirectUrl.toString());
    }
  }

  @Post('sign-in')
  @Swagger({ status: 200, res: ResponseAuthDto, auth: false })
  async login(@Body() dto: AuthDto) {
    return await this.service.login(dto);
  }

  @Post('sign-up')
  @Swagger({ status: 201, res: ResponseAuthDto, auth: false })
  async register(@Body() dto: CreateAuthDto) {
    return await this.service.create(dto);
  }
}
