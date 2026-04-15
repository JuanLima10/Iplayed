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

import { CreateGameStatusDto } from './dto/create-game-status.dto';
import { QueryGameStatusDto } from './dto/query-game-status.dto';
import { ResponseGameStatusDto } from './dto/response-game-status.dto';
import { UpdateGameStatusDto } from './dto/update-game-status.dto';
import { GameStatusService } from './game-status.service';

@ApiTags('Game Status')
@Controller('game-status')
export class GameStatusController {
  constructor(private readonly service: GameStatusService) {}

  @Get('/most')
  async findMost(@Query() query: QueryGameStatusDto) {
    return this.service.findMostByRange(query);
  }

  @Get(':userId')
  @Swagger({
    status: 200,
    res: ResponseGameStatusDto,
    auth: false,
    array: true,
  })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() query: QueryGameStatusDto,
  ) {
    return this.service.findByUserId(userId, query);
  }

  @Get('count/:param')
  @Swagger({
    status: 200,
    summary: 'Can use a userId or a game slug',
    auth: false,
  })
  async count(@Param('param') param: string) {
    return this.service.count(param);
  }

  @Post()
  @Auth({ owner: true })
  @Swagger({ status: 201, res: ResponseGameStatusDto })
  async upsert(
    @CurrentUser() { sub: userId }: { sub: string },
    @Body() dto: CreateGameStatusDto,
  ) {
    return this.service.upsert(userId, dto);
  }

  @Patch(':gameId')
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseGameStatusDto })
  async update(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('slug') slug: string,
    @Body() dto: UpdateGameStatusDto,
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
