import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Swagger } from './swagger';
import { AppModule } from './app.module';

export const getAppConfig = (config: ConfigService) => {
  const port = config.get('APP_PORT');
  const env = config.get('NODE_ENV');

  return { port, env };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const { port, env } = getAppConfig(configService);

  // swagger init
  Swagger.initialize(app, configService);

  // server run
  app.listen(port, () => {
    console.log(`server on port: ${port}, env: ${env}`);
  });
}

bootstrap();
