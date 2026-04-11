import { Module } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { GameStatusController } from './game-status.controller';
import { GameStatusService } from './game-status.service';

@Module({
  controllers: [GameStatusController],
  providers: [GameStatusService, PrismaService, IgdbClient],
})
export class GameStatusModule {}
