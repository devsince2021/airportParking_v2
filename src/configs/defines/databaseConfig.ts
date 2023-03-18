import { IsEnum, IsNumber, IsString } from 'class-validator';

enum DB_TYPE {
  Mysql = 'mysql',
}

export class DataBaseConfig {
  @IsNumber()
  DB_PORT: number;

  @IsEnum(DB_TYPE)
  DB_TYPE: DB_TYPE;

  @IsString()
  HOST: string;

  @IsString()
  USERNAME: string;

  @IsNumber()
  PASSWORD: number;

  @IsString()
  DATABASE: string;
}
