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
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from '@prisma/client';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ApiResponse as IApiResponse } from '@/common/interfaces/api-response.interface';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.admin)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new setting (Admin only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Setting created successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Site section not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async create(@Body() createSettingDto: CreateSettingDto): Promise<IApiResponse<Setting>> {
    const setting = await this.settingsService.create(createSettingDto);
    return ApiResponseUtil.success(
      setting,
      'Setting created successfully',
      '/settings',
      HttpStatus.CREATED
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all settings (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all settings' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async findAll(): Promise<IApiResponse<Setting[]>> {
    const settings = await this.settingsService.findAll();
    return ApiResponseUtil.success(
      settings,
      'Settings retrieved successfully',
      '/settings',
      HttpStatus.OK
    );
  }

  @Get('section/:title')
  @ApiOperation({ summary: 'Get settings by section title (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns settings for the specified section' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async findBySection(@Param('title') title: string): Promise<IApiResponse<Setting[]>> {
    const settings = await this.settingsService.findBySection(title);
    return ApiResponseUtil.success(
      settings,
      'Settings retrieved successfully',
      `/settings/section/${title}`,
      HttpStatus.OK
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a setting by id (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the setting' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Setting not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async findOne(@Param('id') id: string): Promise<IApiResponse<Setting>> {
    const setting = await this.settingsService.findOne(id);
    return ApiResponseUtil.success(
      setting,
      'Setting retrieved successfully',
      `/settings/${id}`,
      HttpStatus.OK
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a setting (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Setting updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Setting not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<IApiResponse<Setting>> {
    const setting = await this.settingsService.update(id, updateSettingDto);
    return ApiResponseUtil.success(
      setting,
      'Setting updated successfully',
      `/settings/${id}`,
      HttpStatus.OK
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a setting (Admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Setting deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Setting not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have required role' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User is not authenticated' })
  async remove(@Param('id') id: string): Promise<IApiResponse<Setting>> {
    const setting = await this.settingsService.remove(id);
    return ApiResponseUtil.success(
      setting,
      'Setting deleted successfully',
      `/settings/${id}`,
      HttpStatus.OK
    );
  }
}
