import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('user')
  getUser(): string {
    return 'hi all user';
  }
}
