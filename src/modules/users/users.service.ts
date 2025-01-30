import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Creates a new user account
   * @param createUserDto User creation data
   * @returns Newly created user object
   * @throws ConflictException if email already exists
   * @throws BadRequestException if validation fails
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // First check if user exists using findUnique to avoid race conditions
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);

      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      // If it's already a NestJS exception, rethrow it
      if (error instanceof ConflictException) {
        throw error;
      }

      // Handle Prisma specific errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is Prisma's error code for unique constraint violations
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }

      // Log unexpected errors
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
