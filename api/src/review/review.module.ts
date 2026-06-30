import { Module } from '@nestjs/common';
import { IgdbOAuthClient } from 'common/clients/igdb-oauth.client';
import { IgdbClient } from 'common/clients/igdb.client';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, IgdbClient, IgdbOAuthClient],
})
export class ReviewModule {}
