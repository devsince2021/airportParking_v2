import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  async sendVerifyCode(phone: string) {
    return {
      phone,
      code: this.createCode(),
    };
  }

  createCode() {
    const code = Math.floor(Math.random() * 10000).toString();
    return code.length !== this.codeDigit ? this.createCode() : code;
  }
}
