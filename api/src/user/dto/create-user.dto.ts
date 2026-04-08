import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email (provided by OAuth provider)',
    example: 'user@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'Public username',
    example: 'username',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  username?: string;

  @ApiPropertyOptional({
    description: 'Public name',
    example: 'name',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  name?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://cdn.discordapp.com/avatars/123/avatar',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Authentication provider',
    example: 'discord',
    enum: ['discord'],
  })
  @IsString()
  @IsOptional()
  provider?: 'discord';

  @ApiProperty({
    description: 'Is user active',
    example: true,
  })
  @IsBoolean()
  active!: boolean;
}
