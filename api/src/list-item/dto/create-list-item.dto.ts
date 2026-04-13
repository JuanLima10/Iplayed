import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateListItemDto {
  @ApiProperty({
    description: 'Game slug to add to the list',
    example: 'the-witcher-3-wild-hunt',
  })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({
    description: 'Position in the list (0-based)',
    example: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
