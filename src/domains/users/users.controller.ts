import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserReqDto } from './dtos/users.createUser.dto';
import { UsersService } from './users.service';
import { CreateUserPipe } from './users.createUser.pipe';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { LocalAuthGuard } from '../auth/guards/localAuth.guard';

import { TAG, OPERATION, RESPONSE } from './defines/users.swagger';

@ApiTags(TAG)
@Controller('api/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation(OPERATION.createUser)
  @ApiOkResponse(RESPONSE.createUser)
  @UsePipes(new CreateUserPipe())
  async createUser(@Body() createUserDto: CreateUserReqDto) {
    const response = await this.userService.createUser(createUserDto);

    return {
      isSuccess: true,
      data: response,
    };
  }

  @Get()
  @Get('/logout')
  async logout(@Request() req) {
    console.log('@@', req.session);
    req.session.destroy();
    return true;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/user')
  getUser(@Request() req) {
    return req.user;
  }
}
