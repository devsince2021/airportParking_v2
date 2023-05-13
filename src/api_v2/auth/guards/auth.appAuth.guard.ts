import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
