import { IsEmail, IsString, IsOptional, IsEnum, IsDate, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'john@example.com',
    description: 'User email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: 'John Doe',
    description: 'User full name'
  })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  fullName?: string;

  @ApiProperty({ 
    example: '2000-01-01',
    description: 'User date of birth'
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Password (min 8 chars, must contain uppercase, lowercase, and number)',
    example: 'Password123'
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  })
  password: string;

  @ApiProperty({ 
    enum: UserRole, 
    default: UserRole.user,
    description: 'User role in the system'
  })
  @IsEnum(UserRole, { message: 'Invalid user role' })
  @IsOptional()
  role?: UserRole = UserRole.user;
}
