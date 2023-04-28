import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import { VerifyCodeReqDto } from '../dtos/auth.verifyCodeDto';
import { NaverService } from './naver.service';
import { UsersRepository } from 'src/domains/users/repository/users.repository';
import { BadRequestError } from 'src/utils/customException';
import { Auth_Service_Code, Auth_Service_Msg } from '../constants/errorCode';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  private readonly coefficient = 10000;

  private readonly threeMinutes = 1000 * 60 * 3;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private naverService: NaverService,
    private usersRepository: UsersRepository,
    private configService: ConfigService,
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

  async validateLocalLogin(userId: string, userPassword: string) {
    const user = await this.usersRepository.find({ userId });

    if (_.isNil(user)) {
      throw new BadRequestError({
        message: Auth_Service_Msg.S_LOGIN_ID,
        code: Auth_Service_Code.S_LOGIN_ID,
      });
    } else if (!this.isCorrectPassword(userPassword, user.password)) {
      throw new BadRequestError({
        message: Auth_Service_Msg.S_LOGIN_PW,
        code: Auth_Service_Code.S_LOGIN_PW,
      });
    }

    const { password, ...result } = user;
    return result;
  }

  async isCorrectPassword(password: string, savedPassword: string) {
    const salt = this.configService.get('USER_PASSWORD_SALT');
    const hashed = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(savedPassword, hashed);

    return isMatch;
  }
}
