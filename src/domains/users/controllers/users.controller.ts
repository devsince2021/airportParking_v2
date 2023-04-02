import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users.service';

import { TAG, OPERATION, RESPONSE } from './swaggerDefine';

@ApiTags(TAG)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('user')
  getUser(): string {
    return 'hi all user';
  }

  @Post()
  @ApiOperation(OPERATION.createUser)
  @ApiOkResponse(RESPONSE.createUser)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
