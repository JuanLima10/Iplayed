import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { GameListOrderBy } from 'common/interfaces/game-list.interface';

export const GameListQuery = {
  allowedOrderBy: Object.values(GameListOrderBy),
  searchableFields: ['name'],
};

export class QueryGameListDto {
  @ApiPropertyOptional({
    description: 'Filter by list name',
    example: 'rpg',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: GameListOrderBy.CREATED_AT,
    enum: GameListOrderBy,
  })
  @IsOptional()
  orderBy?: GameListOrderBy;

  @ApiPropertyOptional({
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
