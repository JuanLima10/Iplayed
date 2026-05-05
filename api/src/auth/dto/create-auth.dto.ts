import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Match } from 'common/decorators/match.decorator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Username account',
    example: 'geralt_rivia',
  })
  @IsString()
  @MinLength(4)
  username!: string;

  @ApiProperty({
    description: 'User best email',
    example: 'exemple@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'User real name',
    example: 'Geralt From Rivia',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Password account',
    example: 'monsterHunter$1',
  })
  @IsStrongPassword()
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'Confirm password account',
    example: 'monsterHunter$1',
  })
  @IsStrongPassword()
  @IsString()
  @Match<CreateAuthDto>('password', { message: 'Passwords do not match' })
  passwordConfirm!: string;
}
