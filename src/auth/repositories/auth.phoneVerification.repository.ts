import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  PhoneVerification,
  PhoneVerificationDocument,
} from '../entities/phoneVerification';
import { PhoneVerificationRecord } from '../dtos/auth.sendVerifyCodeDto';

@Injectable()
export class PhoneVerificationRepository {
  constructor(
    @InjectModel(PhoneVerification.name)
    private PhoneVerificationModel: Model<PhoneVerification>,
  ) {}

  async upsert(dto: PhoneVerificationRecord) {
    const record = await this.PhoneVerificationModel.findOne({
      phone: dto.phone,
    });

    if (!_.isNil(record)) {
      return this.update(record, dto);
    }

    return this.insert(dto);
  }

  async insert(dto: PhoneVerificationRecord) {
    const record = new this.PhoneVerificationModel(dto);
    await record.save();

    return record;
  }

  async update(
    record: PhoneVerificationDocument,
    dto: PhoneVerificationRecord,
  ) {
    record.set(dto);
    await record.save();
    return record;
  }
}
