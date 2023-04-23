import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TAG } from './swaggerDefine';
import { ConfigService } from '@nestjs/config';

@ApiTags(TAG)
@Controller('auth')
export class AuthViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get('login')
  @Render('login.ejs')
  async showLoginView() {
    const baseUrl = this.configService.get('API_URL');

    return {
      url: `${baseUrl}/auth/login`,
    };
  }
}
