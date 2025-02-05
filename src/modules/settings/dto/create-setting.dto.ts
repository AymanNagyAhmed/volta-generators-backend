import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({ 
    example: 'our_products_2',
    description: 'The section title this setting belongs to'
  })
  @IsNotEmpty()
  @IsString()
  sectionTitle: string;

  @ApiProperty({ 
    example: 'our_products_test',
    description: 'The key of the setting'
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({ 
    example: 'test',
    description: 'The value of the setting'
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}
