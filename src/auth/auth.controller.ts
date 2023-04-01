import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendVerifyCodeReqDto } from './dtos/auth.sendVerfyCodeDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verifyCode')
  async sendVerifyCode(@Body('phone') phone: SendVerifyCodeReqDto['phone']) {
    return this.authService.sendVerifyCode(phone);
  }
}
