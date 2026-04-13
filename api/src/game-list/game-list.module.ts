import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GameListController } from './game-list.controller';
import { GameListService } from './game-list.service';

@Module({
  controllers: [GameListController],
  providers: [GameListService, PrismaService],
  exports: [GameListService],
})
export class GameListModule {}
