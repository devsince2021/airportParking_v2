import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import _ from 'lodash';

import { BadRequestError } from './utils/customException';
import { User } from './domains/users';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  response: Response;

  request: Request & { isAuthenticated: () => boolean };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    this.response = ctx.getResponse<Response>();
    this.request = ctx.getRequest<Request>();

    if (exception instanceof ForbiddenException) {
      this.authExceptionHandler(exception);
    } else if (exception instanceof BadRequestError) {
      this.customBadRequestHandler(exception);
    } else {
      this.defaultHandler(exception);
    }
  }

  authExceptionHandler(exception: UnauthorizedException) {
    const isLoggedIn = this.request.isAuthenticated();
    const hasCompany = !_.isNil((this.request.user as User)?.companyId);
    const status = exception.getStatus();

    if (!isLoggedIn) {
      return this.response.status(status).redirect('/login');
    } else if (!hasCompany) {
      return this.response.status(status).redirect('/company');
    }

    return this.defaultHandler(exception);
  }

  customBadRequestHandler(exception: HttpException) {
    this.response.json({
      isSuccess: false,
      error: JSON.parse(exception.message),
    });
  }

  defaultHandler(exception: HttpException) {
    const status = exception.getStatus();
    return this.response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: this.request.url,
      message: exception.message,
    });
  }
}
