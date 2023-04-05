import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import _ from 'lodash';

import {
  SendVerifyCodeReqDto,
  ISendVerifyCodeReqDto,
} from '../dtos/auth.sendVerifyCodeDto';

const errorMessages: Record<keyof ISendVerifyCodeReqDto | 'default', string> = {
  phone: '전화번호를 다시 확인해주세요. "-"없는 11자리 번호를 입력해주세요.',
  default: '잘못된 정보 입니다. 다시 확인해주세요.',
};

@Injectable()
export class SmsCodePipe implements PipeTransform<SendVerifyCodeReqDto> {
  async transform(value: SendVerifyCodeReqDto, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (!_.isEmpty(errors)) {
      const message = this.createErrorMessage(errors);
      throw new BadRequestException(message);
    }

    return value;
  }

  createErrorMessage(errors: ValidationError[]) {
    const { property } = _.head(errors) as {
      property: keyof ISendVerifyCodeReqDto;
    };
    return _.get(errorMessages, property, errorMessages.default);
  }
}
