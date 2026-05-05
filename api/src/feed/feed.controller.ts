import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { FeedQueryDto } from './dto/query-feed.dto';
import { ResponseFeedDto } from './dto/response-feed.dto';
import { FeedService } from './feed.service';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseFeedDto, auth: false, array: true })
  findAll(
    @CurrentUser() { sub: id }: { sub?: string },
    @Query() query: FeedQueryDto,
  ) {
    return this.service.findAll(id, query);
  }

  @Get(':userId')
  @Swagger({ status: 200, res: ResponseFeedDto, auth: false, array: true })
  findByUserId(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: FeedQueryDto,
  ) {
    return this.service.findByUserId(id, query);
  }

  @Get('follow')
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseFeedDto, array: true })
  findByFollow(
    @CurrentUser() { sub: id }: { sub: string },
    @Query() query: FeedQueryDto,
  ) {
    return this.service.findByFollow(id, query);
  }
}
