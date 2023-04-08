import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import _ from 'lodash';

import { VerifyCodeReqDto } from '../dtos/auth.verifyCodeDto';
import { NaverService } from './naver.service';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  private readonly coefficient = 10000;

  private readonly threeMinutes = 1000 * 60 * 3;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private naverService: NaverService,
  ) {}

  async sendVerifyCode(phone: string) {
    try {
      const code = this.createCode();

      await this.cacheManager.set(`${phone}`, `${code}`, this.threeMinutes);
      const isSuccess = await this.naverService.requestSMS({ phone, code });

      return isSuccess;
    } catch (err) {
      return false;
    }
  }

  createCode() {
    const code = Math.floor(Math.random() * this.coefficient).toString();
    return code.length !== this.codeDigit ? this.createCode() : code;
  }

  async verifyCode(reqDto: VerifyCodeReqDto) {
    try {
      const code = await this.cacheManager.get(`${reqDto.phone}`);

      return _.isEqual(reqDto.code, code);
    } catch (err) {
      return false;
    }
  }
}
