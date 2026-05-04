import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GameListModule } from './game-list/game-list.module';
import { GameStatusModule } from './game-status/game-status.module';
import { GameModule } from './game/game.module';
import { ListItemModule } from './list-item/list-item.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    GameModule,
    GameStatusModule,
    ReviewModule,
    GameListModule,
    ListItemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
