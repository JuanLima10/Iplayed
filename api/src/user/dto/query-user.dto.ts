import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export const UserQuery = {
  searchableFields: ['username', 'email', 'name'],
  allowedOrderBy: ['email', 'username', 'name', 'created_at'],
  allowedDateFields: ['created_at', 'updated_at'],
};

export class UserQueryDto {
  @ApiPropertyOptional({ example: 'exemple' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 'email',
    enum: ['email', 'username', 'name', 'created_at'],
  })
  @IsOptional()
  @IsIn(['email', 'username', 'name', 'created_at'])
  orderBy?: 'email' | 'username' | 'name' | 'created_at';

  @ApiPropertyOptional({ example: 'asc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 2026 })
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  @IsOptional()
  day?: number;

  @ApiPropertyOptional({
    example: 'created_at',
    enum: ['created_at', 'updated_at'],
  })
  @IsOptional()
  @IsIn(['created_at', 'updated_at'])
  dateField?: 'created_at' | 'updated_at';

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
