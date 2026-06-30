import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { QueryFollowDto } from './dto/query-follow.dto';
import { FollowService } from './follow.service';

@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly service: FollowService) {}

  @Get('followers/:userId')
  @Swagger({ status: 200 })
  followers(@Param('userId') userId: string, @Query() query: QueryFollowDto) {
    return this.service.findFollowers(userId, query);
  }

  @Get('following/:userId')
  @Swagger({ status: 200 })
  following(@Param('userId') userId: string, @Query() query: QueryFollowDto) {
    return this.service.findFollowing(userId, query);
  }

  @Post(':userId')
  @Auth({ owner: true })
  @Swagger({ status: 200 })
  follow(
    @CurrentUser() { sub: id }: { sub: string },
    @Param('userId') userId: string,
  ) {
    return this.service.follow(id, userId);
  }

  @Delete(':userId')
  @Auth({ owner: true })
  @Swagger({ status: 200 })
  unfollow(
    @CurrentUser() { sub: id }: { sub: string },
    @Param('userId') userId: string,
  ) {
    return this.service.unfollow(id, userId);
  }
}
