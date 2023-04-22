import { Body, Controller, Get, Post, Render, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { SendVerifyCodeReqDto } from '../dtos/auth.sendVerifyCodeDto';
import { VerifyCodeReqDto } from '../dtos/auth.verifyCodeDto';

import { TAG, OPERATION, RESPONSE } from './swaggerDefine';
import { SmsCodePipe } from '../pipes/smsCodePipe';

@ApiTags(TAG)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('login.ejs')
  async showLoginView() {
    return {};
  }

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
}
