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

import { QueryListItemDto } from 'src/list-item/dto/query-list-item.dto';
import { CreateGameListDto } from './dto/create-game-list.dto';
import { QueryGameListDto } from './dto/query-game-list.dto';
import { ResponseGameListDto } from './dto/response-game-list.dto';
import { UpdateGameListDto } from './dto/update-game-list.dto';
import { GameListService } from './game-list.service';

@ApiTags('Game List')
@Controller('game-list')
export class GameListController {
  constructor(private readonly service: GameListService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseGameListDto, array: true, auth: false })
  async findAll(@Query() query: QueryGameListDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Swagger({ status: 200, res: ResponseGameListDto, auth: false })
  async findById(@Param('id') id: string, @Query() query: QueryListItemDto) {
    return this.service.findById(id, query);
  }

  @Get('user/:userId')
  @Swagger({ status: 200, res: ResponseGameListDto, array: true, auth: false })
  async findByUser(
    @Param('userId') userId: string,
    @Query() query: QueryGameListDto,
  ) {
    return this.service.findByUserId(userId, query);
  }

  @Post()
  @Auth({ owner: true })
  @Swagger({ status: 201, res: ResponseGameListDto })
  async create(
    @CurrentUser() { sub: userId }: { sub: string },
    @Body() dto: CreateGameListDto,
  ) {
    return this.service.create(userId, dto);
  }

  @Patch(':id')
  @Auth()
  @Swagger({ status: 200, res: ResponseGameListDto })
  async update(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('id') id: string,
    @Body() dto: UpdateGameListDto,
  ) {
    return this.service.update(userId, id, dto);
  }

  @Delete(':id')
  @Auth()
  @Swagger({ status: 200 })
  async delete(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('id') id: string,
  ) {
    return this.service.delete(userId, id);
  }
}
