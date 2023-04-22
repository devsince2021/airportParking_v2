import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserReqDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users.service';
import { CreateUserPipe } from '../pipes/createUser.pipe';

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
  @UsePipes(new CreateUserPipe())
  async createUser(@Body() createUserDto: CreateUserReqDto) {
    const response = await this.userService.createUser(createUserDto);

    return response;
  }
}
