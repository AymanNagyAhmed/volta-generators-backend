import { PartialType } from '@nestjs/swagger';
import { CreateSiteSectionDto } from './create-site-section.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSiteSectionDto extends PartialType(CreateSiteSectionDto) {
  @ApiProperty({ 
    example: 'our_products_2', 
    description: 'The unique title of the site section. Must not already exist in the system.',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiProperty({ 
    example: 'Our products section', 
    description: 'The description of the site section',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}
