import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const baseUrl = this.configService.get('BASE_URL');

    const allowedOrigins = [baseUrl];
    const allowedMethods = 'GET,PUT,POST,DELETE,OPTIONS';
    // const allowedHeaders = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';

    res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
    res.header('Access-Control-Allow-Methods', allowedMethods);
    // res.header('Access-Control-Allow-Headers', allowedHeaders);

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  }
}
