import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  Session,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SendVerifyCodeReqDto } from './dtos/auth.sendVerifyCodeDto';
import { VerifyCodeReqDto } from './dtos/auth.verifyCodeDto';

import { TAG, OPERATION, RESPONSE } from './defines/auth.swagger';
import { SmsCodePipe } from './pipes/auth.smsCodePipe';
import { AdminAuthGuard } from './guards/auth.adminAuth.guard';
import { AuthenticatedGuard } from './guards/auth.authenticated.guard';
import { AppAuthGuard } from './guards/auth.appAuth.guard';
import { UsersService } from '../users/users.service';
import { getUserId } from 'src/utils/session';

@ApiTags(TAG)
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation(OPERATION.sendVerifyCode)
  @ApiOkResponse(RESPONSE.sendVerifyCode)
  @UsePipes(new SmsCodePipe())
  @Post('smsCode')
  async sendVerifyCode(@Body() dto: SendVerifyCodeReqDto) {
    const isSuccess = await this.authService.sendVerifyCode(dto.phone);

    return { isSuccess };
  }

  @ApiOperation(OPERATION.verifyCode)
  @ApiOkResponse(RESPONSE.verifyCode)
  @Post('verifySmsCode')
  async verifyCode(@Body() dto: VerifyCodeReqDto) {
    const isValid = await this.authService.verifyCode(dto);

    return { isSuccess: isValid };
  }

  // TODO - 앱서버와 어드민 분리되면 수정되어야함
  @UseGuards(AdminAuthGuard)
  @Post('login')
  async login(@Res() res) {
    const isSuccess = !res.locals.isFailLogin;
    const message = res.locals.failMessage;

    return res.json({ isSuccess, message });
  }

  @UseGuards(AppAuthGuard)
  @Post('login/app')
  async loginApp(@Body('userId') userId) {
    const user = await this.userService.getUser(userId);
    return { isSuccess: true, data: user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('isAuthenticated')
  async isAuthenticated(@Session() session) {
    const userId = getUserId(session);
    const user = await this.userService.getUser(userId);
    return { isSuccess: true, data: user };
  }
}
