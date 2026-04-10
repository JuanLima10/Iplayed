import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Swagger } from 'common/decorators/swagger.decorator';
import { GameQueryDto } from './dto/query-game.dto';
import { ResponseGameDto } from './dto/response-game.dto';
import { GameService } from './game.service';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseGameDto, array: true, auth: false })
  async findAll(@Query() query: GameQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id/igdb')
  @Swagger({ status: 200, res: ResponseGameDto, auth: false })
  async findById(@Param('id') id: number) {
    return this.service.findByIgdbId(id);
  }

  @Get(':slug')
  @Swagger({ status: 200, res: ResponseGameDto, auth: false })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
