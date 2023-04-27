import { IsNumber, IsString } from 'class-validator';

export class AuthDbConfig {
  @IsString()
  AUTH_DB_URI: string;

  @IsString()
  SESSION_SECRET: string;

  @IsNumber()
  SESSION_TTL: number;
}
