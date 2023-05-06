import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { TAG } from './swaggerDefine';
import { LocalAuthGuard } from 'src/domains/auth/guards/localAuth.guard';

@ApiTags(TAG)
@Controller('users')
export class UsersViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/login')
  @Render('login.ejs')
  async showLoginView() {
    return {
      frame: false,
      id: '',
      password: '',
      message: '',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Render('login.ejs')
  async showLoginResult(@Request() req, @Response() res) {
    const { isSuccess, message } = res.locals;
    const { userId, password } = req.body;

    if (isSuccess) {
      return res.redirect('/');
    }

    return {
      frame: false,
      id: userId,
      password,
      message,
    };
  }
}
