import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseGameDto {
  @ApiPropertyOptional({
    description: 'Iplayed game id',
    example: '3967554c-xxx-xxx-xxx-37a75d0212d5',
  })
  id!: string;

  @ApiPropertyOptional({
    description: 'IGDB game id',
    example: 1029,
    nullable: true,
  })
  igdbId!: number | null;

  @ApiProperty({
    description: 'Game title',
    example: 'The witcher 3: Wild hunter',
  })
  title!: string;

  @ApiProperty({
    description: 'IGDB game slug',
    example: 'the-witcher-3-wild-hunt',
    nullable: true,
  })
  slug!: string | null;

  @ApiPropertyOptional({
    description: 'IGDB game cover url',
    example: 'https://images.igdb.com/igdb/image/upload/t_1080p/coaarl.jpg',
  })
  coverUrl?: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2026-04-06T16:10:51.177Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2026-04-06T17:51:27.166Z',
    nullable: true,
  })
  updatedAt!: Date | null;
}
