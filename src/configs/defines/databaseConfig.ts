import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

enum DB_TYPE {
  Mysql = 'mysql',
}

export class DataBaseConfig {
  @IsNumber()
  DB_PORT: number;

  @IsEnum(DB_TYPE)
  DB_TYPE: DB_TYPE;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USERNAME: string;

  @IsNumber()
  DB_PASSWORD: number;

  @IsString()
  DB_DATABASE: string;

  @IsBoolean()
  DB_SYNC: boolean;
}
