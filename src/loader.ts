import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    this.app.setBaseViewsDir([
      join(__dirname, '..', 'src', 'domains', 'reservations', 'views'),
      join(__dirname, '..', 'src', 'domains', 'auth', 'views'),
    ]);
    this.app.setViewEngine('ejs');

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

  runServer() {
    const port = this.config.get('APP_PORT');
    const env = this.config.get('NODE_ENV');

    this.app.listen(port, () => {
      console.log(`server on port: ${port}, env: ${env}`);
    });
  }
}
