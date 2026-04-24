import { Controller, Get, Query, Res } from '@nestjs/common';
import { InternalServerError } from 'common/errors/http-status.error';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('discord')
  redirectToDiscord(@Res() res: Response) {
    const url = this.service.getDiscordAuthUrl();
    return res.redirect(url);
  }

  @Get('discord/callback')
  async discordCallback(@Res() res: Response, @Query('code') code: string) {
    const token = await this.service.handleDiscordCallback(code);
    const url = process.env.FRONTEND_URL;
    if (!url) throw new InternalServerError('FRONTEND_URL is not defined');

    const redirectUrl = new URL(url);
    redirectUrl.searchParams.set('token', token);

    return res.redirect(redirectUrl.toString());
  }
}
