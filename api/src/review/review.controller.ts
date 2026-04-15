import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';

import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { ResponseReviewDto } from './dto/response-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseReviewDto, array: true, auth: false })
  async findAll(@Query() query: QueryReviewDto) {
    return this.service.findAll(query);
  }

  @Get('/most')
  async findMostByRange(@Query() query: QueryReviewDto) {
    return this.service.findMostByRange(query);
  }

  @Get('slug/:slug')
  @Swagger({ status: 200, res: ResponseReviewDto, array: true, auth: false })
  async findBySlug(
    @Param('slug') slug: string,
    @Query() query: QueryReviewDto,
  ) {
    return this.service.findBySlug(slug, query);
  }

  @Get('user/:userId')
  @Swagger({ status: 200, res: ResponseReviewDto, array: true, auth: false })
  async findByUser(
    @Param('userId') userId: string,
    @Query() query: QueryReviewDto,
  ) {
    return this.service.findByUserId(userId, query);
  }

  @Post()
  @Auth({ owner: true })
  @Swagger({ status: 201, res: ResponseReviewDto })
  async upsert(
    @CurrentUser() { sub: userId }: { sub: string },
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.upsert(userId, dto);
  }

  @Patch(':slug')
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseReviewDto })
  async update(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('slug') slug: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.service.update(userId, slug, dto);
  }

  @Delete(':slug')
  @Auth({ owner: true })
  @Swagger({ status: 200 })
  async delete(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('slug') slug: string,
  ) {
    return this.service.delete(userId, slug);
  }
}
