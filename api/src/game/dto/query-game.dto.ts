import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IgdbOrderBy } from 'common/interfaces/igdb.client.interface';

export class GameQueryDto {
  @ApiPropertyOptional({ example: 'exemple' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: '2020-01-01' })
  @IsOptional()
  @IsDateString()
  releasedAfter?: string;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  releasedBefore?: string;

  @ApiPropertyOptional({ example: IgdbOrderBy.POPULAR })
  @IsOptional()
  @IsEnum(IgdbOrderBy)
  orderBy?: IgdbOrderBy;

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
