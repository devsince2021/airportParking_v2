import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('user')
  getUser(): string {
    return 'hi all user';
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
