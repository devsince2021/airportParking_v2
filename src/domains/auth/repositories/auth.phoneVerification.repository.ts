import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  PhoneVerification,
  PhoneVerificationDocument,
} from '../entities/phoneVerification';
import { PhoneVerificationRecord } from '../dtos/auth.phoneVerificationRecordDto';

@Injectable()
export class PhoneVerificationRepository {
  constructor(
    @InjectModel(PhoneVerification.name)
    private PhoneVerificationModel: Model<PhoneVerification>,
  ) {}

  async upsert(dto: PhoneVerificationRecord) {
    const record = await this.findOne(dto);

    if (!_.isNil(record)) {
      return this.update(record, dto);
    }

    return this.insert(dto);
  }

  async findOne(dto: PhoneVerificationRecord) {
    const record = await this.PhoneVerificationModel.findOne({
      phone: dto.phone,
    });

    return record;
  }

  async insert(dto: PhoneVerificationRecord) {
    const record = await this.PhoneVerificationModel.create(dto);
    return record;
  }

  // todo: 'set' 과 'save' 목킹 방법 찾아서 test 쓰기
  async update(
    record: PhoneVerificationDocument,
    dto: PhoneVerificationRecord,
  ) {
    record.set(dto);
    await record.save();
    return record;
  }
}
