import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '4f0f1095-4acc-4228-a5b9-ad6af4d9bd05',
  })
  id!: string;

  @ApiProperty({
    description: 'Authentication provider',
    example: 'discord',
  })
  provider!: string;

  @ApiProperty({
    description: 'Provider user ID (Discord ID)',
    example: '290541329165844481',
  })
  providerId!: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'username',
    nullable: true,
  })
  username!: string | null;

  @ApiProperty({
    description: 'Display name',
    example: 'User',
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    description: 'User email',
    example: 'user@email.com',
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    description: 'Avatar image URL',
    example:
      'https://cdn.discordapp.com/avatars/290541329165844481/fbbd0c615bbca43ab2d24a5e7daaf0f5',
    nullable: true,
  })
  avatarUrl!: string | null;

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
