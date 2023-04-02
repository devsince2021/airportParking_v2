import { IsString } from 'class-validator';

export class SwaggerConfig {
  @IsString()
  SWAGGER_TITLE: string;

  @IsString()
  SWAGGER_DESC: string;

  @IsString()
  SWAGGER_VERSION: string;

  @IsString()
  SWAGGER_TAG: string;
}
