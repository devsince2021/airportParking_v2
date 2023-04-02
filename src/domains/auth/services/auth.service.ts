import { Injectable } from '@nestjs/common';

import { PhoneVerificationRepository } from '../repositories/auth.phoneVerification.repository';
import { PhoneVerificationRecord } from '../dtos/auth.phoneVerificationRecordDto';
import { NaverService } from './naver.service';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  constructor(
    private phoneVerificationRepository: PhoneVerificationRepository,
    private naverService: NaverService,
  ) {}

  async sendVerifyCode(phone: string) {
    const dto: PhoneVerificationRecord = {
      phone,
      code: this.createCode(),
    };

    const record = await this.phoneVerificationRepository.upsert(dto);
    const test = await this.naverService.requestSMS(record);

    return {
      phone: record.phone,
      code: record.code,
    };
  }

  createCode() {
    const code = Math.floor(Math.random() * 10000).toString();
    return code.length !== this.codeDigit ? this.createCode() : code;
  }
}