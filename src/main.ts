import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { Swagger } from './swagger';
import { AppModule } from './app.module';

const getAppConfig = (config: ConfigService) => {
  const port = config.get('APP_PORT');
  const env = config.get('NODE_ENV');

  return { port, env };
};

export const setStaticFiles = (app: NestExpressApplication) => {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', 'src', 'domains', 'reservations', 'views'),
    join(__dirname, '..', 'src', 'domains', 'auth', 'views'),
  ]);
  app.setViewEngine('ejs');
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const { port, env } = getAppConfig(configService);

  // ejs view
  setStaticFiles(app);

  // swagger init
  Swagger.initialize(app, configService);

  // server run
  app.listen(port, () => {
    console.log(`server on port: ${port}, env: ${env}`);
  });
}

bootstrap();
