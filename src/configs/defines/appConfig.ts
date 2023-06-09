import { IsEnum, IsNumber } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

export class AppConfig {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  APP_PORT: number;
}
