import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SiteSectionsService } from './site-sections.service';
import { CreateSiteSectionDto } from './dto/create-site-section.dto';
import { UpdateSiteSectionDto } from './dto/update-site-section.dto';

@ApiTags('Site Sections')
@Controller('site-sections')
export class SiteSectionsController {
  constructor(private readonly siteSectionsService: SiteSectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new site section' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Site section created successfully' })
  create(@Body() createSiteSectionDto: CreateSiteSectionDto) {
    return this.siteSectionsService.create(createSiteSectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all site sections' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all site sections' })
  findAll() {
    return this.siteSectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a site section by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the site section' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  findOne(@Param('id') id: string) {
    return this.siteSectionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a site section' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Site section updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  update(@Param('id') id: string, @Body() updateSiteSectionDto: UpdateSiteSectionDto) {
    return this.siteSectionsService.update(id, updateSiteSectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a site section' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Site section deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  remove(@Param('id') id: string) {
    return this.siteSectionsService.remove(id);
  }
}
