import { Module } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';

@Module({
  controllers: [ListItemController],
  providers: [ListItemService, PrismaService, IgdbClient],
})
export class ListItemModule {}
