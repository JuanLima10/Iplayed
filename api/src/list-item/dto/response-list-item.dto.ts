import { ApiProperty } from '@nestjs/swagger';

export class ResponseListItemDto {
  @ApiProperty({ example: 'c3d4e5f6-xxx-xxx-xxx-1a2b3c4d5e6f' })
  id!: string;

  @ApiProperty({ example: 'a1f5b7b1-xxx-xxx-xxx-9a5e3e1c1a12' })
  listId!: string;

  @ApiProperty({ example: '3967554c-xxx-xxx-xxx-37a75d0212d5' })
  gameId!: string;

  @ApiProperty({ example: 1 })
  position!: number;

  @ApiProperty({ example: '2026-04-10T15:30:00.000Z' })
  addedAt!: Date;
}
