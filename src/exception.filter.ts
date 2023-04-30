import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BadRequestError } from './utils/customException';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  response: Response;

  request: Request;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    this.response = ctx.getResponse<Response>();
    this.request = ctx.getRequest<Request>();

    if (exception instanceof BadRequestError) {
      this.customBadRequestHandler(exception);
    } else {
      this.defaultHandler(exception);
    }
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
