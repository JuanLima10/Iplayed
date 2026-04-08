import { Controller, Get, Query, Res } from '@nestjs/common';
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
    const redirectUrl = new URL(process.env.FRONTEND_URL!);
    // redirectUrl.searchParams.set('token', token);

    return res.redirect(`${redirectUrl.toString()}?token=${token}`);
  }
}
