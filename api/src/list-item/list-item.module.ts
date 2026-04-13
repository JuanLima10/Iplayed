import { Module } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { GameListService } from 'src/game-list/game-list.service';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';

@Module({
  controllers: [ListItemController],
  providers: [ListItemService, PrismaService, GameListService, IgdbClient],
})
export class ListItemModule {}
