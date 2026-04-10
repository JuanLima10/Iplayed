import { Injectable } from '@nestjs/common';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { NotFoundError } from 'common/errors/http-status.error';
import { IPaginate } from 'common/interfaces/paginate.util.interface';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { PrismaService } from 'prisma/prisma.service';
import { UserQuery, UserQueryDto } from './dto/query-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: UserQueryDto): Promise<IPaginate<ResponseUserDto>> {
    const query = normalizeQuery(filter);
    const { page = 1, limit = 10 } = query;

    const where = { active: true };
    const filters = buildPrismaQuery({ query, ...UserQuery, where });

    const [count, users] = await Promise.all([
      this.prisma.user.count({ where: filters.where }),
      this.prisma.user.findMany(filters),
    ]);

    const data = users.map(UserMapper.toResponse);
    const paginate = normalizePaginate({ page, limit, count });

    return { data, paginate };
  }

  async findById(id: string): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id, active: true },
    });
    if (!user) throw new NotFoundError('User not found');
    return UserMapper.toResponse(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.prisma.user.update({
      where: { id, active: true },
      data,
    });
    if (!user) throw new NotFoundError('User not found');
    return UserMapper.toResponse(user);
  }

  async delete(id: string): Promise<ResponseUserDto> {
    const user = await this.prisma.user.update({
      where: { id, active: true },
      data: { active: false },
    });
    if (!user) throw new NotFoundError('User not found');
    return UserMapper.toResponse(user);
  }

  async destroy(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User not found');
    await this.prisma.user.delete({ where: { id } });
  }
}
