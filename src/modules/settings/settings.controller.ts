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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipeBuilder,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadHelper } from '@/common/helpers/file-upload.helper';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SettingsService } from '@/modules/settings/settings.service';
import { CreateSettingDto } from '@/modules/settings/dto/create-setting.dto';
import { UpdateSettingDto } from '@/modules/settings/dto/update-setting.dto';
import { Setting } from '@prisma/client';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ApiResponse as IApiResponse } from '@/common/interfaces/api-response.interface';
import { Public } from '@/common/decorators/public.decorator';
import { imageFileFilter } from '@/common/filters/file.filter';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@ApiTags('3. Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('upload-single')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @UseInterceptors(
    FileInterceptor(
      'file', 
      {
        ...FileUploadHelper.getStorageOptions('./public/uploads/settings'),
        fileFilter: imageFileFilter,
      }
    )
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload single image file (Admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'File uploaded successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid file type or size' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'User is not authenticated' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'User does not have required role' 
  })
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<any>> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    
    const uploadedFile = await FileUploadHelper.uploadSingle(
      file, 
      'public/uploads/settings'
    );

    return ApiResponseUtil.success(
      uploadedFile,
      'File uploaded successfully',
      '/settings/upload-single',
      HttpStatus.OK
    );
  }

  @Post('upload-multiple')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @UseInterceptors(
    FilesInterceptor(
      'files', 
      20, 
      {
        ...FileUploadHelper.getStorageOptions('./public/uploads/settings'),
        fileFilter: imageFileFilter,
      }
    )
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple image files (Admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Files uploaded successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid file type, size or no files provided' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'User is not authenticated' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'User does not have required role' 
  })
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<IApiResponse<any>> {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required');
    }

    if (files.length > 20) {
      throw new BadRequestException('Maximum 20 files allowed');
    }

    const uploadedFiles = await FileUploadHelper.uploadMultiple(
      files, 
      'public/uploads/settings'
    );

    return ApiResponseUtil.success(
      uploadedFiles,
      'Files uploaded successfully',
      '/settings/upload-multiple',
      HttpStatus.OK
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
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
  @Public()
  @ApiOperation({ summary: 'Get all settings' })
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
  @Public()
  @ApiOperation({ summary: 'Get settings by section title' })
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
  @Public()
  @ApiOperation({ summary: 'Get a setting by id' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
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
