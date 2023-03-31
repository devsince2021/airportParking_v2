import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async sendVerifyCode() {
    const response = this.authService.sendVerifyCode();
  }
}
