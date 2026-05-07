import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Swagger } from 'common/decorators/swagger.decorator';
import { InternalServerError } from 'common/errors/http-status.error';
import { Response } from 'express';
import { getAuthCookieOptions } from 'common/utils/session-cookie.util';
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
  async discordCallback(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ) {
    try {
      const token = await this.service.handleDiscordCallback(code);
      const url = process.env.FRONTEND_URL;
      if (!url) throw new InternalServerError('FRONTEND_URL is not defined');

      res.cookie('iplayed_session', token, getAuthCookieOptions());

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
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    const auth = await this.service.login(dto);
    res.cookie('iplayed_session', auth.token, getAuthCookieOptions());
    return auth;
  }

  @Post('sign-up')
  @Swagger({ status: 201, res: ResponseAuthDto, auth: false })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateAuthDto,
  ) {
    const auth = await this.service.create(dto);
    res.cookie('iplayed_session', auth.token, getAuthCookieOptions());
    return auth;
  }

  @Post('sign-out')
  @Swagger({ status: 200, auth: false })
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('iplayed_session', {
      path: '/',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return { ok: true };
  }
}
