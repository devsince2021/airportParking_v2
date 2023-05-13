import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import expressLayouts from 'express-ejs-layouts';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { GlobalExceptionFilter } from './exception.filter';

export class Loader {
  private app: NestExpressApplication;

  private config: ConfigService;

  constructor(app: NestExpressApplication) {
    this.app = app;
    this.config = app.get(ConfigService);
  }

  static async create<T>(module: T) {
    const app = await NestFactory.create<NestExpressApplication>(module);
    return new Loader(app);
  }

  setStaticFiles() {
    this.app.useStaticAssets(join(__dirname, '..', 'public'));
    this.app.setBaseViewsDir([join(__dirname, '..', 'public', 'views')]);

    this.app.setViewEngine('ejs');
    this.app.use(
      '/',
      (req, res, next) => {
        res.locals.frame = true;
        next();
      },
      expressLayouts,
    );

    return this;
  }

  setSwagger() {
    const title = this.config.get('SWAGGER_TITLE');
    const desc = this.config.get('SWAGGER_DESC');
    const version = this.config.get('SWAGGER_VERSION');
    const tag = this.config.get('SWAGGER_TAG');

    const documentBuilder = new DocumentBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setVersion(version)
      .addTag(tag)
      .build();

    const document = SwaggerModule.createDocument(this.app, documentBuilder);
    SwaggerModule.setup('api-docs', this.app, document);

    return this;
  }

  setSession() {
    const env = this.config.get('NODE_ENV');
    const mongoUrl = this.config.get('AUTH_DB_URI');
    const secret = this.config.get('SESSION_SECRET');
    const ttl = this.config.get('SESSION_TTL') * 24 * 60 * 60;

    const store = MongoStore.create({
      mongoUrl,
      ttl,
      collectionName: `${env}_session`,
    });

    this.app.use(
      session({
        store,
        secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: ttl,
        },
      }),
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    return this;
  }

  setGlobalExceptionFilter() {
    this.app.useGlobalFilters(new GlobalExceptionFilter());

    return this;
  }

  runServer() {
    const port = this.config.get('APP_PORT');
    const env = this.config.get('NODE_ENV');

    this.app.listen(port, () => {
      console.log(`server on port: ${port}, env: ${env}`);
    });
  }
}
