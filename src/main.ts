import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const getConfigs = (config: ConfigService) => {
  const port = config.get('APP_PORT');
  const env = config.get('NODE_ENV');

  return { port, env };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, env } = getConfigs(app.get(ConfigService));

  app.listen(port, () => {
    console.log(`server on port: ${port}, env: ${env}`);
  });
}

bootstrap();
