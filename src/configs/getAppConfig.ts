import { ConfigService } from '@nestjs/config';

export const getAppConfig = (config: ConfigService) => {
  const port = config.get('APP_PORT');
  const env = config.get('NODE_ENV');

  return { port, env };
};
