import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestError } from 'src/utils/customException';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);

      return result;
    } catch (err) {
      if (err instanceof BadRequestError) {
        response.locals.isFailLogin = true;

        return true;
      }

      throw err;
    }
  }
}
