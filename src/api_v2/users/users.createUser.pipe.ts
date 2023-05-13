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
  CreateUserReqDto,
  ICreateUserReqDto,
} from './dtos/users.createUser.dto';

const errorMessages: Record<keyof ICreateUserReqDto | 'default', string> = {
  default: '잘못된 유저 정보를 입력하였습니다. 확인해주세요.',
  name: '이름을 잘못 입력하였습니다. 이름을 다시 확인해주세요.',
  password: '비밀번호가 잘못되었습니다. 비밀번호를 확인해주세요.',
  phone: '전화번호를 입력해주세요.',
  signInType: '회원가입 유형을 확인해주세요.',
  userId: '잘못된 사용자 아이디 입니다.',
  companyId: '잘못된 회사 아이디 입니다',
  role: '유저의 권한이 설정되지 않았습니다.',
  company: '',
};

@Injectable()
export class CreateUserPipe implements PipeTransform<CreateUserReqDto> {
  async transform(value: CreateUserReqDto, test: ArgumentMetadata) {
    const object = plainToInstance(test.metatype, value);
    const errors = await validate(object);

    if (!_.isEmpty(errors)) {
      const message = this.createErrorMessage(errors);
      throw new BadRequestException(message);
    }

    return value;
  }

  createErrorMessage(errors: ValidationError[]) {
    const { property } = _.head(errors) as {
      property: keyof ICreateUserReqDto;
    };
    return _.get(errorMessages, property, errorMessages.default);
  }
}
