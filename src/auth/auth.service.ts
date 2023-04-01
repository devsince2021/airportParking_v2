import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import _ from 'lodash';
import {
  PhoneVerification,
  PhoneVerificationDocument,
} from './entities/phoneVerification';
import { PhoneVerificationRecord } from './dtos/auth.sendVerfyCodeDto';

@Injectable()
export class AuthService {
  private readonly codeDigit = 4;

  constructor(
    @InjectModel(PhoneVerification.name)
    private PhoneVerificationModel: Model<PhoneVerification>,
  ) {}

  async sendVerifyCode(phone: string) {
    const dto = {
      phone,
      code: this.createCode(),
    };

    const record = await this.upsertPhoneVerificationRecord(dto);

    return record;
  }

  createCode() {
    const code = Math.floor(Math.random() * 10000).toString();
    return code.length !== this.codeDigit ? this.createCode() : code;
  }

  //repository
  async upsertPhoneVerificationRecord(dto: PhoneVerificationRecord) {
    const record = await this.PhoneVerificationModel.findOne({
      phone: dto.phone,
    });

    if (!_.isNil(record)) {
      return this.updatePhoneVerificationRecord(record, dto);
    }

    return this.insertPhoneVerificationRecord(dto);
  }

  //repository
  async insertPhoneVerificationRecord(dto: PhoneVerificationRecord) {
    const record = new this.PhoneVerificationModel(dto);
    await record.save();

    return record;
  }

  //repository
  async updatePhoneVerificationRecord(
    record: PhoneVerificationDocument,
    dto: PhoneVerificationRecord,
  ) {
    record.set(dto);
    await record.save();
    return record;
  }
}
