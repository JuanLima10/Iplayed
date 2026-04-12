import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ReviewOrderBy } from 'common/interfaces/review.interface';

export const ReviewQuery = {
  allowedOrderBy: Object.values(ReviewOrderBy),
  searchableFields: ['text', 'game.title', 'game.slug'],
};

export class QueryReviewDto {
  @ApiPropertyOptional({
    description: 'Filter by game name',
    example: 'the witcher 3',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Only reviews of favorite games',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFavorite?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by rating (from game status)',
    example: 4.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    example: ReviewOrderBy.CREATED_AT,
  })
  @IsOptional()
  orderBy?: ReviewOrderBy;

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
