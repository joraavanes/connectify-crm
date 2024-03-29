import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private usersService: UsersService
  ) { }

  async intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    const request = ctx.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const user = await this.usersService.findById(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}