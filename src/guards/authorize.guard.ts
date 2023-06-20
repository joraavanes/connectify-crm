import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/domain/role.enum';
import { User } from 'src/users/domain/user.entity';

export function Authorize() {
  return UseGuards(AuthorizeGuard);
}

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request?.currentUser as User;

    return roles.some((role: Role) => user?.roles?.includes(role));
  }
}