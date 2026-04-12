import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GameStatusModule } from './game-status/game-status.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    GameModule,
    GameStatusModule,
    ReviewModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
