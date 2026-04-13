import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { ResponseGameListDto } from 'src/game-list/dto/response-game-list.dto';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ReorderListItemsDto } from './dto/reorder-list-item.dto';
import { ResponseListItemDto } from './dto/response-list-item.dto';
import { ListItemService } from './list-item.service';

@ApiTags('List Item')
@Controller('list-item')
export class ListItemController {
  constructor(private readonly service: ListItemService) {}

  @Post(':listId')
  @Auth({ owner: true })
  @Swagger({ status: 201, res: ResponseListItemDto })
  async create(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('listId') listId: string,
    @Body() dto: CreateListItemDto,
  ) {
    return this.service.create(userId, listId, dto);
  }

  @Patch('reorder/:listId')
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseGameListDto })
  async reorder(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('listId') listId: string,
    @Body() dto: ReorderListItemsDto,
  ) {
    return this.service.reorder(userId, listId, dto);
  }

  @Delete(':listId/item/:id')
  @Auth()
  @Swagger({ status: 200 })
  async delete(
    @CurrentUser() { sub: userId }: { sub: string },
    @Param('listId') listId: string,
    @Param('id') id: string,
  ) {
    return this.service.delete(userId, listId, id);
  }
}
