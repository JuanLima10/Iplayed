import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export const FollowQuery = {
  searchableFields: ['follower.name', 'follower.username'],
};

export class QueryFollowDto {
  @ApiPropertyOptional({
    description: 'Filter user name',
    example: 'user',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by user id',
    example: '3967554c-xxx-xxx-xxx-37a75d0212d5',
  })
  @IsOptional()
  @IsUUID()
  followingId?: string;

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
