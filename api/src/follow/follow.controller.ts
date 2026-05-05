import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { FollowService } from './follow.service';

@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly service: FollowService) {}

  @Get('followers/:userId')
  @Swagger({ status: 200 })
  followers(@Param('userId') userId: string) {
    return this.service.findFollowers(userId);
  }

  @Get('following/:userId')
  @Swagger({ status: 200 })
  following(@Param('userId') userId: string) {
    return this.service.findFollowing(userId);
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
