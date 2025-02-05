import { PartialType } from '@nestjs/swagger';
import { CreateSiteSectionDto } from './create-site-section.dto';

export class UpdateSiteSectionDto extends PartialType(CreateSiteSectionDto) {}
