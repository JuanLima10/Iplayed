import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseGameListDto {
  @ApiProperty({ example: 'a1f5b7b1-xxx-xxx-xxx-9a5e3e1c1a12' })
  id!: string;

  @ApiProperty({ example: 'b9c22b21-xxx-xxx-xxx-8e1e9d2c2c33' })
  userId!: string;

  @ApiProperty({ example: 'My Top RPGs' })
  name!: string;

  @ApiProperty({ example: '2026-04-10T15:30:00.000Z' })
  createdAt!: Date;

  @ApiPropertyOptional({ example: '2026-04-11T18:00:00.000Z', nullable: true })
  updatedAt!: Date | null;
}
