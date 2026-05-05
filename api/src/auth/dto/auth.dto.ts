import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { passwordRules } from 'common/interfaces/auth.interface';

export class AuthDto {
  @ApiProperty({
    description: 'Email or username',
    example: 'geralt_rivia',
  })
  @IsString()
  login!: string;

  @ApiProperty({
    description: 'Password account',
    example: 'monsterHunter$1',
  })
  @IsStrongPassword(passwordRules.rules, { message: passwordRules.message })
  @IsString()
  password!: string;
}
