import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserReqDto } from './dtos/users.createUser.dto';
import { UsersService } from './users.service';
import { CreateUserPipe } from './users.createUser.pipe';
import { AuthenticatedGuard } from '../auth/guards/auth.authenticated.guard';

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

  @UseGuards(AuthenticatedGuard)
  @Get(':userId')
  async getUser(@Param('userId') userId) {
    const user = await this.userService.getUser(userId);

    return { isSuccess: true, data: user };
  }

  @Get('/logout')
  async logout(@Request() req) {
    req.session.destroy();
    return true;
  }
}
