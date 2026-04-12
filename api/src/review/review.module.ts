import { Module } from '@nestjs/common';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, IgdbClient],
})
export class ReviewModule {}
