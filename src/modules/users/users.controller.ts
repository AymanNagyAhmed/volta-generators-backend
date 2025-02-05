import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiResponseUtil } from '@/common/utils/api-response.util';
import { ApiResponse as IApiResponse } from '@/common/interfaces/api-response.interface';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User successfully created' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Email already exists' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<IApiResponse<User>> {
    try {
      const user = await this.usersService.create(createUserDto);
      return ApiResponseUtil.success(
        user,
        'User created successfully',
        '/api/users',
        HttpStatus.CREATED
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        return ApiResponseUtil.error(
          error.message || 'Email already exists',
          '/api/users',
          HttpStatus.CONFLICT
        );
      }
      if (error instanceof BadRequestException) {
        return ApiResponseUtil.error(
          error.message,
          '/api/users',
          HttpStatus.BAD_REQUEST,
          error.getResponse()['errors']
        );
      }
      // Handle unexpected errors
      console.error('Unexpected error creating user:', error);
      return ApiResponseUtil.error(
        'An unexpected error occurred',
        '/api/users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users retrieved successfully'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have required role'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  async findAll(): Promise<IApiResponse<User[]>> {
    try {
      const users = await this.usersService.findAll();
      return ApiResponseUtil.success(
        users,
        'Users retrieved successfully',
        '/users',
        HttpStatus.OK
      );
    } catch (error) {
      return ApiResponseUtil.error(
        'Failed to retrieve users',
        '/users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get user by id (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have required role'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  async findOne(@Param('id') id: string): Promise<IApiResponse<User>> {
    try {
      const user = await this.usersService.findOne(id);
      return ApiResponseUtil.success(
        user,
        'User retrieved successfully',
        `/users/${id}`,
        HttpStatus.OK
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ApiResponseUtil.error(
          error.message,
          `/users/${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      return ApiResponseUtil.error(
        'Failed to retrieve user',
        `/users/${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Update user (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have required role'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated'
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IApiResponse<User>> {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return ApiResponseUtil.success(
        user,
        'User updated successfully',
        `/users/${id}`,
        HttpStatus.OK
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ApiResponseUtil.error(
          error.message,
          `/users/${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      if (error instanceof BadRequestException) {
        return ApiResponseUtil.error(
          error.message,
          `/users/${id}`,
          HttpStatus.BAD_REQUEST,
          error.getResponse()['errors']
        );
      }
      return ApiResponseUtil.error(
        'Failed to update user',
        `/users/${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async remove(@Param('id') id: string): Promise<IApiResponse<null>> {
    try {
      await this.usersService.remove(id);
      return ApiResponseUtil.success(
        null,
        'User deleted successfully',
        `/users/${id}`,
        HttpStatus.OK
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ApiResponseUtil.error(
          error.message,
          `/users/${id}`,
          HttpStatus.NOT_FOUND
        );
      }
      return ApiResponseUtil.error(
        'Failed to delete user',
        `/users/${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
