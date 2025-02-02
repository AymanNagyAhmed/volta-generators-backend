import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '@/common/interfaces/api-response.interface';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@prisma/client';

/**
 * Implements JWT authentication strategy for Passport
 * Validates JWT tokens and extracts user information from database
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Try to extract token from cookie first
        (request: Request) => {
          const data = request?.cookies['Authentication'];
          if (!data) {
            return null;
          }
          return data;
        },
        // Fallback to Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  /**
   * Validates JWT payload and returns user from database
   * @param payload JWT token payload containing user ID
   * @returns Prisma User object if valid
   * @throws UnauthorizedException if user not found or token invalid
   */
  async validate(payload: TokenPayload): Promise<User> {
    try {
      const user = await this.usersService.findOne(payload.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}