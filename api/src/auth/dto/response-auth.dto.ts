import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({
    description: 'User token auth',
  })
  token!: string;
}
