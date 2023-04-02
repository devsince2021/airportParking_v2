import { IsString } from 'class-validator';

export class NaverConfig {
  @IsString()
  NAVER_SMS_ID: string;

  @IsString()
  NAVER_ACCESS_KEY: string;

  @IsString()
  NAVER_SECRET_KEY: string;

  @IsString()
  NAVER_SMS_BASE_URL: string;
}
