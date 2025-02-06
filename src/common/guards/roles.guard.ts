import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '@/common/decorators/roles.decorator';
import { PERMISSIONS_KEY } from '@/common/decorators/permissions.decorator';
import { Permission } from '@/common/enums/permission.enum';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles and permissions from metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles && !requiredPermissions) {
      return true; // No roles or permissions required
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Check roles
    const hasRole = requiredRoles
      ? requiredRoles.some((role) => user.roles?.includes(role))
      : true;
      
    // Check permissions
    const hasPermission = requiredPermissions
      ? requiredPermissions.every((permission) => user.permissions?.includes(permission))
      : true;

    return hasRole && hasPermission;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some((role) => user?.role === role);

    if (!hasRole) {
      throw new ForbiddenException({
        message: 'Access Denied',
        details: {
          requiredRoles,
          currentRole: user?.role || 'USER',
          resource: context.getClass().name,
          action: context.getHandler().name,
        }
      });
    }

    return true;
  }
}
