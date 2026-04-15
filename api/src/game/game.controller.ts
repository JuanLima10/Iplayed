import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Swagger } from 'common/decorators/swagger.decorator';
import { GameQueryDto } from './dto/query-game.dto';
import { ResponseIgdbDto } from './dto/response-igdb.dto';
import { GameService } from './game.service';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseIgdbDto, array: true, auth: false })
  async findAll(@Query() query: GameQueryDto) {
    return this.service.findAll(query);
  }

  @Get('/random')
  @Swagger({ status: 200, res: ResponseIgdbDto, array: true, auth: false })
  async findRandom() {
    return this.service.findRandom();
  }

  @Get(':slug')
  @Swagger({ status: 200, res: ResponseIgdbDto, auth: false })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get('igdb/:id')
  @Swagger({ status: 200, res: ResponseIgdbDto, auth: false })
  async findById(@Param('id') id: number) {
    return this.service.findByIgdbId(id);
  }
}
