import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateSettingDto } from './create-setting.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @ApiProperty({ 
    example: 'our_products',
    description: 'The section title this setting belongs to',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  sectionTitle?: string;

  @ApiProperty({ 
    example: 'header_text',
    description: 'The unique key of the setting within the section',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  key?: string;

  @ApiProperty({ 
    example: 'Our Amazing Products',
    description: 'The value of the setting',
    required: false
  })
  @IsOptional()
  @IsString()
  value?: string;
}
