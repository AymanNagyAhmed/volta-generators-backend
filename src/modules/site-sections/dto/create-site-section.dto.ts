import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteSectionDto {
  @ApiProperty({ 
    example: 'our_products_2', 
    description: 'The unique title of the site section. Must not already exist in the system.'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ 
    example: 'Our products section', 
    description: 'The description of the site section' 
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
