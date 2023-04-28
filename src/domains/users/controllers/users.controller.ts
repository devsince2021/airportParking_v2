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

import { CreateUserReqDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users.service';
import { CreateUserPipe } from '../pipes/createUser.pipe';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { LocalAuthGuard } from '../../auth/guards/localAuth.guard';

import { TAG, OPERATION, RESPONSE } from './swaggerDefine';

@ApiTags(TAG)
@Controller('api/users')
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return {
      isSuccess: true,
      data: req.user,
    };
  }

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
