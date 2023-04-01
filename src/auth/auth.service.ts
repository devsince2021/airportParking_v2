import { Injectable } from '@nestjs/common';

import { PhoneVerificationRepository } from './repositories/auth.phoneVerification.repository';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  constructor(
    private phoneVerificationRepository: PhoneVerificationRepository,
  ) {}

  async sendVerifyCode(phone: string) {
    const dto = {
      phone,
      code: this.createCode(),
    };

    const record = await this.phoneVerificationRepository.upsert(dto);

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
