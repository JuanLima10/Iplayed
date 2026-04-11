import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { progress_status } from '@prisma/client';
import { IGame } from 'common/interfaces/game.interface';

export class ResponseGameStatusDto {
  @ApiProperty({
    description: 'Game status id',
    example: 'a1f5b7b1-xxx-xxx-xxx-9a5e3e1c1a12',
  })
  id!: string;

  @ApiProperty({
    description: 'User id',
    example: 'b9c22b21-xxx-xxx-xxx-8e1e9d2c2c33',
  })
  userId!: string;

  @ApiProperty({
    description: 'Game id',
    example: '3967554c-xxx-xxx-xxx-37a75d0212d5',
  })
  gameId!: string;

  @ApiPropertyOptional({
    description: 'Game progress',
    example: 100,
    nullable: true,
  })
  progress?: number | null;

  @ApiProperty({
    description: 'Progress status',
    enum: progress_status,
    example: progress_status.COMPLETED,
  })
  status!: progress_status;

  @ApiPropertyOptional({
    description: 'Favorite ranking position (1–5)',
    example: 1,
    nullable: true,
  })
  best?: number | null;

  @ApiProperty({
    description: 'Is favorite',
    example: true,
  })
  isFavorite!: boolean;

  @ApiPropertyOptional({
    description: 'User rating',
    example: 4.5,
    nullable: true,
  })
  rating!: number | null;

  @ApiPropertyOptional({
    description: 'Game infos',
    example: [
      {
        id: 'c459fbe6-xxxx-xxxx-xxxx-c9a0ce280f05',
        igdb_id: 1942,
        title: 'The Witcher 3: Wild Hunt',
        slug: 'the-witcher-3-wild-hunt',
        created_at: '2026-04-10T19:09:24.495Z',
        updated_at: '2026-04-10T19:10:29.311Z',
      },
    ],
  })
  game?: IGame;

  @ApiPropertyOptional({
    description: 'Last the game was play',
    example: '2026-04-11T18:00:00.000Z',
    nullable: true,
  })
  lastPlayedAt?: Date | null;

  @ApiProperty({
    description: 'Created at',
    example: '2026-04-10T15:30:00.000Z',
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    description: 'Updated at',
    example: '2026-04-11T18:00:00.000Z',
    nullable: true,
  })
  updatedAt!: Date | null;
}
