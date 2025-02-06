import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SiteSectionsService } from './site-sections.service';
import { CreateSiteSectionDto } from './dto/create-site-section.dto';
import { UpdateSiteSectionDto } from './dto/update-site-section.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ApiResponse as IApiResponse } from '@/common/interfaces/api-response.interface';
import { SiteSection } from '@prisma/client';
import { UniqueConstraintFailedException } from '@/common/exceptions/unique-constraint-failed.exception';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('Site Sections')
@Controller('site-sections')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.admin)
export class SiteSectionsController {
  constructor(private readonly siteSectionsService: SiteSectionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Create a new site section (Admin only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Site section created successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Site section title already exists' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async create(@Body() createSiteSectionDto: CreateSiteSectionDto): Promise<IApiResponse<SiteSection>> {
    console.log(createSiteSectionDto);
    const siteSection = await this.siteSectionsService.create(createSiteSectionDto);
    return ApiResponseUtil.success(
      siteSection,
      'Site section created successfully',
      '/site-sections',
      HttpStatus.CREATED
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all site sections (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all site sections' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async findAll(): Promise<IApiResponse<SiteSection[]>> {
    const siteSections = await this.siteSectionsService.findAll();
    return ApiResponseUtil.success(
      siteSections,
      'Site sections retrieved successfully',
      '/site-sections',
      HttpStatus.OK
    );
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a site section by id (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the site section' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async findOne(@Param('id') id: string): Promise<IApiResponse<SiteSection>> {
    const siteSection = await this.siteSectionsService.findOne(id);
    return ApiResponseUtil.success(
      siteSection,
      'Site section retrieved successfully',
      `/site-sections/${id}`,
      HttpStatus.OK
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Update a site section (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Site section updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Site section title already exists' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async update(
    @Param('id') id: string,
    @Body() updateSiteSectionDto: UpdateSiteSectionDto,
  ): Promise<IApiResponse<SiteSection>> {
    const siteSection = await this.siteSectionsService.update(id, updateSiteSectionDto);
    return ApiResponseUtil.success(
      siteSection,
      'Site section updated successfully',
      `/site-sections/${id}`,
      HttpStatus.OK
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete a site section (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Site section deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async remove(@Param('id') id: string): Promise<IApiResponse<SiteSection>> {
    const siteSection = await this.siteSectionsService.remove(id);
    return ApiResponseUtil.success(
      siteSection,
      'Site section deleted successfully',
      `/site-sections/${id}`,
      HttpStatus.OK
    );
  }
}
