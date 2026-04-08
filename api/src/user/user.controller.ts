import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'common/decorators/auth.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Swagger } from 'common/decorators/swagger.decorator';
import { UserQueryDto } from './dto/query-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Swagger({ status: 200, res: ResponseUserDto, auth: false, array: true })
  async findAll(@Query() query: UserQueryDto) {
    return this.service.findAll(query);
  }

  @Get('me')
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseUserDto })
  async me(@CurrentUser() { sub: id }: { sub: string }) {
    return this.service.findById(id);
  }

  @Get(':id')
  @Swagger({ status: 200, res: ResponseUserDto, auth: false })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Patch()
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseUserDto })
  async update(
    @CurrentUser() { sub: id }: { sub: string },
    @Body() dto: UpdateUserDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete()
  @Auth({ owner: true })
  @Swagger({ status: 200, res: ResponseUserDto })
  async delete(@CurrentUser() { sub: id }: { sub: string }) {
    return this.service.delete(id);
  }

  @Delete('/destroy')
  @Auth({ owner: true })
  @Swagger({ status: 204 })
  async destroy(@CurrentUser() { sub: id }: { sub: string }) {
    await this.service.destroy(id);
  }
}
