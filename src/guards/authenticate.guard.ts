import { CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export function Authenticate() {
  return UseGuards(new AuthenticateGuard());
}

export class AuthenticateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request?.session?.userId) return false;

    return true;
  }
}