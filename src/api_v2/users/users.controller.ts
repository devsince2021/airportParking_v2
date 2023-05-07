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

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getUser(@Param('id') id) {
    const user = await this.userService.getUser({ id });
    console.log('id', user);
    return { isSuccess: true };
    //
  }

  @Get('/logout')
  async logout(@Request() req) {
    console.log('@@', req.session);
    req.session.destroy();
    return true;
  }
}
