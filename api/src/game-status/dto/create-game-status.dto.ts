import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { progress_status } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateGameStatusDto {
  @ApiProperty({
    description: 'igdbId',
    example: 1,
  })
  @IsInt()
  igdbId!: number;

  @ApiPropertyOptional({
    description: 'User game progress (0–100)',
    example: 100,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;

  @ApiProperty({
    description: 'Progress status of the game',
    enum: progress_status,
    example: progress_status.COMPLETED,
  })
  @IsEnum(progress_status)
  status!: progress_status;

  @ApiPropertyOptional({
    description: 'Best games ranking position (1–5)',
    example: 1,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  best?: number;

  @ApiPropertyOptional({
    description: 'Mark game as favorite',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @ApiPropertyOptional({
    description: 'User rating for the game (0–5)',
    example: 4.5,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    example: '2026-04-11T18:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  lastPlayedAt?: string;
}
