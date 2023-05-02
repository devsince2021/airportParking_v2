import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { TAG } from './swaggerDefine';

@ApiTags(TAG)
@Controller('users')
export class UsersViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/login')
  @Render('login.ejs')
  async showLoginView() {
    const baseUrl = this.configService.get('API_URL');

    return {
      url: `${baseUrl}/users/login`,
    };
  }
}
