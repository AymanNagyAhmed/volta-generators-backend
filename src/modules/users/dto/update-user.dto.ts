import { IsString, IsOptional, Matches, IsEmail, IsDateString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User\'s full name',
    example: 'John Doe'
  })
  @IsOptional()
  @IsString()
  readonly fullName?: string;


  @ApiPropertyOptional({
    description: 'User\'s email',
    example: 'test@test.com'
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'User\'s phone number in international format',
    example: '+1234567890'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international format'
  })
  readonly phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'User\'s date of birth',
    example: '1990-01-01'
  })
  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'User\'s password - minimum 6 characters',
    example: '123456789'
  })
  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  readonly password?: string;
}
