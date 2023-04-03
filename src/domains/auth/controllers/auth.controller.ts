import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { SendVerifyCodeReqDto } from '../dtos/auth.sendVerifyCodeDto';
import { VerifyCodeReqDto } from '../dtos/auth.verifyCodeDto';

import { TAG, OPERATION, RESPONSE } from './swaggerDefine';

@ApiTags(TAG)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(OPERATION.sendVerifyCode)
  @ApiOkResponse(RESPONSE.sendVerifyCode)
  @Post('smsCode')
  async sendVerifyCode(@Body() dto: SendVerifyCodeReqDto) {
    const isSuccess = await this.authService.sendVerifyCode(dto.phone);

    return { isSuccess };
  }

  @Post('validationSmsCode')
  async verifyCode(@Body() dto: VerifyCodeReqDto) {
    const isValid = await this.authService.verifyCode(dto);

    return { isSuccess: isValid };
  }
}
