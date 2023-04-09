import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
  private roles: string[];
  constructor(...roles: string[]) {
    this.roles = roles;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request?.session?.userId) return false;

    return this.roles.length ?
      this.roles.some(role => role === request?.currentUser?.role) : true;
  }
}