import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteSectionDto {
  @ApiProperty({ example: 'Homepage', description: 'The title of the site section' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Main homepage section', description: 'The description of the site section' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
