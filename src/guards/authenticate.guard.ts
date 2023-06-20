import { CanActivate, ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/users/decorators/isPublic.decorator";

export function Authenticate() {
  return UseGuards(AuthenticateGuard);
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    if (!request?.session?.userId) return false;

    return true;
  }
}