import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGameListDto {
  @ApiProperty({
    description: 'Name of the list',
    example: 'My Top RPGs',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;
}
