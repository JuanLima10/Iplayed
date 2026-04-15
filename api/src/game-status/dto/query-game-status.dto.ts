import { ApiPropertyOptional } from '@nestjs/swagger';
import { progress_status } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { GameStatusOrderBy } from 'common/interfaces/game-status.interface';
import { DateRangeType } from 'common/interfaces/prisma.interface';

export const GameStatusQuery = {
  allowedOrderBy: Object.values(GameStatusOrderBy),
} as const;

export class QueryGameStatusDto {
  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isBest?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFavorite?: boolean;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: progress_status.COMPLETED })
  @IsOptional()
  status?: progress_status;

  @ApiPropertyOptional({ enum: DateRangeType })
  @IsOptional()
  @IsEnum(DateRangeType)
  range?: DateRangeType;

  @ApiPropertyOptional({ example: '2026-04-01' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2026-04-30' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({ example: GameStatusOrderBy.PROGRESS })
  @IsOptional()
  orderBy?: GameStatusOrderBy;

  @ApiPropertyOptional({ example: 'asc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
