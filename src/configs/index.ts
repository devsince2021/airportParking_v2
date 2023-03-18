import { ConfigModule } from '@nestjs/config';

import { AppConfig } from './defines/appConfig';
import { DataBaseConfig } from './defines/databaseConfig';
import { validateConfig } from './configValidator';

const defines = [AppConfig, DataBaseConfig];

export const RootConfig = ConfigModule.forRoot({
  envFilePath: `./.env.${process.env.NODE_ENV}`,
  validate: validateConfig(defines),
});
