import { Module } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService, IgdbClient],
})
export class GameModule {}
