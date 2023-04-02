import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import _ from 'lodash';

import { AuthService } from '../services/auth.service';
import { SendVerifyCodeReqDto } from '../dtos/auth.sendVerifyCodeDto';

import { TAG, OPERATION, RESPONSE } from './swaggerDefine';

@ApiTags(TAG)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(OPERATION.sendVerifyCode)
  @ApiOkResponse(RESPONSE.sendVerifyCode)
  @Post('verificationCode')
  async sendVerifyCode(@Body() dto: SendVerifyCodeReqDto) {
    const result = await this.authService.sendVerifyCode(dto.phone);

    return { isSuccess: !_.isNil(result) };
  }
}
