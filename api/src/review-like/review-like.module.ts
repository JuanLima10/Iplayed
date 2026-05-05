import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewLikeController } from './review-like.controller';
import { ReviewLikeService } from './review-like.service';

@Module({
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService, PrismaService],
})
export class ReviewLikeModule {}
