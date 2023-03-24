import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import _ from 'lodash';

import { CreateUserDto, ICreateUserDto } from '../dtos/createUser.dto';

const errorMessages: Record<keyof ICreateUserDto | 'default', string> = {
  email: '잘못된 이메일입니다. 이메일을 다시 확인해주세요.',
  name: '이름을 잘못 입력하였습니다. 이름을 다시 확인해주세요.',
  password: '비밀번호가 잘못되었습니다. 비밀번호를 확인해주세요.',
  default: '잘못된 유저 정보를 입력하였습니다. 확인해주세요.',
};

@Injectable()
export class CreateUserPipe implements PipeTransform<CreateUserDto> {
  async transform(value: CreateUserDto, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (!_.isEmpty(errors)) {
      const message = this.createErrorMessage(errors);
      throw new BadRequestException(message);
    }

    return value;
  }

  createErrorMessage(errors: ValidationError[]) {
    const { property } = _.head(errors) as { property: keyof ICreateUserDto };
    return _.get(errorMessages, property, errorMessages.default);
  }
}
