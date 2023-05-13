import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isLoggedIn = request.isAuthenticated();
    const isActiveUser = request.user?.isActive;

    if (!isLoggedIn || !isActiveUser) return false;

    return true;
  }
}
