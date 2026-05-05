import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { ReviewLikeService } from './review-like.service';

@ApiTags('Review Like')
@Controller('review-like')
export class ReviewLikeController {
  constructor(private readonly service: ReviewLikeService) {}

  @Get(':reviewId')
  @Swagger({ status: 200, auth: false })
  findAll(@Param('reviewId') reviewId: string) {
    return this.service.findByReview(reviewId);
  }

  @Get('count/:id')
  @Swagger({ status: 200, auth: false })
  count(@Param('id') id: string) {
    return this.service.count(id);
  }

  @Post(':reviewId')
  @Auth({ owner: true })
  @Swagger({ status: 201 })
  like(
    @CurrentUser() { sub: id }: { sub: string },
    @Param('reviewId') reviewId: string,
  ) {
    return this.service.like(id, reviewId);
  }

  @Delete(':reviewId')
  @Auth({ owner: true })
  @Swagger({ status: 200 })
  unlike(
    @CurrentUser() { sub: id }: { sub: string },
    @Param('reviewId') reviewId: string,
  ) {
    return this.service.unlike(id, reviewId);
  }
}
