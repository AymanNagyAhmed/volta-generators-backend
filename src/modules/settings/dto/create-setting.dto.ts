import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({ 
    example: 'our_products',
    description: 'The section title this setting belongs to'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  sectionTitle: string;

  @ApiProperty({ 
    example: 'header_text',
    description: 'The unique key of the setting within the section'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  key: string;

  @ApiProperty({ 
    example: 'Our Amazing Products',
    description: 'The value of the setting'
  })
  @IsNotEmpty()
  @IsString()
  value: string;

  /**
   * Returns a string that uniquely identifies this setting within its section
   */
  getUniqueIdentifier(): string {
    return `${this.sectionTitle}:${this.key}`;
  }
}
