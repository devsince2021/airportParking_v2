import { IsString } from 'class-validator';

export class AuthDbConfig {
  @IsString()
  AUTH_DB_URI: string;
}
