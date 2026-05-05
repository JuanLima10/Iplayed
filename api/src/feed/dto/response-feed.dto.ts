import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { feed_event_type } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/client';
import { IUser } from 'common/interfaces/user.interface';

export class ResponseFeedDto {
  @ApiProperty({
    example: 'a1f5b7b1-xxx-xxx-xxx-9a5e3e1c1a12',
  })
  id!: string;

  @ApiProperty({
    example: 'b9c22b21-xxx-xxx-xxx-8e1e9d2c2c33',
  })
  userId!: string;

  @ApiPropertyOptional({
    example: [
      {
        id: '4f0f1095-4acc-4228-a5b9-ad6af4d9bd05',
        provider: 'discord',
        providerId: '290541329165844481',
        username: 'username',
        name: 'User',
        email: 'user@email.com',
        avatarUrl:
          'https://cdn.discordapp.com/avatars/290541329165844481/fbbd0c615bbca43ab2d24a5e7daaf0f5',
        createdAt: '2026-04-06T16:10:51.177Z',
        updatedAt: '2026-04-06T17:51:27.166Z',
      },
    ],
  })
  user?: IUser;

  @ApiProperty({
    example: feed_event_type.REVIEW_LIKED,
  })
  type!: feed_event_type;

  @ApiProperty({
    example: '{ json: example }',
  })
  payload!: JsonValue;

  @ApiProperty({
    example: '2026-04-10T15:30:00.000Z',
  })
  createdAt!: Date;
}
