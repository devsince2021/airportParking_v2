import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';

import { NaverService } from './naver.service';
import { VerifyCodeReqDto } from '../dtos/auth.verifyCodeDto';
import { PhoneVerificationDocument } from '../entities/phoneVerification';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  private readonly coefficient = 10000;

  private readonly threeMinutes = 1000 * 60 * 3;

  constructor(
    private phoneVerificationRepository: PhoneVerificationRepository,
    private naverService: NaverService,
  ) {}

  async sendVerifyCode(phone: string) {
    try {
      const dto = {
        phone,
        code: this.createCode(),
      };

      const record = await this.phoneVerificationRepository.upsert(dto);
      const isSuccess = await this.naverService.requestSMS(record);

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
      const record = await this.phoneVerificationRepository.findOne(reqDto);

      if (!_.isNil(record)) {
        return this.checkIsValid(reqDto, record);
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  checkIsValid(reqDto: VerifyCodeReqDto, dbRecord: PhoneVerificationDocument) {
    const currentTime = Date.now();
    const updatedAt = dbRecord.updatedAt.getTime();
    const timeLimit = this.threeMinutes;

    const isExpired = currentTime - updatedAt >= timeLimit;
    const isValidCode = _.isEqual(reqDto.code, dbRecord.code);
    const isValidPhone = _.isEqual(reqDto.phone, dbRecord.phone);

    return _.every([!isExpired, isValidCode, isValidPhone]);
  }
}
