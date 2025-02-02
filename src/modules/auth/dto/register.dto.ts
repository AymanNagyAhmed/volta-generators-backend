import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty({
    description: 'User\'s email address',
    example: 'test@test.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User\'s password (min 6 chars)',
    example: '123456789'
  })
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsOptional()
  dateOfBirth?: Date;
}
