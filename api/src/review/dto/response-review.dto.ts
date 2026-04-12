import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseReviewDto {
  @ApiProperty({
    example: 'a1f5b7b1-xxx-xxx-xxx-9a5e3e1c1a12',
  })
  id!: string;

  @ApiProperty({
    example: 'b9c22b21-xxx-xxx-xxx-8e1e9d2c2c33',
  })
  userId!: string;

  @ApiProperty({
    example: '3967554c-xxx-xxx-xxx-37a75d0212d5',
  })
  gameId!: string;

  @ApiProperty({
    example: 'Amazing experience from start to finish.',
  })
  text!: string;

  @ApiProperty({
    example: '2026-04-10T15:30:00.000Z',
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    example: '2026-04-11T18:00:00.000Z',
    nullable: true,
  })
  updatedAt!: Date | null;
}
